import create, { StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IChatUser } from '../app/User';

type UsersStore = {
  users: IChatUser[];
  addUsers: (users: IChatUser[]) => void;
  setUsers: (users: IChatUser[]) => void;
  updateUser: (userId: string, update: IChatUser) => void;
};

const initialState: UsersStore = {
  users: [],
  addUsers: () => {},
  updateUser: () => {},
  setUsers: () => {},
};

let store: StateCreator<UsersStore> = (set) => ({
  users: initialState.users,
  addUsers: (newUsers) => {
    set(({ users }) => ({ users: users.concat(newUsers) }));
  },
  setUsers: (users) => {
    set(() => ({ users }));
  },
  updateUser: (userId, update) => {
    set(({ users }) => ({
      users: users.map((e) => (e.id === userId ? update : e)),
    }));
  },
});

store = persist(store, { name: 'users-store', getStorage: () => AsyncStorage });

export const useUsersStore = create(store);
