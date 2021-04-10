import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Screen } from 'react-native-screens';
import ListItem from '../../components/ListItem';
import ListItemSeparator from '../../components/ListItemSeparator';

function ChatRoomScreen(props) {
  const [messages, setMessages] = useState([]);
  const isFocus = useIsFocused();

  const getChatRooms = async () => {
    // get all chat rooms where the user belongs to
  };

  useEffect(() => {}, [isFocus]);

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log('message selected', item)}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          // call api
          setMessages([
            {
              id: 2,
              title: 'T2',
              description: 'D2',
              image: 'https://picsum.photos/200',
            },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChatRoomScreen;
