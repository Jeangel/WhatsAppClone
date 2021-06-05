import * as React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { ConfirmPhone } from '../screens/Public/ConfirmPhone';
import { Landing } from '../screens/Public/Landing';
import { ConfirmOTP } from '../screens/Public/ConfirmOTP';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Header } from '../components/molecules/Header';
import { SignUp } from '../screens/Public/SignUp';
import { useAuthStore } from '../state/auth';

export type PublicStackParamList = {
  Home: undefined;
  Landing: undefined;
  ConfirmPhone: undefined;
  ConfirmOTP: {
    confirmation: FirebaseAuthTypes.ConfirmationResult;
    phone: string;
  };
  SignUp: undefined;
};

const PublicStack = createStackNavigator<PublicStackParamList>();

export const PublicStackNav = () => {
  const { authenticatedUser } = useAuthStore();
  let initialRoute: keyof PublicStackParamList = 'Landing';
  if (authenticatedUser.id && !authenticatedUser.name) {
    initialRoute = 'SignUp';
  }
  return (
    <PublicStack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      headerMode="screen">
      <PublicStack.Screen name="Landing" component={Landing} />
      <PublicStack.Screen name="ConfirmPhone" component={ConfirmPhone} />
      <PublicStack.Screen
        name="ConfirmOTP"
        component={ConfirmOTP}
        options={{
          header: (props) => <Header removeBorders showBackButton {...props} />,
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <PublicStack.Screen name="SignUp" component={SignUp} />
    </PublicStack.Navigator>
  );
};
