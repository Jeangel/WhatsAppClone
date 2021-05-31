import firestore from '@react-native-firebase/firestore';
import { UserDB, IUserDb } from '../app/User';
import { USERS_COLLECTION } from '../config/database';

export const useUsersCollection = () => {
  return firestore().collection(USERS_COLLECTION);
};

const useUsers = () => {
  const usersCollection = useUsersCollection();

  const getUserById = async (id: string) => {
    const userDb = await usersCollection.doc(id).get();
    return { ...userDb.data(), id: userDb.id } as UserDB;
  };

  const getUserByPhoneNumber = async (phone: string) => {
    try {
      const result = await usersCollection
        .where('phoneNumber', '==', phone)
        .get();
      if (result.empty) {
        return new Error(`User with number ${phone}, doesn't exist.`);
      }
      const user = result.docs[0];
      return { ...user.data(), id: user.id } as UserDB;
    } catch (error) {
      return error;
    }
  };

  const updateUser = async (
    id: string,
    update: { [key in keyof Omit<IUserDb, 'id'>]?: any },
  ) => {
    return usersCollection.doc(id).update(update);
  };

  return { getUserById, getUserByPhoneNumber, updateUser };
};

export default useUsers;
