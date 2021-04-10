import React from 'react';
import { View, StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';
import AppCard from '../AppCard';

function StoreItemCard(props) {
  return (
    <View style={styles.container}>
      <AppCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default StoreItemCard;
