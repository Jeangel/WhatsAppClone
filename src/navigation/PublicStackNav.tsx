import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ConfirmPhone } from '../screens/ConfirmPhone';
import { Landing } from '../screens/Landing';
import { ConfirmOTP } from '../screens/ConfirmOTP';

export type PublicStackParamList = {
  Home: undefined;
  Landing: undefined;
  ConfirmPhone: undefined;
  ConfirmOTP: undefined;
};

const PublicStack = createStackNavigator<PublicStackParamList>();

export const PublicStackNav = () => {
  return (
    <PublicStack.Navigator
      initialRouteName="Landing"
      screenOptions={{ headerShown: false }}>
      <PublicStack.Screen name="Landing" component={Landing} />
      <PublicStack.Screen name="ConfirmPhone" component={ConfirmPhone} />
      <PublicStack.Screen name="ConfirmOTP" component={ConfirmOTP} />
    </PublicStack.Navigator>
  );
};
