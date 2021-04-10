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
import colors from '../config/colors';

const Tab = createMaterialTopTabNavigator();

const OrderNavigator = () => {
  useNotifications();
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 10 },
        tabStyle: { paddingTop: Constants.statusBarHeight },
        scrollEnabled: true,
        
      
      }}
    >
      <Tab.Screen
        name='Pending'
        component={OrdersScreen}
        initialParams={{ filter: 'pending' }}
      />
      <Tab.Screen
        name='Confirmed'
        component={OrdersScreen}
        initialParams={{ filter: 'confirmed' }}
      />
      <Tab.Screen
        name='For Shipping'
        component={OrdersScreen}
        initialParams={{ filter: 'forShipping' }}
      />
      <Tab.Screen
        name='For Delivery'
        component={OrdersScreen}
        initialParams={{ filter: 'forDelivery' }}
      />
      <Tab.Screen
        name='Completed'
        component={OrdersScreen}
        initialParams={{ filter: 'completed' }}
      />
      <Tab.Screen
        name='Cancelled'
        component={OrdersScreen}
        initialParams={{ filter: 'cancelled' }}
      />
    </Tab.Navigator>
  );
};

export default OrderNavigator;
