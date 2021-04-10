import React from 'react';
import { View, StyleSheet } from 'react-native';
import Dialog from 'react-native-dialog';
import colors from '../../config/colors';

function AppDialog({
  title,
  description,
  cancelLabel = 'Cancel',
  okayLabel = 'Confirm',
  isVisible,
  onCancel,
  onConfirm,
}) {
  return (
    <View style={styles.container}>
      <Dialog.Container visible={isVisible}>
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Description style={styles.description}>
          {description}
        </Dialog.Description>
        <Dialog.Button
          style={styles.cancelBtn}
          label={cancelLabel}
          onPress={onCancel}
        />
        <Dialog.Button
          style={styles.okBtn}
          label={okayLabel}
          onPress={onConfirm}
        />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  cancelBtn: {
    color: colors.danger,
  },
  description: {
    fontSize: 17,
  },
  okBtn: {
    color: colors.primary,
    fontWeight: '800',
  },
  title: {
    margin: 15,
  },
});

export default AppDialog;
