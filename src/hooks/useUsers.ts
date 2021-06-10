import { IContact } from './../app/Contact';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { IUser } from '../app/User';
import { USERS_COLLECTION } from '../config/database';
import { useAuthStore } from '../state/auth';

export const useUsersCollection = () => {
  return firestore().collection(USERS_COLLECTION);
};

const useUsers = () => {
  const usersCollection = useUsersCollection();
  const { updateAuthenticatedUser, authenticatedUser } = useAuthStore();

  const getUserById = async (id: string) => {
    const userDb = await usersCollection.doc(id).get();
    if (!userDb.exists) {
      throw new Error(`User with id ${id} doesn't exist`);
    }
    return { ...userDb.data(), id: userDb.id } as IUser;
  };

  const getUsersByIdIn = async (ids: string[]) => {
    if (!ids.length) {
      return [];
    }
    try {
      const users = await usersCollection
        .where(firestore.FieldPath.documentId(), 'in', ids)
        .get();
      return users.docs.map((e) => ({ id: e.id, ...e.data() } as IUser));
    } catch (error) {
      console.log('error getting users by id', error);
      return [];
    }
  };

  const getUserByPhoneNumber = async (phone: string) => {
    try {
      const result = await usersCollection
        .where('phoneNumber', '==', phone)
        .get();
      if (result.empty) {
        throw new Error(`User with number ${phone}, doesn't exist.`);
      }
      const user = result.docs[0];
      return { ...user.data(), id: user.id } as IUser;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getUserExists = async (id: string) => {
    const userDb = await usersCollection.doc(id).get();
    return userDb.exists;
  };

  const updateUser = async (
    id: string,
    update: { [key in keyof Omit<IUser, 'id' | 'contacts' | 'chats'>]?: any },
    options?: { createIfNotExists?: boolean },
  ) => {
    if (options?.createIfNotExists) {
      return usersCollection.doc(id).set(update);
    }
    return usersCollection.doc(id).update(update);
  };

  const addContact = async (contact: IContact) => {
    await usersCollection
      .doc(authenticatedUser.id)
      .update({
        contacts: firebase.firestore.FieldValue.arrayUnion(contact),
      })
      .then(() => {
        updateAuthenticatedUser({
          contacts: authenticatedUser.contacts
            ? authenticatedUser.contacts.concat(contact)
            : [contact],
        });
      });
  };

  return {
    getUserById,
    getUserByPhoneNumber,
    updateUser,
    addContact,
    getUsersByIdIn,
    getUserExists,
  };
};

export default useUsers;
