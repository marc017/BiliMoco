import React, { useState, useContext } from 'react';
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
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().label('Email'),
  password: Yup.string().required().min(5).label('Password'),
});

function LoginScreen(props) {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  
  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    console.log(result);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.logIn(result.data);
  };

  return (
    <Screen style={styles.container}>
      <Image
        style={styles.logo}
        source={{ uri: 'https://picsum.photos/500' }}
      />
      <AppForm
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppErrorMessage
          error='Invalid email and/or password.'
          visible={loginFailed}
        />
        <AppFormField
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          icon='account-box-outline'
          placeholder='Email or Username'
          name='email'
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
        <SubmitButton title='login' />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
