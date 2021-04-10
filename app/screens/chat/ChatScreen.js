import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Screen } from 'react-native-screens';

function ChatScreen(props) {
  // get chats
  return (
    <Screen style={styles.container}>
      <GiftedChat />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChatScreen;
