import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

import orderApi from '../api/orders';
import Screen from '../components/Screen';
import Order from '../components/orders/Order';
import colors from '../config/colors';

function OrdersScreen({ navigation, route }) {
  const [orderList, setOrderList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const getOrderList = async () => {
    const tempOrderList = await orderApi.getOrderList();
    const filter = route.params.filter;
    const list = tempOrderList.data.filter((o) => o.status === filter);
    setOrderList(list);
  };

  const handleOrderCancel = async () => {
    getOrderList();
  };

  useEffect(() => {
    getOrderList();
  }, [isFocused]);
  return (
    <Screen style={styles.container}>
      {orderList ? (
        <FlatList
          data={orderList}
          refreshing={refreshing}
          onRefresh={() => getOrderList()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Order
              title={item.order_code}
              orderItem={item}
              onCancelOrder={handleOrderCancel}
            />
          )}
        />
      ) : (
        <></>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundGray,
    flex: 1,
  },
});

export default OrdersScreen;
