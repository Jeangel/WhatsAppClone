import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../state/auth';
import auth from '@react-native-firebase/auth';

export const Settings = () => {
  const { logout } = useAuthStore();
  const handleLogout = async () => {
    await auth().signOut();
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
