import create from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthenticatedUser } from '../app/AuthenticatedUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthStore = {
  authenticatedUser: AuthenticatedUser;
  setAuthenticatedUser: (authenticatedUser: AuthenticatedUser) => void;
  updateAuthenticatedUser: (updates: {
    name?: string;
    phoneNumber?: string;
    profileImageUrl?: string;
  }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>(
  persist(
    (set) => ({
      authenticatedUser: {
        id: '',
        name: '',
        phoneNumber: '',
        profileImageUrl: '',
      },
      setAuthenticatedUser: (authenticatedUser) => {
        set(() => ({ authenticatedUser }));
      },
      updateAuthenticatedUser: (updates) => {
        set(({ authenticatedUser }) => ({
          authenticatedUser: {
            ...authenticatedUser,
            name: updates.name ? updates.name : authenticatedUser.name,
            phoneNumber: updates.phoneNumber
              ? updates.phoneNumber
              : authenticatedUser.phoneNumber,
            profileImageUrl: updates.profileImageUrl
              ? updates.profileImageUrl
              : authenticatedUser.profileImageUrl,
          },
        }));
      },
      logout: () => {
        const authenticatedUser = {
          id: '',
          name: '',
          phoneNumber: '',
          profileImageUrl: '',
        };
        set(() => ({ authenticatedUser }));
      },
    }),
    { name: 'auth-store', getStorage: () => AsyncStorage },
  ),
);
