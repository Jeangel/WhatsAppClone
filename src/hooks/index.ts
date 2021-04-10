import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import { SpinnerContext } from '../contexts/SpinnerContext';
import { ThemeContext } from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseStorage from '@react-native-firebase/storage';
import dayjs from 'dayjs';
import { USERS_COLLECTION } from '../config/database';

export const useTheme = () => React.useContext(ThemeContext).theme;

export const useSpinner = () => {
  const { isShowingSpinner, showSpinner, hideSpinner } = React.useContext(
    SpinnerContext,
  );
  return { isShowingSpinner, showSpinner, hideSpinner };
};

interface useCountdownArgs {
  id?: string;
  getEndDateTime: () => string;
  persist?: boolean;
  onTick: ({
    seconds,
    minutes,
    hours,
    days,
  }: {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  }) => void;
  onFinish: () => Promise<void>;
}

export const useCountdown = ({
  persist = false,
  id,
  onTick,
  onFinish,
  getEndDateTime,
}: useCountdownArgs) => {
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout>();

  const resolveEndDateTime = React.useCallback(async () => {
    if (id) {
      let persistedDateTime = await AsyncStorage.getItem(id);
      if (persistedDateTime) {
        return persistedDateTime;
      }
    }
    return getEndDateTime();
  }, [getEndDateTime, id]);

  const getTimeRemaining = React.useCallback((endDateTime) => {
    const total = Date.parse(endDateTime) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }, []);

  const updateOrCreateCountdownInAsyncStorage = React.useCallback(async () => {
    const givenEndDateTime = getEndDateTime();
    const persistedItem = await AsyncStorage.getItem(id as string);
    if (!persistedItem) {
      await AsyncStorage.setItem(id as string, givenEndDateTime);
    }
  }, [getEndDateTime, id]);

  const start = React.useCallback(async () => {
    if (persist && id) {
      await updateOrCreateCountdownInAsyncStorage();
    }
    const endDateTime = await resolveEndDateTime();
    const timeInterval = setInterval(async () => {
      const data = getTimeRemaining(endDateTime);
      onTick(data);
      if (data.total <= 0) {
        await onFinish();
        clearInterval(timeInterval);
      }
    }, 1000);
    setIntervalId(timeInterval);
  }, [
    getTimeRemaining,
    id,
    onFinish,
    onTick,
    persist,
    resolveEndDateTime,
    updateOrCreateCountdownInAsyncStorage,
  ]);

  const stop = async () => {
    if (id) {
      await AsyncStorage.removeItem(id);
    }
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  React.useEffect(() => {
    const tryRecreateCountdown = async () => {
      // Recreate only if there is an ID and if the persist flag is true
      if (id && persist) {
        // get the persisted endDate
        const persistedEndDate = await AsyncStorage.getItem(id);
        // check if the persisted endDate is in the past
        const isInThePast = persistedEndDate
          ? dayjs(persistedEndDate).isBefore(dayjs())
          : true;
        /**
         * recreate only if there is a persistedEndDate, there is not an ongoing
         * intervalId and if the date is not in the past
         */
        const shouldRecreate = persistedEndDate && !intervalId && !isInThePast;
        if (shouldRecreate) {
          start();
        } else if (isInThePast) {
          await AsyncStorage.removeItem(id);
        }
      }
    };
    tryRecreateCountdown();
  }, [persist, id, start, intervalId]);

  return { start, stop };
};

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
