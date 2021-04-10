import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import ActivityIndicator from '../components/ActivityIndicator';
import listingApi from '../api/listings';
import colors from '../config/colors';
import Screen from '../components/Screen';
import AppCard from '../components/AppCard';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import useApi from '../hooks/useApi';
import routes from '../navigation/routes';

function ListingsScreen({ navigation }) {
  const { data: listings, error, loading, request: loadListings } = useApi(
    listingApi.getListings
  );

  useEffect(() => {
    loadListings();
  }, []);
  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Couldn't retrieve the listings.</AppText>
          <AppButton title='retry' color='secondary' />
        </>
      )}
      {/* <ActivityIndicator visible={loading} /> */}
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <AppCard
            title={item.title}
            subTitle={'Php ' + item.price}
            imageUrl={item.images[0].url}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.background,
  },
});

export default ListingsScreen;
