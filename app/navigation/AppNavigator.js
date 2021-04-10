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
import OrderNavigator from './OrderNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  useNotifications();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={routes.STORES}
        component={StoreNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.CART}
        component={ShoppingCartScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='cart' color={color} size={size} />
          ),
          
          // tabBarButton: () => (
          //   <NewListingButton
          //     onPress={() => navigation.navigate(routes.LISTING_EDIT)}
          //   />
          // ),
        })}
      />
      <Tab.Screen
        name={routes.ORDERS}
        component={OrderNavigator}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='shopping-bag' size={size} color={color} />
          ),
          tabBarBadge: 1
          // tabBarButton: () => (
          //   <NewListingButton
          //     onPress={() => navigation.navigate(routes.LISTING_EDIT)}
          //   />
          // ),
        })}
      />
      <Tab.Screen
        name={routes.ACCOUNT}
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='account' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
