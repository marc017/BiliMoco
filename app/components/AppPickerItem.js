import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';

function AppPickerItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      {!item.label.addressLabel ? (
        <AppText style={styles.text}>{item.label}</AppText>
      ) : (
        <>
          <AppText style={styles.addressLabel}>{item.addressLabel}</AppText>
          <AppText style={styles.fullAddress}>{item.full_address}</AppText>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
  addressLabel: {
    padding: 20,
    paddingBottom: 5,
  },
  fullAddress: {
    padding: 20,
    paddingTop: 0,
    fontSize: 15,
    color: colors.gray,
  },
});

export default AppPickerItem;
