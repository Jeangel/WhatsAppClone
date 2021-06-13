/* eslint-disable react-hooks/exhaustive-deps */
import { useChatMessagesStore } from '../state/chatMessages';
import { IChatUser } from './../app/User';
import Pubnub from 'pubnub';
import { usePubNub } from 'pubnub-react';
import { useEffect } from 'react';
import { useAuthStore } from '../state/auth';
import { useChatsStore } from '../state/chats';
import { useUsersStore } from '../state/users';
import useAppStateChange from './useAppStateChange';
import useChatsRequests from './useChatsRequests';
import useUsersRequests from './useUsersRequests';
import { IChatMessage } from '../app/Message';
import { fromTimeTokenToDate } from '../util';
import isEqual from 'shallowequal';

export const useChatListeners = () => {
  const pubnub = usePubNub();
  const { authenticatedUser } = useAuthStore();
  const { getMyChats, getChatMessages, getChatMembers } = useChatsRequests();
  const { setChats, chats, addChat } = useChatsStore();
  const { setUsers, addUsers, setUserStatus } = useUsersStore();
  const {
    setChatMessages,
    addChatMessages,
    addChat: addMessagesByChatItem,
  } = useChatMessagesStore();
  const { getUsersByIdIn } = useUsersRequests();

  const subscribeToChannels = () => {
    const chatsIds = chats.map((e) => e.chatId);
    pubnub.subscribe({ channels: [authenticatedUser.id] });
    pubnub.subscribe({
      channels: chatsIds,
      withPresence: true,
    });
  };

  const unsubscribeFromChannels = () => {
    pubnub.unsubscribeAll();
  };

  const refreshUserChats = async () => {
    const myChats = await getMyChats();
    const users: string[] = [];
    const chatMessages: IChatMessage[] = [];
    for (const chat of myChats) {
      const messages = await getChatMessages(chat.chatId);
      chatMessages.push({
        chatId: chat.chatId,
        messages,
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
      status: 'offline',
    }));
    setUsers({ users: formattedUsers });
    setChats({ chats: myChats });
    setChatMessages({ chatMessages });
  };

  const configureUUID = async () => {
    pubnub.setUUID(authenticatedUser.id);
    let pubnubUserMetadata = null;
    try {
      const { data } = await pubnub.objects.getUUIDMetadata({
        uuid: authenticatedUser.id,
      });
      pubnubUserMetadata = data;
    } catch (error) {}
    const userMetaData = {
      name: authenticatedUser.name,
      profileImageUrl: authenticatedUser.profileImageUrl,
    };
    const metaDataIsEqual =
      pubnubUserMetadata && isEqual(pubnubUserMetadata.custom, userMetaData);
    if (!metaDataIsEqual) {
      await pubnub.objects.setUUIDMetadata({ data: { custom: userMetaData } });
    }
  };

  const presenceListener = (event: Pubnub.PresenceEvent) => {
    console.log('PRESENCE EVENT', event);
    const { action, uuid } = event;
    const isJoinOrLeave = ['join', 'leave'].includes(action);
    if (isJoinOrLeave) {
      setUserStatus({
        userId: uuid,
        status: action === 'join' ? 'online' : 'offline',
      });
    }
  };

  const messageEventListener = (event: Pubnub.MessageEvent) => {
    const message = {
      _id: Number(event.timetoken),
      text: event.message.text,
      createdAt: fromTimeTokenToDate(event.timetoken).toISOString(),
      user: {
        _id: event.publisher,
      },
    };
    addChatMessages({ chatId: event.channel, messages: [message] });
  };

  const membershipEventHandler = (event: Pubnub.ObjectsEvent) => {
    const { message } = event;
    const eventData = message.data as { channel: { id: string } };
    if (message.event === 'set') {
      const chatId = eventData.channel.id;
      getChatMembers(chatId).then(async (members) => {
        const dbUsers = await getUsersByIdIn(
          members.filter((e) => e !== authenticatedUser.id),
        );
        pubnub.subscribe({ channels: [chatId] });
        addChat({ chat: { chatId, members } });
        addMessagesByChatItem({ chatId });
        const formattedUsers: IChatUser[] = dbUsers.map((e) => ({
          id: e.id,
          name: e.name,
          profileImageUrl: e.profileImageUrl,
        }));
        addUsers({ users: formattedUsers });
      });
    }
  };

  const objectEventListener = (event: Pubnub.ObjectsEvent) => {
    const { message, ...rest } = event;
    if (message.type === 'membership') {
      membershipEventHandler(event);
    } else {
      console.log('object event params', { ...rest, message });
    }
  };

  useAppStateChange({
    // TODO If messages stop working, comment this line
    handleAppDeactivated: () => unsubscribeFromChannels(),
    handleAppActivated: () => subscribeToChannels(),
  });

  useEffect(() => {
    if (pubnub && authenticatedUser.id) {
      refreshUserChats();
      configureUUID();
      subscribeToChannels();
      const listeners: Pubnub.ListenerParameters = {
        status: (params) => console.log('status event', params),
        objects: objectEventListener,
        message: messageEventListener,
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
