import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import defaultStyles from '../config/styles';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import cartApi from '../api/cart';
import { useIsFocused } from '@react-navigation/native';
import AppCard from '../components/AppCard';
import CartItems from '../components/cart/CartItems';
import ListItemSeparator from '../components/ListItemSeparator';
import colors from '../config/colors';

function ShoppingCartScreen(props) {
  const [cartList, setCartlist] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getCartList = async () => {
    const temp = await cartApi.getCartList();
    setCartlist(temp.data);
  };

  const onCartCheckout = (cart) => {
    setCartlist(cartList.filter((c) => c.id !== cart.id));
  };

  useEffect(() => {
    getCartList();
  }, [useIsFocused]);

  return (
    <Screen style={styles.container}>
      {cartList.length < 1 ? (
        <>
          <AppText style={styles.cartEmpty}>Cart Empty</AppText>
        </>
      ) : (
        <></>
      )}
      {cartList ? (
        <FlatList
          data={cartList}
          keyExtractor={(cart) => cart.id.toString()}
          renderItem={({ item }) => {
            if (item) {
              return <CartItems cart={item} onCartCheckout={onCartCheckout} onCartUpdate={() => getCartList()}/>;
            } else {
              return <AppText style={styles.cartEmpty}>Cart Empty</AppText>;
            }
          }}
          refreshing={refreshing}
          onRefresh={() => getCartList()}
          // ItemSeparatorComponent={ListItemSeparator}
        />
      ) : (
        <></>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
  },
  cartEmpty: {
    textAlign: 'center',
    marginTop: 50,
    color: colors.danger,
  },
});

export default ShoppingCartScreen;
