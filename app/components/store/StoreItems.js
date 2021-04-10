import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import useApi from '../../hooks/useApi';
import storeItemsApi from '../../api/storeItems';
import AppCard from '../AppCard';
import routes from '../../navigation/routes';
import colors from '../../config/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppText from '../AppText';

function StoreItems({ storeId, navigation }) {
  const { data: items, error, loading, request: loadItems } = useApi(
    storeItemsApi.getStoreItemList
  );

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadItems(storeId);
  }, []);

  return (
    <View style={styles.container}>
      {
        items.length > 0 ?
          <FlatList
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.STORE_ITEMS, item)}
            >
              <AppCard
                title={item.item_name}
                subTitle={item.item_desc}
                imageUrl={item.images[0].url}
                price={item.price}
                containerStyle={styles.itemContainer}
              />
            </TouchableOpacity>
          )}
          refreshing={refreshing}
          onRefresh={() => loadItems(storeId)}
        />
        :
        <View style={styles.noItemContainer}>
          <AppText style={{color: colors.danger}}>No Items</AppText>
        </View>
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '65%',

    flexGrow: 1,
    backgroundColor: colors.backgroundGray,
  },
  listContainer: {
    flexDirection: 'column',
  },
  itemContainer: {
    margin: 5,
    width: 180,
    flex: 1,
  },
  noItemContainer: {
    marginTop: '10%',
    color: colors.danger
  }
});

export default StoreItems;
