import React from 'react';
import { View, StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppText from './AppText';
import Icon from './Icon';

function HeaderButton({ value, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button]} onPress={onPress}>
        <AppText style={styles.text}>{value}</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginRight: 25,
    flex: 1,
    // alignContent: 'center',
    // alignItems: 'center',
  },
  button: {},
  text: {
    color: defaultStyles.colors.white,
  },
});

export default HeaderButton;
