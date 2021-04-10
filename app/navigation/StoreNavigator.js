import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import defaultStyles from '../config/styles';
import StoresScreen from '../screens/StoresScreen';
import StoreDetailsScreen from '../screens/StoreDetailsScreen';
import StoreItemScreen from '../screens/StoreItemScreen';
import colors from '../config/colors';

const Stack = createStackNavigator();

function StoreNavigator(props) {
  const [headerOpt, setHeaderOpt] = useState();
  useEffect(() => {
    setHeaderOpt({
      title: '',
      headerTitleStyle: {
        color: colors.white
      },
      headerStyle: {
          backgroundColor: colors.primary
      },
      headerTintColor: colors.white
    })
  }, []);
  return (
    <Stack.Navigator mode='modal' screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name={routes.STORES} 
        component={StoresScreen} 
        options={{
          title: '',
          headerShown: false,
        }} />
      <Stack.Screen
        name={routes.STORE_DETAILS}
        options={headerOpt}
        component={StoreDetailsScreen}
      />
      <Stack.Screen 
        name={routes.STORE_ITEMS} 
        component={StoreItemScreen}
        options={headerOpt} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default StoreNavigator;
