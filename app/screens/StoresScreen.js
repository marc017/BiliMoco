import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Constants from "expo-constants";

import defaultStyles from '../config/styles';
import storeApi from '../api/stores';
import searchApi from '../api/searchItems';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import useApi from '../hooks/useApi';
import AppButton from '../components/AppButton';
import ActivityIndicator from '../components/ActivityIndicator';
import AppCard from '../components/AppCard';
import routes from '../navigation/routes';
import AppStaticNav from '../components/nav/AppStaticNav';
import colors from '../config/colors';

function StoresScreen({ navigation }) {
  const [progress, setProgress] = useState(0);
  const [keyword, setKeyword] = useState('');

  const { data: stores, error, loading, request: loadStores } = useApi(
    storeApi.getStoreList
  );

  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = async (keyword) => {
    setKeyword(keyword.keyword);
    loadStores(keyword.keyword);
  }

  useEffect(() => {
    loadStores();
  }, []);
  return (
    <View style={styles.container}>
      {error && (
        <>
          <AppText>Couldn't retrieve the listings.</AppText>
          <AppButton title='retry' color='secondary' />
        </>
      )}
      <ActivityIndicator visible={loading} />
      <View style={styles.navBar}>
        <AppStaticNav onSubmit={handleSearch} />
      </View>
      {
        stores?.length === 0 ? 
        <View style={styles.noResult}>
          <AppText>No Result Found</AppText>
        </View> : <></>
      }
      
      <View style={styles.screen}>
        <FlatList
          data={stores}
          keyExtractor={(store) => `${store.id}`}
          renderItem={({ item }) => (
            <AppCard
              title={item.store_name}
              subTitle={item.store_desc}
              imageUrl={item.images.url}
              containerStyle={styles.storeContainer}
              onPress={() => navigation.navigate(routes.STORE_DETAILS, item)}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => loadStores()}
        />
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.primary,
    height: '100%'
  },
  screen: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: defaultStyles.colors.backgroundGray,
    // borderWidth: 1,
    height: '100%'

  },
  navBar: {
    // width: '100%',
    
  },
  noResult: {
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.black
  },
  storeContainer: {
    borderWidth: 1,
    borderColor: colors.backgroundGray
  }
});

export default StoresScreen;
