import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../state/auth';
import auth from '@react-native-firebase/auth';

export const Settings = () => {
  const { logout, authenticatedUser } = useAuthStore();
  const handleLogout = async () => {
    if (authenticatedUser.id) {
      logout();
      await auth().signOut();
    }
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
