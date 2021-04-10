import React, { useState } from 'react';
import { Notifications } from 'expo';
import { View, Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';

import messagesApi from '../api/messages';
import {
  AppFormField,
  SubmitButton,
  AppForm,
  AppErrorMessage,
} from '../components/forms';

const validationSchema = Yup.object().shape({
  message: Yup.string().required().label('Message'),
});

function ContactSellerForm({ listing }) {
  const [error, setError] = useState();
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing.id);

    if (!result.ok) {
      setError('Could not send the message to the Seller');
      console.error('Error', result);
      return Alert.alert('Error', 'Could not send the message to the Seller');
    }

    resetForm();

    Notifications.presentLocalNotificationAsync({
      title: 'Awesome!',
      body: 'Your message was sent to the seller.',
    });
  };

  return (
    <View>
      <AppForm
        initialValues={{
          message: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          textContentType='none'
          placeholder='Message'
          name='message'
        />
        <SubmitButton title='Contact Seller' />
      </AppForm>
    </View>
  );
}

export default ContactSellerForm;
