import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import colors from '../config/colors';
import ListItemSeparator from '../components/ListItemSeparator';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import routes from '../navigation/routes';
import addressApi from '../api/address';
import { useIsFocused } from '@react-navigation/native';
import UploadScreen from './UploadScreen';
import storage from '../auth/storage';

function AddressesScreen({ navigation }) {
  const [addresses, setAddresses] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState();

  const handleDelete = async (item) => {
    // Delete the address
    const result = await addressApi.deleteAddress(item.id, (progress) =>
      setProgress(progress)
    );
    // delete from api

    if (!result.ok) {
      setUploadVisible(false);
      return alert('Could not save the listing');
    }
    getAddress();
  };

  const getAddress = async () => {
    const addressList = await (await addressApi.getAddressList()).data;
    setAddresses(addressList);
  };

  const refreshAddress = () => {
    getAddress();
  };

  useEffect(() => {
    storage.getUser().then((user) => {
      setUser(user);
    });
    getAddress();
  }, [isFocused]);

  return (
    <Screen>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <FlatList
        data={addresses}
        keyExtractor={(address) => address.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.label}
            subTitle={item.address}
            label={item.is_default ? 'Default' : ''}
            onPress={() =>
              navigation.navigate(routes.ADDRESS_EDIT, {
                item: item,
                isNew: false,
                onUpdate: refreshAddress,
              })
            }
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          // call api
          getAddress();
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default AddressesScreen;
