import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import colors from "../config/colors";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";

const initialMessages = [
  {
    id: 1,
    title: "Marc Joseph Nunez",
    description: "Hi there! Would you like to join our services?",
    image: "https://picsum.photos/200",
  },
  {
    id: 2,
    title: "Marc Joseph Nunez",
    description:
      "It is very simple to join, just create an account and create your own store. You can still buy items from other stores. It's very simte and easy!",
    image: "https://picsum.photos/200",
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    // Delete the message from
    setMessages(messages.filter((m) => m.id !== message.id));
    // delete from api
  };

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
            onPress={() => console.log("message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          // call api
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: "https://picsum.photos/200",
            },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
