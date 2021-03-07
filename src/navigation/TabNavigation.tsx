import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { ChatsStackNav } from './ChatsStackNav';
import { CallsStackNav } from './CallsStackNav';
import { SettingsStackNav } from './SettingsStackNav';
import { Icon } from '../components/atoms/Icon';
import { useTheme } from '../hooks';

interface RenderTabBarIconProps {
  color: string;
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
    paddingTop: 10,
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

export const TabNavigation = () => {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => renderTabBarIcon({ ...props, route }),
      })}
      tabBarOptions={{
        safeAreaInsets,
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.neutral60,
        iconStyle: styles.icon,
        tabStyle: styles.tab,
        style: [styles.tabBar, { borderColor: theme.colors.neutral60 }],
        showLabel: false,
      }}>
      <Tab.Screen name="Calls" component={CallsStackNav} />
      <Tab.Screen name="Chats" component={ChatsStackNav} />
      <Tab.Screen name="Settings" component={SettingsStackNav} />
    </Tab.Navigator>
  );
};
