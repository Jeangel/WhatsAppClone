import create, { StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IChatUser } from '../app/User';

type UsersStore = {
  users: IChatUser[];
  addUser: (users: IChatUser[]) => void;
  updateUser: (userId: string, update: IChatUser) => void;
};

const initialState: UsersStore = {
  users: [],
  addUser: () => {},
  updateUser: () => {},
};

let store: StateCreator<UsersStore> = (set) => ({
  users: initialState.users,
  addUser: (newUsers) => {
    set(({ users }) => ({ users: users.concat(newUsers) }));
  },
  updateUser: (userId, update) => {
    set(({ users }) => ({
      users: users.map((e) => (e.id === userId ? update : e)),
    }));
  },
});

store = persist(store, { name: 'users-store', getStorage: () => AsyncStorage });

export const useUsersStore = create(store);
