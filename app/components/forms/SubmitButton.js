import React from 'react';
import { StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

import AppButton from '../AppButton';

function SubmitButton({ title, color = 'primary' }) {
  const { handleSubmit } = useFormikContext();

  return <AppButton title={title} onPress={handleSubmit} color={color} />;
}

const styles = StyleSheet.create({});

export default SubmitButton;
