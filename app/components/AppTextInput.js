import React from 'react';
import { View, Text, StyleSheet, Platform, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';
import AppText from './AppText';

function AppTextInput({ isMobileNo = false, label = '', icon, width = '100%', ...otherProps }) {
  return (
    <>
      {
        label !== '' ? 
        <View>
          <AppText style={styles.label}>{label}</AppText>
        </View>
        : <></>
      }
      
      <View style={[styles.container, { width: width }]}>
        {icon && (
          <MaterialCommunityIcons
            style={styles.icon}
            name={icon}
            size={20}
            color={defaultStyles.colors.dark}
          />
        )}
        {isMobileNo && (
          <AppText>+63</AppText>
        )}

          <TextInput
            placeholderTextColor={defaultStyles.darker}
            style={defaultStyles.text}
            {...otherProps}
          />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.backgroundGray,
    borderColor: defaultStyles.colors.gray,
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontWeight: "700",
    textTransform: 'capitalize',
    marginTop: 10
  },


});

export default AppTextInput;
