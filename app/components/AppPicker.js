import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';
import AppText from './AppText';
import Screen from './Screen';
import AppPickerItem from './AppPickerItem';

function AppPicker({
  label = '',
  icon,
  items,
  selectedItem,
  onSelectItem = () => {},
  PickerItemComponent = AppPickerItem,
  numberOfColumns = 1,
  placeHolder,
  width = '100%',
}) {

  let selectedValue = items.find(
    (i) => i.label == selectedItem || i.addressLabel == selectedItem
  );
  selectedValue = selectedValue ? selectedValue : '';
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View >
        <AppText style={styles.label}>{label}</AppText>
      </View>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width: width }]}>
          {icon && (
            <MaterialCommunityIcons
              style={styles.icon}
              name={icon}
              size={20}
              color={defaultStyles.colors.dark}
            />
          )}
          {selectedValue?.label?.length > 0 ? (
            <AppText style={styles.text}>{selectedValue.label}</AppText>
          ) : selectedValue?.addressLabel ? (
            <AppText style={styles.text}>{selectedValue.addressLabel}</AppText>
          ) : (
            <AppText style={styles.placeHolder}>{placeHolder}</AppText>
          )}

          <MaterialCommunityIcons
            name='chevron-down'
            size={20}
            color={defaultStyles.colors.dark}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType='slide'>
        <Screen>
          <Button title='Close' onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            style={styles.flatList}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => {
              const label =
                item.label.length > 0 ? item.label : item.addressLabel;
              return (
                <PickerItemComponent
                  item={item}
                  label={label}
                  onPress={() => {
                    setModalVisible(false);
                    if (onSelectItem) {
                      onSelectItem(item);
                    }
                  }}
                />
              );
            }}
          ></FlatList>
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.backgroundGray,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    borderColor: defaultStyles.colors.gray,
    borderWidth: 1
  },
  flatList: {
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  placeHolder: {
    color: defaultStyles.colors.darkGray,
    flex: 1,
  },
  text: {
    flex: 1,
  },
  label: {
    fontWeight: "700",
    textTransform: 'capitalize',
    marginTop: 10
  },
});

export default AppPicker;
