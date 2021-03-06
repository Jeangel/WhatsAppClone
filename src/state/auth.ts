import { IContact } from './../app/Contact';
import { IUser } from './../app/User';
import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthStore = {
  authenticatedUser: IUser;
  setAuthenticatedUser: (authenticatedUser: IUser) => void;
  updateAuthenticatedUser: (updates: {
    name?: string;
    phoneNumber?: string;
    profileImageUrl?: string;
    contacts?: IContact[];
  }) => void;
  logout: () => void;
};

const initialUserState: IUser = {
  id: '',
  name: '',
  phoneNumber: '',
  profileImageUrl: '',
  contacts: [],
};

let store: StateCreator<AuthStore> = (set) => ({
  authenticatedUser: initialUserState,
  setAuthenticatedUser: (authenticatedUser) => {
    set((state) => ({
      authenticatedUser: { ...state.authenticatedUser, ...authenticatedUser },
    }));
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
        contacts: updates.contacts
          ? updates.contacts
          : authenticatedUser.contacts,
      },
    }));
  },
  logout: () => {
    const authenticatedUser = initialUserState;
    set(() => ({ authenticatedUser }));
  },
});

store = devtools(store);
store = persist(store, { name: 'auth-store', getStorage: () => AsyncStorage });

export const useAuthStore = create(store);
