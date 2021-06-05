/* eslint-disable react-hooks/exhaustive-deps */
import firestore from '@react-native-firebase/firestore';
import { usePubNub } from 'pubnub-react';
import { useEffect } from 'react';
import { USERS_COLLECTION } from '../config/database';
import { useAuthStore } from '../state/auth';
import { usePushError } from '../state/error';

const useUsersListeners = () => {
  const { authenticatedUser } = useAuthStore();
  const pubnub = usePubNub();
  const pushError = usePushError();

  const onUsersSnapshot = async (snapshot: any) => {
    // we'll be listening only for profile image updates
    const { profileImageUrl } = snapshot.data();
    const { data: pubnubUser } = await pubnub.objects.getUUIDMetadata({
      uuid: snapshot.id,
    });
    const userMetaData = {
      ...(pubnubUser.custom || {}),
      profileImageUrl,
    };
    pubnub.objects.setUUIDMetadata({
      uuid: snapshot.id,
      data: { custom: userMetaData },
    });
  };

  useEffect(() => {
    const contactIds = authenticatedUser.contacts.map((e) => e.id);
    const unSubscribers = contactIds.map((contactId) =>
      firestore()
        .collection(USERS_COLLECTION)
        .doc(contactId)
        .onSnapshot(onUsersSnapshot, pushError),
    );
    return () => {
      Promise.all(unSubscribers);
    };
  }, [pubnub]);
};

export default useUsersListeners;
