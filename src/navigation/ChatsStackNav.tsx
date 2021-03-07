import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Chats } from '../screens/Chats';

const ChatsStack = createStackNavigator();

export const ChatsStackNav = () => {
  return (
    <ChatsStack.Navigator>
      <ChatsStack.Screen name="Chats" component={Chats} />
    </ChatsStack.Navigator>
  );
};
