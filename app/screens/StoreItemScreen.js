import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-root-toast';

import AppText from '../components/AppText';
import StoreItems from '../components/store/StoreItems';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import Icon from '../components/Icon';
import colors from '../config/colors';
import numberTransform from '../utility/numberTransform';
import useApi from '../hooks/useApi';
import cart from '../api/cart';
import { color } from 'react-native-reanimated';

function StoreItemScreen({ route }) {
  const [qty, setQty] = useState(1);
  const item = route.params;
  const addQty = (isAdd) => {
    if (isAdd) {
      if (qty >= item.stock_qty) return;
      setQty(qty + 1);
    } else {
      if (qty <= 1) return;
      setQty(qty - 1);
    }
  };

  const handleAddToCart = async () => {
    const totalPrice = qty * item.price;
    const itemInfo = {
      id: item.id,
      store_item_id: item.id,
      store_id: item.store_id,
      quantity: qty,
      total_price: totalPrice,
    };

    const result = await cart.addToCart(itemInfo);
    if (!result.ok) {
      Toast.show('Failed to add to cart', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        hideOnPress: true,
        delay: 0,
        animation: true,
      });
      return;
    }
    Toast.show('Item added to cart', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      hideOnPress: true,
      delay: 0,
      animation: true,
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        preview={{ uri: item.images[0].thumbnailUrl }}
        tint='light'
        uri={item.images[0].url}
      />
      <View style={styles.itemContainer}>
        <View style={styles.itemTitleContainer}>
          <AppText style={styles.title}>{item.item_name}</AppText>
          <View>
            <AppText style={styles.price}>
              P{numberTransform.numberWithComma(item.price)}
            </AppText>
          </View>
          <View>
            <AppText>Stock: {item.stock_qty}</AppText>
          </View>
        </View>
        <View style={styles.itemDescContainer}>
          <AppText style={styles.descTitle}>Description</AppText>
          <AppText style={styles.subTitle}>{item.item_desc}</AppText>
        </View>
      </View>
      {/* <StoreItems storeId={store.id} /> */}
      <View style={styles.toolBarContainer}>
        <View style={styles.qtyToggleContainer}>
          <TouchableOpacity onPress={() => addQty(false)}>
            <Icon name={'minus'} backgroundColor={colors.secondary} />
          </TouchableOpacity>
          <View stlye={styles.qtyContainer}>
            {qty ? <AppText style={styles.text}>{qty}</AppText> : <></>}
          </View>

          <TouchableOpacity onPress={() => addQty(true)}>
            <Icon name={'plus'} backgroundColor={colors.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          {item.stock_qty > 0 ? (
            <AppButton title='Add to cart' onPress={handleAddToCart} />
          ) : (
            <AppButton
              title='No Stock'
              color='danger'
              onPress={() => console.log('No Stock')}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    // width: '100%',
  },
  descTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    marginBottom: 10
    // backgroundColor: colors.darker,
  },
  image: {
    width: '100%',
    height: 300,
  },
  itemContainer: {
    padding: 10,
  },
  itemTitleContainer: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 15,
  },
  itemDescContainer: {
    marginTop: 20,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 15,
  },
  toolBarContainer: {
    flex: 1,
    flexDirection: 'row',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  qtyContainer: {},
  qtyToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
    paddingLeft: 10,
    // width: '50%',
  },
  text: {
    textAlign: 'center',
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    // fontSize: 25,
  },
  subTitle: {},
  price: {
    fontWeight: '700',
    color: colors.secondary,
  },
});

export default StoreItemScreen;
