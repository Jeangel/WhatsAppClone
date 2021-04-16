import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Chats, ChatsHeader } from '../screens/Chats/Chats';
import { Chat, ChatHeader } from '../screens/Chats/Chat';
import { AddContact, AddContactHeader } from '../screens/Chats/AddContact';

export type ChatStackParamList = {
  Chats: undefined;
  Chat: { chatId: string } | undefined;
  AddContact: undefined;
};

const ChatsStack = createStackNavigator<ChatStackParamList>();

export const ChatsStackNav = () => {
  return (
    <ChatsStack.Navigator headerMode="screen">
      <ChatsStack.Screen
        name="Chats"
        component={Chats}
        options={{ header: ChatsHeader }}
      />
      <ChatsStack.Screen
        name="Chat"
        component={Chat}
        options={{ header: ChatHeader }}
      />
      <ChatsStack.Screen
        name="AddContact"
        component={AddContact}
        options={{
          header: AddContactHeader,
          headerTransparent: true,
        }}
      />
    </ChatsStack.Navigator>
  );
};
