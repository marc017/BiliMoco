import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../AppText';
import { Image } from 'react-native-expo-image-cache';
import numberTransform from '../../utility/numberTransform';
import colors from '../../config/colors';

function OrderItem({ item }) {
  return (
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
          P {numberTransform.numberWithComma(item.total_price)}
        </AppText>
        <AppText style={styles.itemName}>x {item.quantity}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    margin: 20,

    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
});

export default OrderItem;
