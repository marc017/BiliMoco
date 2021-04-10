import React from 'react';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import colors from '../config/colors';

function ListItem({
  image,
  title,
  subTitle,
  price,
  IconComponent,
  onPress,
  renderRightActions,
  label = '',
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.background} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title} numberOfLines={1}>
              {title}
            </AppText>
            {subTitle && (
              <AppText style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </AppText>
            )}
            {price && (
              <AppText style={styles.price} numberOfLines={2}>
                {price}
              </AppText>
            )}
            {label ? <AppText style={styles.label}>{label}</AppText> : <></>}
          </View>
          <MaterialCommunityIcons
            color={colors.darkGray}
            name='chevron-right'
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  title: {
    fontWeight: '800',
  },
  subTitle: {
    color: colors.gray,
  },
  price: {
    color: colors.secondary,
  },
  label: {
    backgroundColor: colors.secondary,
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 15,
    padding: 5,
    width: '25%',
  },
});

export default ListItem;
