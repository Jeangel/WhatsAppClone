import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from '@react-navigation/core';
import { StyleSheet } from 'react-native';
import { ChatsStackNav } from './ChatsStackNav';
import { CallsStackNav } from './CallsStackNav';
import { SettingsStackNav } from './SettingsStackNav';
import { Icon } from '../components/atoms/Icon';
import useTheme from '../hooks/useTheme';
import { EColor } from '../theme';
import { useChatListeners } from '../hooks/useChatListeners';
import { TransitionPresets } from '@react-navigation/stack';
import useUsersListeners from '../hooks/useUsersListeners';
interface RenderTabBarIconProps {
  color: EColor;
  size: number;
  route: {
    name: string;
  };
}

const styles = StyleSheet.create({
  icon: {},
  tab: {},
  tabBar: {
    height: 85,
    borderTopWidth: 0.5,
    paddingHorizontal: 30,
  },
});

const Tab = createBottomTabNavigator();

const renderTabBarIcon = ({ color, size, route }: RenderTabBarIconProps) => {
  let iconName = '';
  if (route.name === 'Chats') {
    iconName = 'chat';
  } else if (route.name === 'Calls') {
    iconName = 'phone';
  } else if (route.name === 'Settings') {
    iconName = 'settings';
  }
  return <Icon name={iconName} size={size} color={color} />;
};

const getShouldShowTabBar = (
  route: RouteProp<Record<string, object | undefined>, string>,
) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  const routesWithoutTabBar = ['Chat', 'AddContact'];
  if (routeName) {
    return !routesWithoutTabBar.includes(routeName);
  }
  return true;
};

export const TabNavigation = () => {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  useChatListeners();
  useUsersListeners();
  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={({ route }) => ({
        tabBarIcon: (props) =>
          renderTabBarIcon({ ...props, route, color: props.color as EColor }),
        tabBarVisible: getShouldShowTabBar(route),
        ...TransitionPresets.SlideFromRightIOS,
      })}
      tabBarOptions={{
        safeAreaInsets,
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.neutral60,
        iconStyle: styles.icon,
        tabStyle: styles.tab,
        style: [styles.tabBar, { borderColor: theme.colors.neutral60 }],
        showLabel: false,
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen name="Calls" component={CallsStackNav} />
      <Tab.Screen name="Chats" component={ChatsStackNav} />
      <Tab.Screen name="Settings" component={SettingsStackNav} />
    </Tab.Navigator>
  );
};
