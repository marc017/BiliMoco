import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import colors from '../config/colors';
import AppText from './AppText';

function AppCard({
  title,
  subTitle,
  price,
  imageUrl,
  onPress,
  thumbnailUrl,
  containerStyle,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card, containerStyle]}>
        <Image
          style={styles.image}
          tint='light'
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        ></Image>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
          {price ? <AppText style={styles.price}>P {price}</AppText> : <></>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: 'hidden',
  },
  detailsContainer: {
    padding: 15,
  },
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: '800',
  },
  subTitle: {
    color: colors.gray,
  },
  title: {
    marginBottom: 7,
    fontWeight: 'bold',
  },
});

export default AppCard;
