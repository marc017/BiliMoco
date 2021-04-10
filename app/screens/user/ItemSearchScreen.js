import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import defaultStyles from '../config/styles';
import storeApi from '../api/stores';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import useApi from '../hooks/useApi';
import AppButton from '../components/AppButton';
import ActivityIndicator from '../components/ActivityIndicator';
import AppCard from '../components/AppCard';
import routes from '../navigation/routes';

function ItemSearchScreen({ navigation }) {
  const { data: stores, error, loading, request: loadStores } = useApi(
    storeApi.getStoreList
  );

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);
  // console.log(stores);
  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Couldn't retrieve the listings.</AppText>
          <AppButton title='retry' color='secondary' />
        </>
      )}

      <ActivityIndicator visible={loading} />

      <FlatList
        data={stores}
        keyExtractor={(store) => store.id.toString()}
        renderItem={({ item }) => (
          <AppCard
            title={item.store_name}
            subTitle={item.store_desc}
            imageUrl={item.images.url}
            onPress={() => navigation.navigate(routes.STORE_DETAILS, item)}
          />
        )}
        refreshing={refreshing}
        onRefresh={() => loadStores()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  screen: {
    padding: 20,
    backgroundColor: defaultStyles.colors.background,
  },
});

export default ItemSearchScreen;
