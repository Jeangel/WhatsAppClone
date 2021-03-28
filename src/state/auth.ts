import create from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthenticatedUser } from '../app/AuthenticatedUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthStore = {
  authenticatedUser?: AuthenticatedUser;
  setAuthenticatedUser: (authenticatedUser: AuthenticatedUser) => void;
};

export const useAuthStore = create<AuthStore>(
  persist(
    (set) => ({
      authenticatedUser: undefined,
      setAuthenticatedUser: (authenticatedUser) => {
        set(() => ({ authenticatedUser }));
      },
    }),
    { name: 'auth-store', getStorage: () => AsyncStorage },
  ),
);
