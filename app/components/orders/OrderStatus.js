import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../AppText';
import colors from '../../config/colors';

function OrderStatus({ title, status }) {
  return (
    <View style={[styles.container, { backgroundColor: colors[status] }]}>
      <AppText style={styles.text}>
        {title === 'inProgress' ? 'In Progress' : title}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 130,
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default OrderStatus;
