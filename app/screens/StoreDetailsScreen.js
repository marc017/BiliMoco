import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import defaultStyles from '../config/styles';
import AppText from '../components/AppText';
import ListItem from '../components/ListItem';
import StoreItems from '../components/store/StoreItems';

function StoreDetailsScreen({ route, navigation }) {
  const store = route.params;
  navigation.setOptions({ title: store.store_name });
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        preview={{ uri: store.images.thumbnailUrl }}
        tint='light'
        uri={store.images.url}
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{store.store_name}</AppText>
        <AppText style={styles.subTitle}>{store.store_desc}</AppText>
      </View>
      <StoreItems storeId={store.id} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 150,
  },
  subTitle: {
    color: defaultStyles.colors.gray,
    fontWeight: '500',
  },
  title: {
    marginBottom: 7,
    fontWeight: 'bold',
  },
  container: {
    height: '100%'
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default StoreDetailsScreen;
