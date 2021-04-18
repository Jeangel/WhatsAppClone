import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigation } from './TabNavigation';
import { PublicStackNav } from './PublicStackNav';
import { useAuthStore } from '../state/auth';

const MainStack = createStackNavigator();

export const MainStackNav = () => {
  const { authenticatedUser } = useAuthStore();
  const [initialRoute, setInitialRoute] = React.useState('Public');
  const userIsAuthenticated =
    !!authenticatedUser.id && !!authenticatedUser.name;
  console.log(authenticatedUser);
  React.useEffect(() => {
    if (authenticatedUser.id && authenticatedUser.name) {
      setInitialRoute('Home');
    } else {
      setInitialRoute('Public');
    }
  }, [authenticatedUser, authenticatedUser.id, authenticatedUser.name]);
  console.log('USER IS AUTH', userIsAuthenticated);
  return (
    <MainStack.Navigator initialRouteName={initialRoute}>
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