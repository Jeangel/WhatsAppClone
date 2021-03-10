import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Chats, ChatsHeader } from '../screens/Chats';
import { Chat } from '../screens/Chat';

export type ChatStackParamList = {
  Chats: undefined;
  Chat: { chatId: string } | undefined;
};

const ChatsStack = createStackNavigator<ChatStackParamList>();

export const ChatsStackNav = () => {
  return (
    <ChatsStack.Navigator
      screenOptions={{
        header: ChatsHeader,
      }}>
      <ChatsStack.Screen name="Chats" component={Chats} />
      <ChatsStack.Screen name="Chat" component={Chat} />
    </ChatsStack.Navigator>
  );
};
