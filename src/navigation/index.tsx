import * as React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { TabNavigation } from './TabNavigation';
import { PublicStackNav } from './PublicStackNav';
import { useAuthStore } from '../state/auth';

const MainStack = createStackNavigator();

export const MainStackNav = () => {
  const { name, id } = useAuthStore(
    (state) => state.authenticatedUser,
    (a, b) => a.id === b.id && a.name === b.name,
  );
  return (
    <MainStack.Navigator screenOptions={TransitionPresets.SlideFromRightIOS}>
      {!!id && !!name ? (
        <MainStack.Screen
          name="Home"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
      ) : (
        <MainStack.Screen
          name="Public"
          component={PublicStackNav}
          options={{ headerShown: false }}
        />
      )}
    </MainStack.Navigator>
  );
};

export default MainStackNav;
