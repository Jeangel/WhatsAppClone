import firestore from '@react-native-firebase/firestore';
import { USERS_COLLECTION } from '../config/database';

export const useUsersCollection = () => {
  return firestore().collection(USERS_COLLECTION);
};
