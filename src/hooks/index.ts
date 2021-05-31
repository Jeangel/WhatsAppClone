import firestore from '@react-native-firebase/firestore';
import { USERS_COLLECTION } from '../config/database';

export const useUsersCollection = () => {
  return firestore().collection(USERS_COLLECTION);
};

export const useDBUser = (id: string) => {
  return firestore().doc(`${USERS_COLLECTION}/${id}`);
};
