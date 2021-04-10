import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { getPreciseDistance, convertDistance } from 'geolib';

import deliveryRatesApi from '../../api/deliveryRates';
import addressApi from '../../api/address';
import storage from '../../auth/storage';
import AppText from '../AppText';
import numberTransform from '../../utility/numberTransform';
import { useIsFocused } from '@react-navigation/native';

function DeliveryRates({ storeId, onReady }) {
  const [user, setUser] = useState();
  const [deliveryFee, setDeliveryFee] = useState(1);

  const getDeliveryRates = async () => {
    const rates = await deliveryRatesApi.getDeliveryRates();
    if (!rates.ok) return;
    return rates.data[0];
  };

  const getCoords = async () => {
    try {
      const userAddress = await addressApi.getUserAddress();
      if (!userAddress.ok) return;

      const storeAddress = await addressApi.getStoreAddress(storeId);

      if (!storeAddress.ok) return;

      return {
        start: {
          latitude: parseFloat(userAddress.data.latitude),
          longitude: parseFloat(userAddress.data.longitude),
        },
        end: {
          latitude: parseFloat(storeAddress.data.latitude),
          longitude: parseFloat(storeAddress.data.longitude),
        },
      };
    } catch (error) {
      return null;
    }
  };

  const functionsHandler = async () => {
    const deliveryRates = await getDeliveryRates();
    const coords = await getCoords(deliveryRates);
    
    const totalFee = await computeDeliveryFee(coords, deliveryRates);
    if (totalFee > 1) {
      console.log('deliveryFee', totalFee);
      setDeliveryFee(totalFee);
      onReady(totalFee);
    }
  };

  useEffect(() => {
    storage.getUser().then((user) => {
      setUser(user);
    });
    functionsHandler();
  }, [useIsFocused]);

  // get storeLocation

  const computeDeliveryFee = async (coords, deliveryRates) => {
    try {
      if (!coords) return;
      const distance = getPreciseDistance(coords.start, coords.end);
      const distanceKm = convertDistance(distance, 'km');

      let perKmPrice = 0;
      if (+distanceKm > +deliveryRates.min_km) {
        const excessKm = +distanceKm - +deliveryRates.min_km;
        perKmPrice = excessKm * +deliveryRates.per_km;
      }

      const totalFee = +deliveryRates.fixed_rate + perKmPrice;
      console.log('total fee', totalFee);
      // if (totalFee < 1) await functionsHandler(coords);
      return totalFee;
    } catch (error) {
      console.error('Failed to compute delivery fee', error);
      return 0;
    }
  };
  return (
    <View style={styles.container}>
      {deliveryFee > 1 ? (
        <AppText style={styles.price}>
          P{numberTransform.numberWithComma(deliveryFee)}
        </AppText>
      ) : (
        <AppText>Computing delivery rate...</AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  price: {
    fontStyle: 'italic',
  },
});

export default DeliveryRates;
