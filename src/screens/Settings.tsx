import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../state/auth';

export const Settings = () => {
  const { logout } = useAuthStore();
  return (
    <View>
      <Text>Settings</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
