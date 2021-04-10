import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppText from '../AppText';
import Icon from '../Icon';
import colors from '../../config/colors';

function QuantityToggle({ quantity, stockQty, onQtyChange }) {
  const [qty, setQty] = useState(quantity >= stockQty ? stockQty : quantity);

  // useEffect(() => {
  //   setQty(qty >= stockQty ? stockQty : qty);
  // }, []);

  const addQty = async (isAdd) => {
    let temp = qty;
    if (isAdd) {
      if (qty >= stockQty) return temp;
      temp = qty + 1;
      setQty(qty + 1);
    } else {
      if (qty <= 1) return temp;
      temp = qty - 1;
      setQty(qty - 1);
    }
    return temp;
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={async () => {
          const temp = await addQty(false);
          onQtyChange(temp);
        }}
      >
        <Icon name={'minus'} backgroundColor={colors.secondary} />
      </TouchableOpacity>
      <View stlye={styles.qtyContainer}>
        {qty ? <AppText style={styles.text}>{qty}</AppText> : <></>}
      </View>

      <TouchableOpacity
        onPress={async () => {
          const temp = await addQty(true);
          onQtyChange(temp);
        }}
      >
        <Icon name={'plus'} backgroundColor={colors.secondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
    paddingLeft: 10,
    // width: '50%',
  },
  text: {
    textAlign: 'center',
    marginRight: 10,
  },
});

export default QuantityToggle;
