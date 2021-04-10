import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import storeApi from '../../api/storeItems';
import AppText from '../../components/AppText';
import { FlatList } from 'react-native-gesture-handler';
import ListItem from '../../components/ListItem';
import ListItemDeleteAction from '../../components/ListItemDeleteAction';
import routes from '../../navigation/routes';
import { useIsFocused } from '@react-navigation/native';

function MyStoreItemsScreen({ route, navigation }) {
  const store = route.params;
  const isFocused = useIsFocused();
  const [storeItems, setStoreItems] = useState([]);

  // get store items
  const getStoreItems = async () => {
    const temp = await storeApi.getStoreItemList(store.id);

    if (!temp.ok) return;
    setStoreItems(temp.data);
  };

  useEffect(() => {
    getStoreItems();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.itemsCount}>
        <AppText>{storeItems.length} Items</AppText>
      </View>

      <FlatList
        data={storeItems}
        keyExtractor={(storeItems) => storeItems.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.item_name}
            subTitle={item.item_desc}
            image={item.images[0].url}
            onPress={() =>
              navigation.navigate(routes.MY_STORE_ITEMS_EDIT, item)
            }
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  itemsCount: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default MyStoreItemsScreen;
