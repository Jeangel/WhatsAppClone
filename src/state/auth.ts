import { IUser } from './../app/User';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthStore = {
  authenticatedUser: IUser;
  setAuthenticatedUser: (authenticatedUser: IUser) => void;
  updateAuthenticatedUser: (updates: {
    name?: string;
    phoneNumber?: string;
    profileImageUrl?: string;
  }) => void;
  logout: () => void;
};

const initialState = {
  id: '',
  name: '',
  phoneNumber: '',
  profileImageUrl: '',
  contacts: [],
  createdAt: new Date(),
};

export const useAuthStore = create<AuthStore>(
  persist(
    (set) => ({
      authenticatedUser: initialState,
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
        const authenticatedUser = initialState;
        set(() => ({ authenticatedUser }));
      },
    }),
    { name: 'auth-store', getStorage: () => AsyncStorage },
  ),
);
