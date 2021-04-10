import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { FontAwesome } from '@expo/vector-icons';
import StoreNavigator from '../StoreNavigator';
import AccountNavigator from '../AccountNavigator';
import routes from '../routes';
import useNotifications from '../../hooks/useNotifications';
import ShoppingCartScreen from '../../screens/ShoppingCartScreen';
import Icon from '../../components/Icon';
import NewListingButton from '../NewListingButton';

const Tab = createBottomTabNavigator();

const RiderMenuNavigator = () => {
  useNotifications();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={routes.ORDER_BOARD}
        component={StoreNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name='bulletin-board'
              iconPack='material'
              iconColor={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routes.RIDER_ORDER}
        component={ShoppingCartScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='cart' color={color} size={size} />
          ),
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(routes.LISTING_EDIT)}
            />
          ),
        })}
      />
      <Tab.Screen
        name={routes.ORDERS}
        component={OrderNavigator}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='shopping-bag' size={size} color={color} />
          ),
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

export default RiderMenuNavigator;
