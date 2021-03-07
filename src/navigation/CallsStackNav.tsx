import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Calls } from '../screens/Calls';

const CallsStack = createStackNavigator();

export const CallsStackNav = () => {
  return (
    <CallsStack.Navigator>
      <CallsStack.Screen name="Calls" component={Calls} />
    </CallsStack.Navigator>
  );
};
