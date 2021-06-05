/* eslint-disable react-hooks/exhaustive-deps */
import Pubnub from 'pubnub';
import { usePubNub } from 'pubnub-react';
import { useEffect } from 'react';
import { useAuthStore } from '../state/auth';
import { useChatsStore } from '../state/chats';
import useAppStateChange from './useAppStateChange';
import useChats from './useChats';

export const useChatListeners = () => {
  const pubnub = usePubNub();
  const { authenticatedUser } = useAuthStore();
  const { getUserChats } = useChats();
  const { setChatList, chatList, updateChat } = useChatsStore();

  const subscribeToChannels = () => {
    const chatsIds = chatList.map((e) => e.id);
    pubnub.subscribe({ channels: chatsIds, withPresence: true });
  };

  const unsubscribeFromChannels = () => {
    pubnub.unsubscribeAll();
  };

  const refreshChatList = () => {
    getUserChats(authenticatedUser.id).then(setChatList);
  };

  const configureUUID = () => {
    const userMetaData = {
      name: authenticatedUser.name,
      profileImageUrl: authenticatedUser.profileImageUrl,
    };
    pubnub.setUUID(authenticatedUser.id);
    pubnub.objects.setUUIDMetadata({ data: { custom: userMetaData } });
  };

  const presenceListener = (event: Pubnub.PresenceEvent) => {
    const { channel, action, uuid } = event;
    const chat = chatList.find((e) => e.id === channel);
    const isMe = uuid !== authenticatedUser.id;
    const isJoinOrLeave = ['join', 'leave'].includes(action);
    if (isMe && chat && isJoinOrLeave) {
      updateChat(channel, {
        ...chat,
        author: {
          ...chat.author,
          status: action === 'join' ? 'online' : 'offline',
        },
      });
    }
  };

  useAppStateChange({
    handleAppDeactivated: () => unsubscribeFromChannels(),
    handleAppActivated: () => subscribeToChannels(),
  });

  useEffect(() => {
    if (pubnub && authenticatedUser.id) {
      refreshChatList();
      configureUUID();
      subscribeToChannels();
      const listeners: Pubnub.ListenerParameters = {
        objects: (params) => {
          console.log(params, 'object event params');
        },
        message: (params) => {
          console.log('navigation message event', params);
        },
        presence: presenceListener,
      };
      pubnub.addListener(listeners);
      return () => {
        pubnub.removeListener(listeners);
        unsubscribeFromChannels();
      };
    }
  }, [pubnub, authenticatedUser]);
};
