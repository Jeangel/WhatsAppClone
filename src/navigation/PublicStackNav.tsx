import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Landing } from '../screens/Landing';

export type PublicStackParamList = {
  SignUp: undefined;
  Landing: undefined;
  Home: undefined;
};

const PublicStack = createStackNavigator<PublicStackParamList>();

export const PublicStackNav = () => {
  return (
    <PublicStack.Navigator
      initialRouteName="Landing"
      screenOptions={{ headerShown: false }}>
      <PublicStack.Screen name="Landing" component={Landing} />
    </PublicStack.Navigator>
  );
};
