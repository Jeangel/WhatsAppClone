import { Contact } from './../app/Contact';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { UserDB, IUserDb } from '../app/User';
import { USERS_COLLECTION } from '../config/database';

export const useUsersCollection = () => {
  return firestore().collection(USERS_COLLECTION);
};

const useUsers = () => {
  const usersCollection = useUsersCollection();

  const getUserById = async (id: string) => {
    const userDb = await usersCollection.doc(id).get();
    if (!userDb.exists) {
      throw new Error(`User with id ${id} doesn't exist`);
    }
    return { ...userDb.data(), id: userDb.id } as UserDB;
  };

  const getUsersByIdIn = async (ids: string[]) => {
    const users = await usersCollection
      .where(firestore.FieldPath.documentId(), 'in', ids)
      .get();
    return users.docs.map((e) => ({ id: e.id, ...e.data() } as UserDB));
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
      return { ...user.data(), id: user.id } as UserDB;
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateUser = async (
    id: string,
    update: { [key in keyof Omit<IUserDb, 'id' | 'contacts'>]?: any },
  ) => {
    return usersCollection.doc(id).update(update);
  };

  const addContact = async (id: string, contact: Contact) => {
    await usersCollection.doc(id).update({
      contacts: firebase.firestore.FieldValue.arrayUnion(contact),
    });
  };

  return {
    getUserById,
    getUserByPhoneNumber,
    updateUser,
    addContact,
    getUsersByIdIn,
  };
};

export default useUsers;
