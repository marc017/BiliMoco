import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import cartApi from '../../api/cart';
import ordersApi from '../../api/orders';
import CartItem from './CartItem';
import AppText from '../AppText';
import ListItemSeparator from '../ListItemSeparator';
import ListItemDeleteAction from '../ListItemDeleteAction';
import numberTransform from '../../utility/numberTransform';
import colors from '../../config/colors';
import AppButton from '../AppButton';
import AppDialog from '../dialogs/AppDialog';
import UploadScreen from '../../screens/UploadScreen';
import DeliveryRates from '../delivery/DeliveryRates';

function CartItems({ cart, onCartCheckout, onCartUpdate }) {
  const [totalPrice, setTotalPrice] = useState(cart.total_price);
  const [deliveryRate, setDeliveryRate] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDelete = async (item) => {
    const temp = await cartApi.removeFromCart(cart.id, item.id);
    cart.items = cart.items.filter((i) => i.id !== item.id);
    onCartUpdate();
    setRefreshing(true);
  };

  const handlePriceUpdate = async () => {
    let tempTotalPrice = 0;
    await cart.items.forEach((i) => {
      console.log('item', i);
      (tempTotalPrice += i.quantity * i.price)
    });

    cart.total_price = tempTotalPrice;
    cart.total_price += cart.delivery_fee;
    setTotalPrice(tempTotalPrice);
    cartApi.updateCart(cart);
  };

  const handleCheckout = async () => {
    setIsVisible(false);
    setUploadVisible(true);
    const createOrder = await ordersApi.createOrder(
      cart.items,
      cart.total_price,
      cart.id,
      cart.store_id,
      deliveryRate,
      (progress) => setProgress(progress)
    );

    if (!createOrder.ok) return;

    onCartCheckout(cart);
    // setUploadVisible(false);
  };

  return (
    <View style={styles.container}>
      <UploadScreen
        onDone={() => {
          setUploadVisible(false);
        }}
        progress={progress}
        visible={uploadVisible}
      />
      <AppDialog
        title={'Checkout'}
        description={`Check out items from ${cart.store_name}?`}
        okayLabel='Confirm'
        onConfirm={handleCheckout}
        onCancel={() => {
          setIsVisible(false);
        }}
        isVisible={isVisible}
      />
      <View style={styles.storeContainer}>
        <AppText style={styles.storeName}>{cart.store_name}</AppText>
      </View>
      <View style={styles.itemsContainer}>
        {cart.items ? (
          <FlatList
            data={cart.items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                renderRightActions={() => (
                  <ListItemDeleteAction onPress={() => handleDelete(item)} />
                )}
                onPriceUpdate={() => handlePriceUpdate()}
              />
            )}
            refreshing={refreshing}
            ItemSeparatorComponent={ListItemSeparator}
          />
        ) : (
          <></>
        )}
      </View>
      <View style={styles.deliveryRatesContainer}>
        <AppText style={{ fontStyle: 'italic' }}>Delivery Fee</AppText>
        <DeliveryRates
          storeId={cart.store_id}
          onReady={(deliveryFee) => {
            const temp = +totalPrice + +deliveryFee;
            cart.total_price = temp;
            cart.delivery_fee = deliveryFee;
            setDeliveryRate(deliveryFee);
            setTotalPrice(temp);
          }}
        />
        <AppText style={{ fontStyle: 'italic' }}>+</AppText>
      </View>
      <View style={styles.totalPriceContainer}>
        <AppText style={styles.price}>Total</AppText>
        <AppText style={styles.price}>
          P{numberTransform.numberWithComma(totalPrice)}
        </AppText>
      </View>
      <View style={styles.checkoutContainer}>
        <AppButton
          title='Checkout'
          color='secondary'
          onPress={() => {
            setIsVisible(true);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 15,
  },
  storeContainer: {
    padding: 10,
    marginTop: 20,
  },
  storeName: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  itemsContainer: {
    padding: 20,
  },
  price: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
    // flex: 1,
  },
  deliveryRatesContainer: {
    borderTopColor: colors.secondary,
    borderTopWidth: 1,
    flexDirection: 'row-reverse',
    padding: 10,
    paddingRight: 20,
  },
  totalPriceContainer: {
    flexDirection: 'row-reverse',
    padding: 20,
  },
});

export default CartItems;
