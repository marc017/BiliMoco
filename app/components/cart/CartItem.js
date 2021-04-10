import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from '../../config/colors';
import AppText from '../AppText';
import QuantityToggle from './QuantityToggle';
import numberTransform from '../../utility/numberTransform';
import cartApi from '../../api/cart';

function CartItem({ item, renderRightActions, onPriceUpdate }) {
  // const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [totalPrice, setTotalPrice] = useState(item.total_price);

  const handleCartItemPriceUpdate = () => {
    cartApi.updateCartItem(item);
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.image}
            preview={{ uri: item.images[0].thumbnailUrl }}
            tint='light'
            uri={item.images[0].url}
          />
        </View>
        <View>
          <AppText style={styles.itemName}>{item.item_name}</AppText>
          <AppText style={styles.price}>
            P {numberTransform.numberWithComma(totalPrice)}
          </AppText>
          <QuantityToggle
            quantity={item.quantity}
            stockQty={item.stock_qty}
            onQtyChange={(qty) => {
              const temp = item.price * qty;
              item.total_price = temp;
              item.quantity = qty;
              setTotalPrice(temp);
              onPriceUpdate();
              handleCartItemPriceUpdate();
            }}
          />
        </View>
        <View style={styles.slider}>
          <MaterialCommunityIcons
            color={colors.darkGray}
            name='chevron-right'
            size={25}
          />
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  slider: {
    right: 0,
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  itemName: {
    fontWeight: 'bold',
  },
  price: {
    fontWeight: '700',
    color: colors.secondary,
  },
});

export default CartItem;
