import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Chats, ChatsHeader } from '../screens/Chats';
import { Chat, ChatHeader } from '../screens/Chat';

export type ChatStackParamList = {
  Chats: undefined;
  Chat: { chatId: string } | undefined;
};

const ChatsStack = createStackNavigator<ChatStackParamList>();

export const ChatsStackNav = () => {
  return (
    <ChatsStack.Navigator>
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
    </ChatsStack.Navigator>
  );
};
