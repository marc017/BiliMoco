import React from 'react';
import { View, StyleSheet } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import colors from '../../config/colors';

function CancelDialog({
  title,
  message,
  hintInput = '',
  showTextInput = true,
  isVisible,
  onCancel,
  onConfirm,
  isInputRequired = false,
}) {
  const handleConfirm = (inputText) => {
    if (isInputRequired && !inputText) return;
    onConfirm(inputText);
  };

  return (
    <View style={styles.container}>
      <DialogInput
        isDialogVisible={isVisible}
        title={title}
        message={message}
        hintInput={hintInput}
        submitInput={(inputText) => handleConfirm(inputText)}
        closeDialog={() => onCancel()}
      ></DialogInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CancelDialog;
