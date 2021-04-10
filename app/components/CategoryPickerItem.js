import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Icon from './Icon';
import AppText from './AppText';
import colors from '../config/colors';

function CategoryPickerItem({ item, onPress }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Icon
            backgroundColor={colors[item.backgroundColor]}
            name={item.icon}
            size={80}
            iconPack={item.iconPack}
          ></Icon>
          <AppText style={styles.label}>{item.label}</AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: 'center',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    // flexShrink: 1,
    // width: 100,
    flex: 1,
    // height: 200,
  },
  label: {
    paddingTop: 10,
    textAlign: 'center',
  },
});

export default CategoryPickerItem;
