import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ConfirmPhone } from '../screens/ConfirmPhone';
import { Landing } from '../screens/Landing';
import { ConfirmOTP } from '../screens/ConfirmOTP';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type PublicStackParamList = {
  Home: undefined;
  Landing: undefined;
  ConfirmPhone: undefined;
  ConfirmOTP: {
    confirmation: FirebaseAuthTypes.ConfirmationResult;
  };
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
