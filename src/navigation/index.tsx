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
  const authenticatedUser = useAuthStore((state) => state.authenticatedUser);
  const [initialRoute, setInitialRoute] = React.useState('Public');
  const [userIsAuthenticated, setUserIsAuthenticated] = React.useState(false);
  React.useEffect(() => {
    console.log('IN USE EFFECT', authenticatedUser);
    setUserIsAuthenticated(!!authenticatedUser.id && !!authenticatedUser.name);
    if (authenticatedUser.id && authenticatedUser.name) {
      setInitialRoute('Home');
    } else {
      setInitialRoute('Public');
    }
  }, [authenticatedUser, authenticatedUser.id, authenticatedUser.name]);
  console.log('RENDERING MAIN STACK', {
    userIsAuthenticated,
    initialRoute,
    authenticatedUser,
  });
  return (
    <MainStack.Navigator
      initialRouteName={initialRoute}
      screenOptions={TransitionPresets.SlideFromRightIOS}>
      {userIsAuthenticated ? (
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
