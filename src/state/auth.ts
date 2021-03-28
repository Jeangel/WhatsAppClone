import { AuthenticatedUser } from '../app/AuthenticatedUser';
import create from 'zustand';

type AuthStore = {
  authenticatedUser?: AuthenticatedUser;
  setAuthenticatedUser: (authenticatedUser: AuthenticatedUser) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  authenticatedUser: undefined,
  setAuthenticatedUser: (authenticatedUser) => {
    set(() => ({ authenticatedUser }));
  },
}));
