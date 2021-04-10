import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import AppText from '../AppText';
import ListItemSeparator from '../ListItemSeparator';
import OrderItem from '../orders/OrderItem';
import orderApi from '../../api/orders';
import colors from '../../config/colors';
import numberTransform from '../../utility/numberTransform';
import AppButton from '../AppButton';
import AppDialog from '../dialogs/AppDialog';
import OrderStatus from '../orders/OrderStatus';
import CancelDialog from '../dialogs/CancelDialog';
import userApi from '../../api/users';
import Icon from '../Icon';
import IconButton from '../IconButton';

function StoreOrder({ orderItem, onCancelOrder, onConfirmOrder = null }) {
  const [refreshing, setRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isShippingVisible, setIsShippingVisible] = useState(false);
  const [isDeliveryVisible, setIsDeliveryVisible] = useState(false);
  const [isCompleteVisible, setIsCompleteVisible] = useState(false);
  const [customer, setCustomer] = useState();

  const getCustomerInfo = async () => {
    const customer = await userApi.getUserById(orderItem.buyer_id);

    if (!customer.ok) return console.error('Could not retrieve customer info');
    // console.log(customer.data.data);
    setCustomer(customer.data.data);
  };

  const handleCancelOrder = async (reason) => {
    // call api to cancel order
    const cancelResult = await orderApi.ownerCancelOrder({
      ...orderItem,
      reason: reason,
    });
    setIsVisible(false);
    onCancelOrder();
  };

  const handleConfirmOrder = async (reason, type) => {
    // call api to cancel order
    const result = await orderApi.orderActionUpdate({
      ...orderItem,
      reason: reason,
      type: type
    });
    console.log(result);
    setIsConfirmVisible(false);
    onConfirmOrder();
  };

  useEffect(() => {
    getCustomerInfo();
  }, []);

  return (
    <View style={styles.container}>
      <CancelDialog
        title={'Cancel Order?'}
        message={`Are you sure you want to cancel your orders from ${orderItem.store_name}?`}
        hintInput={'Reason'}
        onConfirm={(reason) => handleCancelOrder(reason)}
        isInputRequired={true}
        onCancel={() => {
          setIsVisible(false);
        }}
        isVisible={isVisible}
      />
      <CancelDialog
        title={'Confirm Order?'}
        message={`Are you sure you want to confirm this order? Remarks (Optional)`}
        onConfirm={(reason) => handleConfirmOrder(reason, 'confirmed')}
        isInputRequired={false}
        onCancel={() => {
          setIsConfirmVisible(false);
        }}
        isVisible={isConfirmVisible}
      />
      <CancelDialog
        title={'Mark Order for Shipping?'}
        message={`Are you sure you want to mark this order for shipping? Remarks (Optional)`}
        onConfirm={(reason) => handleConfirmOrder(reason, 'forShipping')}
        isInputRequired={false}
        onCancel={() => {
          setIsShippingVisible(false);
        }}
        isVisible={isShippingVisible}
      />
      <CancelDialog
        title={'Mark Order for Delivery?'}
        message={`Are you sure you want to mark this order for delivery? Remarks (Optional)`}
        onConfirm={(reason) => handleConfirmOrder(reason, 'forDelivery')}
        isInputRequired={false}
        onCancel={() => {
          setIsDeliveryVisible(false);
        }}
        isVisible={isDeliveryVisible}
      />
      <CancelDialog
        title={'Mark Order as Complete?'}
        message={`Are you sure you want to mark this order as Complete? Remarks (Optional)`}
        onConfirm={(reason) => handleConfirmOrder(reason, 'completed')}
        isInputRequired={false}
        onCancel={() => {
          setIsCompleteVisible(false);
        }}
        isVisible={isCompleteVisible}
      />

      <View style={styles.storeContainer}>
        <OrderStatus title={orderItem.status} status={orderItem.status} />
        <AppText style={styles.storeName}>{orderItem.store_name}</AppText>
      </View>
      <AppText>Order# {orderItem.order_code}</AppText>
      {customer? (
        <View style={styles.customerInfo}>
          <View style={styles.icon}>
            {
              (orderItem.status !== 'completed') ? 
              <IconButton
                iconName='message'
                iconPack='material'
                backgroundColor={colors.secondary}
                onPress={() => console.log('test')}
              />
              : <></>
            }
          </View>

          <AppText style={styles.customerDetails}>
            Customer: {customer.first_name} {customer.last_name}
          </AppText>
          <AppText style={styles.customerDetails}>
            Mobile: {customer.contact_no}
          </AppText>
          <AppText style={[styles.capitalize, styles.customerDetails]}>
            Address: {customer.full_address}
          </AppText>
        </View>
      ) : (
        <></>
      )}
      <View style={styles.itemsContainer}>
        {orderItem.items ? (
          <FlatList
            data={orderItem.items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <OrderItem item={item} />}
            refreshing={refreshing}
            ItemSeparatorComponent={ListItemSeparator}
          />
        ) : (
          <></>
        )}
      </View>

      {orderItem.delivery_fee ? (
        <View style={styles.deliveryRatesContainer}>
          <AppText style={{ fontStyle: 'italic' }}>Delivery Fee</AppText>
          <AppText style={{ fontStyle: 'italic' }}>
            P {orderItem.delivery_fee}
          </AppText>
          <AppText style={{ fontStyle: 'italic' }}>+</AppText>
        </View>
      ) : (
        <View style={styles.deliveryRatesContainer}>
          <AppText style={{ color: colors.secondary }}>Free Delivery</AppText>
        </View>
      )}

      <View style={styles.pricingDetails}>
        <AppText style={styles.priceText}>Total Order Price</AppText>
        <AppText style={styles.price}>
          P {numberTransform.numberWithComma(orderItem.total_price)}
        </AppText>
      </View>
      <View>
        <>
          {orderItem.status === 'pending' && onConfirmOrder ? 
            <AppButton
              title='Confirm Order'
              color='primary'
              onPress={() => setIsConfirmVisible(true)}
            />
            : <></>
          }
          {orderItem.status === 'confirmed' && onConfirmOrder ? 
            <AppButton
              title='Mark for Shipping'
              color='primary'
              onPress={() => setIsShippingVisible(true)}
            />
            : <></>
          }
          {orderItem.status === 'forShipping' && onConfirmOrder ? 
            <AppButton
              title='Mark for Delivery'
              color='primary'
              onPress={() => setIsDeliveryVisible(true)}
            />
            : <></>
          }
          {orderItem.status === 'forDelivery' && onConfirmOrder ? 
            <AppButton
              title='Mark as Complete'
              color='primary'
              onPress={() => setIsCompleteVisible(true)}
            />
            : <></>
          }
          {orderItem.status === 'pending' ? (
            <AppButton
              title='Cancel Order'
              color='danger'
              onPress={() => setIsVisible(true)}
            />
          ) : (
            <></>
          )}
        </>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  capitalize: {
    textTransform: 'capitalize',
  },
  customerDetails: {
    color: colors.white,
  },
  customerInfo: {
    marginTop: 15,
    backgroundColor: colors.primary,
    padding: 15,
  },
  container: {
    margin: 20,
    borderRadius: 15,
    backgroundColor: colors.white,
    // padding: 20,
  },
  deliveryRatesContainer: {
    borderTopColor: colors.secondary,
    borderTopWidth: 1,
    flexDirection: 'row-reverse',
    padding: 10,
    paddingRight: 20,
  },
  icon: {
    flexDirection: 'row-reverse',
    position: 'absolute',
    flex: 1,
    alignSelf: 'flex-end',
    zIndex: 1,
    padding: 5,
  },
  storeContainer: {
    flexDirection: 'row-reverse',
  },
  storeName: {
    fontWeight: 'bold',
    fontSize: 20,
    // textAlign: 'center',
    marginTop: 15,
    marginRight: 20,
  },
  pricingDetails: {
    flexDirection: 'row-reverse',
    padding: 10,
    paddingRight: 20,
  },
  price: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  priceText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default StoreOrder;
