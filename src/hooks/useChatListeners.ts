import { useMessagesStore } from './../state/messages';
import { IChatUser } from './../app/User';
/* eslint-disable react-hooks/exhaustive-deps */
import Pubnub from 'pubnub';
import { usePubNub } from 'pubnub-react';
import { useEffect } from 'react';
import { useAuthStore } from '../state/auth';
import { useChatsStore } from '../state/chats';
import { useUsersStore } from '../state/users';
import useAppStateChange from './useAppStateChange';
import useChats from './useChats';
import useUsers from './useUsers';
import { IMessagesByChat } from '../app/Message';

export const useChatListeners = () => {
  const pubnub = usePubNub();
  const { authenticatedUser } = useAuthStore();
  const { getMyChats, getChatMessages } = useChats();
  const { setChats, chats } = useChatsStore();
  const { setUsers } = useUsersStore();
  const { setMessagesByChat } = useMessagesStore();
  const { getUsersByIdIn } = useUsers();

  const subscribeToChannels = () => {
    const chatsIds = chats.map((e) => e.chatId);
    pubnub.subscribe({ channels: chatsIds, withPresence: true });
  };

  const unsubscribeFromChannels = () => {
    pubnub.unsubscribeAll();
  };

  const refreshUserChats = () => {
    getMyChats().then(async (myChats) => {
      const users: string[] = [];
      const messagesByChat: IMessagesByChat[] = [];
      for (const chat of myChats) {
        const chatMessages = await getChatMessages(chat.chatId);
        messagesByChat.push({
          chatId: chat.chatId,
          messages: chatMessages,
        });
      }
      myChats.forEach((e) => {
        users.push(...e.members);
      });
      const dbUsers = await getUsersByIdIn(users);
      const formattedUsers: IChatUser[] = dbUsers.map((e) => ({
        id: e.id,
        name: e.name,
        profileImageUrl: e.profileImageUrl,
      }));
      setMessagesByChat(messagesByChat);
      setUsers(formattedUsers);
      setChats(myChats);
    });
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
    const chat = chats.find((e) => e.id === channel);
    const isMe = uuid !== authenticatedUser.id;
    const isJoinOrLeave = ['join', 'leave'].includes(action);
    if (isMe && chat && isJoinOrLeave) {
      // updateChat(channel, {});
    }
  };

  useAppStateChange({
    handleAppDeactivated: () => unsubscribeFromChannels(),
    handleAppActivated: () => subscribeToChannels(),
  });

  useEffect(() => {
    if (pubnub && authenticatedUser.id) {
      refreshUserChats();
      configureUUID();
      subscribeToChannels();
      const listeners: Pubnub.ListenerParameters = {
        objects: (params) => {
          console.log(params, 'object event params');
        },
        message: (params) => {
          console.log('navigation message event', params);
        },
        // presence: presenceListener,
      };
      pubnub.addListener(listeners);
      return () => {
        pubnub.removeListener(listeners);
        unsubscribeFromChannels();
      };
    }
  }, [pubnub, authenticatedUser]);
};
