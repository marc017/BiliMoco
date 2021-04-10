import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyAccountScreen from '../../screens/MyAccountScreen';
import MessagesScreen from '../../screens/MessagesScreen';
import routes from '../routes';
import AddressesScreen from '../../screens/AddressesScreen';
import AddressEditScreen from '../../screens/AddressEditScreen';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import HeaderButton from '../../components/HeaderButton';
import { navigationRef } from '../rootNavigation';
import MyStoreScreen from '../../screens/seller/MyStoreScreen';
import MyStoreEditScreen from '../../screens/seller/MyStoreEditScreen';
import storeApi from '../../api/stores';
import MyStoreItemsScreen from '../../screens/seller/MyStoreItemsScreen';
import MyStoreItemsEditScreen from '../../screens/seller/MyStoreItemsEditScreen';
import MyStoreOrdersScreen from '../../screens/seller/MyStoreOrderScreen';
import OrderNavigator from '../OrderNavigator';
import StoreOrderNavigator from '../StoreOrderNavigation';

const Stack = createStackNavigator();

const RiderNavigator = ({ navigation }) => {
  // check if there is already a store
  const [store, setStore] = useState();
  const getStore = async () => {
    const temp = await storeApi.getUserStoreList();

    if (!temp.ok) return;
    await setStore(temp.data);
  };

  useEffect(() => {
    getStore();
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.ACCOUNT}
        component={MyAccountScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name={routes.MESSAGES}
        component={MessagesScreen}
        options={{ title: 'Messages' }}
      />
      <Stack.Screen
        name={routes.ADDRESSES}
        component={AddressesScreen}
        options={{
          headerRight: () => (
            <HeaderButton
              value='Add'
              onPress={() =>
                navigation.navigate(routes.ADDRESS_EDIT, { isNew: true })
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name={routes.ADDRESS_EDIT}
        component={AddressEditScreen}
        options={{ title: 'Address Item' }}
      />
      <Stack.Screen
        name={routes.MY_STORE}
        component={MyStoreScreen}
        options={{
          headerRight: () => {
            if (store) {
              return (
                <HeaderButton
                  value='Edit'
                  onPress={() =>
                    navigation.navigate(routes.MY_STORE_EDIT, {
                      isNew: false,
                      store: store,
                    })
                  }
                />
              );
            } else {
              return (
                <HeaderButton
                  value='Create'
                  onPress={() =>
                    navigation.navigate(routes.MY_STORE_EDIT, { isNew: true })
                  }
                />
              );
            }
          },
          title: 'My Store',
        }}
      />
      <Stack.Screen
        name={routes.MY_STORE_EDIT}
        component={MyStoreEditScreen}
        options={{ title: 'My Store Edit' }}
      />
      <Stack.Screen
        name={routes.MY_STORE_ORDER}
        component={StoreOrderNavigator}
        options={{ title: 'My Store Orders' }}
      />

      <Stack.Screen
        name={routes.MY_STORE_ITEMS}
        component={MyStoreItemsScreen}
        options={{
          headerRight: () => (
            <HeaderButton
              value='Add'
              onPress={() => navigation.navigate(routes.MY_STORE_ITEMS_EDIT)}
            />
          ),
          title: 'My Store Items',
        }}
      />
      <Stack.Screen
        name={routes.MY_STORE_ITEMS_EDIT}
        component={MyStoreItemsEditScreen}
        options={{ title: 'Store Item' }}
      />
    </Stack.Navigator>
  );
};

export default RiderNavigator;
