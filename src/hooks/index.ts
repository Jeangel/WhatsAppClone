import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import firebaseStorage from '@react-native-firebase/storage';
import { USERS_COLLECTION } from '../config/database';

export const useTheme = () => React.useContext(ThemeContext).theme;

interface useUploadImageArgs {
  onProgress: (progress: number) => void;
  onError: (error: string) => void;
  onComplete: (imageUrl: string) => void;
}

export const useUploadImage = ({
  onProgress,
  onComplete,
  onError,
}: useUploadImageArgs) => {
  const uploadImage = ({
    imageNameReference,
    localImageUri,
  }: {
    imageNameReference: string;
    localImageUri: string;
  }) => {
    const reference = firebaseStorage().ref(imageNameReference);
    try {
      const task = reference.putFile(localImageUri);
      task.on('state_changed', (taskSnapshot) => {
        onProgress(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes);
      });
      task.then(() => {
        reference.getDownloadURL().then((url) => {
          onComplete(url);
        });
      });
    } catch (error) {
      onError(error);
    }
  };
  return uploadImage;
};

export const useUsersCollection = () => {
  return firestore().collection(USERS_COLLECTION);
};

export const useDBUser = (id: string) => {
  return firestore().doc(`${USERS_COLLECTION}/${id}`);
};
