import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Chats, ChatsHeader } from '../screens/Chats';

const ChatsStack = createStackNavigator();

export const ChatsStackNav = () => {
  return (
    <ChatsStack.Navigator
      screenOptions={{
        header: ChatsHeader,
      }}>
      <ChatsStack.Screen name="Chats" component={Chats} />
    </ChatsStack.Navigator>
  );
};
