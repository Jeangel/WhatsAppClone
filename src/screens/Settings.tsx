import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../state/auth';

export const Settings = () => {
  const { logout } = useAuthStore();
  const handleLogout = () => {
    logout();
  };
  return (
    <View>
      <Text>Settings</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
