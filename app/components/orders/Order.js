import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import AppText from '../AppText';
import ListItemSeparator from '../ListItemSeparator';
import OrderItem from './OrderItem';
import orderApi from '../../api/orders';
import colors from '../../config/colors';
import numberTransform from '../../utility/numberTransform';
import AppButton from '../AppButton';
import AppDialog from '../dialogs/AppDialog';
import OrderStatus from './OrderStatus';
import CancelDialog from '../dialogs/CancelDialog';

function Order({ orderItem, onCancelOrder }) {
  const [refreshing, setRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleCancelOrder = async (reason) => {
    // call api to cancel order
    const cancelResult = await orderApi.cancelOrder({
      ...orderItem,
      reason: reason,
    });
    setIsVisible(false);
    onCancelOrder();
  };

  return (
    <View style={styles.container}>
      <CancelDialog
        title={'Cancel Order?'}
        message={`Are you sure you want to cancel your orders from ${orderItem.store_name}?`}
        hintInput={'Reason'}
        onConfirm={(reason) => handleCancelOrder(reason)}
        isInputRequired={true}
        onCancel={() => {
          setIsVisible(false);
        }}
        isVisible={isVisible}
      />
      <View style={styles.storeContainer}>
        <OrderStatus title={orderItem.status} status={orderItem.status} />
        <AppText style={styles.storeName}>{orderItem.store_name}</AppText>
      </View>
      <AppText>Order# {orderItem.order_code}</AppText>
      <View style={styles.itemsContainer}>
        {orderItem.items ? (
          <FlatList
            data={orderItem.items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <OrderItem item={item} />}
            refreshing={refreshing}
            ItemSeparatorComponent={ListItemSeparator}
          />
        ) : (
          <></>
        )}
      </View>

      {orderItem.delivery_fee ? (
        <View style={styles.deliveryRatesContainer}>
          <AppText style={{ fontStyle: 'italic' }}>Delivery Fee</AppText>
          <AppText style={{ fontStyle: 'italic' }}>
            P {orderItem.delivery_fee}
          </AppText>
          <AppText style={{ fontStyle: 'italic' }}>+</AppText>
        </View>
      ) : (
        <View style={styles.deliveryRatesContainer}>
          <AppText style={{ color: colors.secondary }}>Free Delivery</AppText>
        </View>
      )}

      <View style={styles.pricingDetails}>
        <AppText style={styles.priceText}>Total Order Price</AppText>
        <AppText style={styles.price}>
          P {numberTransform.numberWithComma(orderItem.total_price)}
        </AppText>
      </View>
      <View>
        {orderItem.status === 'pending' ? (
          <AppButton
            title='Cancel Order'
            color='danger'
            onPress={() => setIsVisible(true)}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 15,
    backgroundColor: colors.white,
    // padding: 20,
  },
  deliveryRatesContainer: {
    borderTopColor: colors.secondary,
    borderTopWidth: 1,
    flexDirection: 'row-reverse',
    padding: 10,
    paddingRight: 20,
  },
  storeContainer: {
    flexDirection: 'row-reverse',
  },
  storeName: {
    fontWeight: 'bold',
    fontSize: 20,
    // textAlign: 'center',
    marginTop: 15,
    marginRight: 20,
  },
  pricingDetails: {
    flexDirection: 'row-reverse',
    padding: 10,
    paddingRight: 20,
  },
  price: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  priceText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default Order;
