import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableHighlight } from 'react-native';

import colors from '../config/colors';
import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';
import Icon from '../components/Icon';
import navigationTheme from '../navigation/navigationTheme';
import AuthContext from '../auth/context';
import storage from '../auth/storage';
import useAuth from '../auth/useAuth';

const actions = [
  {
    title: 'My Addresses',
    icon: {
      name: 'address-book',
      backgroundColor: colors.primary,
      iconPack: 'fontawesome',
    },
    targetScreen: 'Addresses',
  },
  {
    title: 'My Store',
    icon: {
      name: 'store',
      backgroundColor: colors.warning,
      iconPack: 'fa5',
    },
    targetScreen: 'MyStore',
  },
  {
    title: 'My Messages',
    icon: {
      name: 'list',
      backgroundColor: colors.secondary,
      iconPack: 'fontawesome',
    },
    targetScreen: 'Messages',
  },
];

function MyAccountScreen({ navigation }) {
  const { user, logOut, setUser } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          image={'https://picsum.photos/200'}
          title={`${user.first_name} ${user.last_name}`}
          subTitle={user.email}
        />
      </View>
      <View style={styles.actionsContainer}>
        <TouchableHighlight>
          <FlatList
            data={actions}
            keyExtractor={(action) => action.title.toString()}
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
                onPress={() => navigation.navigate(item.targetScreen)}
              />
            )}
            ItemSeparatorComponent={ListItemSeparator}
          />
        </TouchableHighlight>
      </View>
      <TouchableHighlight>
        <View style={styles.logOutContainer}>
          <ListItem
            title={'Log Out'}
            IconComponent={
              <Icon name='logout' backgroundColor={colors.danger} />
            }
            onPress={() => logOut()}
          />
        </View>
      </TouchableHighlight>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  screen: {
    backgroundColor: colors.background,
  },
  actionsContainer: {
    marginTop: 40,
    backgroundColor: colors.white,
  },
  logOutContainer: {
    marginTop: 15,
    backgroundColor: colors.white,
  },
});

export default MyAccountScreen;
