import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup';

import defaultStyles from '../config/styles';
import Screen from '../components/Screen';
import {
  AppFormField,
  SubmitButton,
  AppForm,
  AppErrorMessage,
} from '../components/forms';
import usersApi from '../api/users';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';
import useApi from '../hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = Yup.object().shape({
  userName: Yup.string().required().min(5).label('User Name'),
  firstName: Yup.string().required().min(2).label('First Name'),
  lastName: Yup.string().required().min(2).label('Last Name'),
  email: Yup.string().required().email().label('Email'),
  contactNo: Yup.number().required().min(10).label('Contact No'),
  password: Yup.string().required().min(5).label('Password'),
});

function RegisterScreen(props) {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const { logIn } = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError('An unexpected error occured.');
      }
      return;
    }

    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    logIn(authToken);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <AppForm
          initialValues={{
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            contactNo: '',
            password: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='User Name'
            name='userName'
          />
          <AppFormField
            autoCapitalize='words'
            autoCorrect={false}
            textContentType='givenName'
            placeholder='First Name'
            name='firstName'
          />
          <AppFormField
            autoCapitalize='words'
            autoCorrect={false}
            textContentType='familyName'
            placeholder='Last Name'
            name='lastName'
          />
          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            textContentType='emailAddress'
            icon='email'
            placeholder='Email'
            name='email'
          />
          <AppFormField
            autoCorrect={false}
            placeholder='Contact No'
            name='contactNo'
          />
          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='lock'
            placeholder='Password'
            secureTextEntry
            textContentType='password'
            name='password'
          />
          <AppErrorMessage error={error} visible={error} />
          <SubmitButton title='login' />
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
