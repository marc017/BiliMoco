import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import storeApi from '../../api/stores';
import addressApi from '../../api/address';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import ListItemSeparator from '../../components/ListItemSeparator';
import ListItem from '../../components/ListItem';
import Icon from '../../components/Icon';
import routes from '../../navigation/routes';
import storage from '../../auth/storage';
import { useIsFocused } from '@react-navigation/native';

const storeMenu = [
  {
    title: 'Store Items',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: colors.secondary,
      iconPack: 'material',
    },
    targetScreen: routes.MY_STORE_ITEMS,
  },
  {
    title: 'Store Orders',
    icon: {
      name: 'shopping-bag',
      backgroundColor: colors.warning,
      iconPack: 'fontawesome',
    },
    targetScreen: routes.MY_STORE_ORDER,
  },
  {
    title: 'Reports',
    icon: {
      name: 'file-cabinet',
      backgroundColor: colors.primary,
      iconPack: 'material',
    },
    targetScreen: routes.MY_STORE_ITEMS,
  },
];

function MyStoreScreen({ navigation }) {
  const [store, setStore] = useState();
  const [address, setStoreAddress] = useState();
  const isFocused = useIsFocused();

  const getStore = async () => {
    const temp = await storeApi.getUserStoreList();

    if (!temp.ok) return;
    
    await getAddressDisplay(temp.data.id);
    setStore(temp.data);
  };

  const getAddressDisplay = async (storeId) => {
    const temp = await addressApi.getStoreAddress(storeId);

    if (!temp.ok) return;
    setStoreAddress(temp.data);
  }

  useEffect(() => {
    getStore();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {store ? (
        <View>
          <Image
            style={styles.image}
            preview={{
              uri: `${store.images.thumbnailUrl}`,
            }}
            tint='light'
            uri={store.images.url}
          />
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{store.store_name}</AppText>
            <AppText style={styles.desc}>{store.store_desc}</AppText>
          </View>
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>Contact Details</AppText>
            <AppText style={styles.desc}>+63{store.mobile_no}</AppText>
            <AppText style={styles.desc}>{store.email}</AppText>
            {
              address ? 
                <AppText style={{...styles.desc, ...styles.capitalize}}>{address.full_address.toLowerCase()}</AppText>
              : <></>
            }
          </View>
          <TouchableHighlight>
            <FlatList
              data={storeMenu}
              keyExtractor={(menu) => menu.title.toString()}
              renderItem={({ item }) => (
                <ListItem
                  title={item.title}
                  image={item.image}
                  IconComponent={
                    <Icon
                      name={item.icon.name}
                      iconPack={item.icon.iconPack}
                      backgroundColor={item.icon.backgroundColor}
                    />
                  }
                  onPress={() => navigation.navigate(item.targetScreen, store)}
                />
              )}
              ItemSeparatorComponent={ListItemSeparator}
            />
          </TouchableHighlight>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    marginTop: 20,
    padding: 10
  },
  subTitle: {
    color: colors.gray,
    fontWeight: '500',
  },
  title: {
    marginBottom: 7,
    fontWeight: 'bold',
    fontSize: 18,
  },
  desc: {
    fontSize: 16,
    paddingTop: 5
  },
  capitalize: {
    textTransform: 'capitalize'
  }
});

export default MyStoreScreen;
