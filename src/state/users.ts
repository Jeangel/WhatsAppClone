import create, { StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import { IChatUser } from '../app/User';

type UsersStore = {
  users: IChatUser[];
  addUsers: (args: { users: IChatUser[] }) => void;
  setUsers: (args: { users: IChatUser[] }) => void;
  updateUser: (args: { userId: string; update: IChatUser }) => void;
};

const initialState: UsersStore = {
  users: [],
  addUsers: () => {},
  updateUser: () => {},
  setUsers: () => {},
};

let store: StateCreator<UsersStore> = (set, get) => ({
  users: initialState.users,
  addUsers: ({ users: newUsers }) => {
    const existingUsers = get().users;
    const mergedUsers = _.uniqBy(existingUsers.concat(newUsers), (e) => e.id);
    set({ users: mergedUsers });
  },
  setUsers: ({ users }) => {
    set({ users: _.uniqBy(users, (e) => e.id) });
  },
  updateUser: ({ userId, update }) => {
    const users = get().users;
    const updatedUsers = users.map((e) => (e.id === userId ? update : e));
    set({ users: updatedUsers });
  },
});

store = persist(store, { name: 'users-store', getStorage: () => AsyncStorage });

export const useUsersStore = create(store);
