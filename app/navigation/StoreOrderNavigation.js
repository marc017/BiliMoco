import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { FontAwesome } from '@expo/vector-icons';
import StoreNavigator from './StoreNavigator';
import AccountNavigator from './AccountNavigator';
import NewListingButton from './NewListingButton';
import routes from './routes';
import useNotifications from '../hooks/useNotifications';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import Icon from '../components/Icon';
import Constants from 'expo-constants';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyStoreOrdersScreen from '../screens/seller/MyStoreOrderScreen';
import colors from '../config/colors';

const Tab = createMaterialTopTabNavigator();

const StoreOrderNavigator = () => {
  useNotifications();
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12 },
        scrollEnabled: true,
        
        // tabStyle: { paddingTop: Constants.statusBarHeight },
        
      }}
    >
      <Tab.Screen
        name='Pending'
        component={MyStoreOrdersScreen}
        initialParams={{ filter: 'pending' }}
      />
      <Tab.Screen
        name='Confirmed'
        component={MyStoreOrdersScreen}
        initialParams={{ filter: 'confirmed' }}
      />
      <Tab.Screen
        name='For Shipping'
        component={MyStoreOrdersScreen}
        initialParams={{ filter: 'forShipping' }}
      />
      <Tab.Screen
        name='For Delivery'
        component={MyStoreOrdersScreen}
        initialParams={{ filter: 'forDelivery' }}
      />
      <Tab.Screen
        name='Completed'
        component={MyStoreOrdersScreen}
        initialParams={{ filter: 'completed' }}
      />
      <Tab.Screen
        name='Cancelled'
        component={MyStoreOrdersScreen}
        initialParams={{ filter: 'cancelled' }}
      />
    </Tab.Navigator>
  );
};

export default StoreOrderNavigator;
