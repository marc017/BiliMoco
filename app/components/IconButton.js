import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFormikContext } from 'formik';
import colors from '../config/colors';
import Icon from './Icon';

function IconButton({
  iconName,
  iconPack,
  backgroundColor = 'primary',
  onPress,
  type = 'default'
}) {
  let handleSubmit = onPress;
  try {
    const formikContext = useFormikContext();
    handleSubmit = formikContext.handleSubmit;
  } catch {
    console.log('No form context');
  }
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[backgroundColor] }]}
      onPress={type === 'submit' ? handleSubmit : onPress}
    >
      <Icon
        style={styles.text}
        name={iconName}
        iconPack={iconPack}
        backgroundColor={backgroundColor}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  text: {
    textTransform: 'uppercase',
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default IconButton;
