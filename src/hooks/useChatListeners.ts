import { useChatMessagesStore } from '../state/chatMessages';
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
import { IChatMessage } from '../app/Message';
import { fromTimeTokenToDate } from '../util';

export const useChatListeners = () => {
  const pubnub = usePubNub();
  const { authenticatedUser } = useAuthStore();
  const { getMyChats, getChatMessages, getChatMembers } = useChats();
  const { setChats, chats, addChat } = useChatsStore();
  const { setUsers, addUsers } = useUsersStore();
  const {
    setChatMessages,
    addChatMessages,
    addChat: addMessagesByChatItem,
  } = useChatMessagesStore();
  const { getUsersByIdIn } = useUsers();

  const subscribeToChannels = () => {
    const chatsIds = chats.map((e) => e.chatId);
    pubnub.subscribe({
      channels: [...chatsIds, authenticatedUser.id],
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
    }));
    setChatMessages({ chatMessages });
    setUsers(formattedUsers);
    setChats(myChats);
  };

  const configureUUID = async () => {
    const userMetaData = {
      name: authenticatedUser.name,
      profileImageUrl: authenticatedUser.profileImageUrl,
    };
    pubnub.setUUID(authenticatedUser.id);
    await pubnub.objects.setUUIDMetadata({ data: { custom: userMetaData } });
  };

  const presenceListener = () => {
    // const { channel, action, uuid } = event;
    // const chat = chats.find((e) => e.chatId === channel);
    // const isMe = uuid !== authenticatedUser.id;
    // const isJoinOrLeave = ['join', 'leave'].includes(action);
    // if (isMe && chat && isJoinOrLeave) {
    //   // updateChat(channel, {});
    // }
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
        addChat({ chatId, members });
        addMessagesByChatItem({ chatId });
        const formattedUsers: IChatUser[] = dbUsers.map((e) => ({
          id: e.id,
          name: e.name,
          profileImageUrl: e.profileImageUrl,
        }));
        addUsers(formattedUsers);
      });
    }
  };

  const objectEventListener = (event: Pubnub.ObjectsEvent) => {
    const { message, ...rest } = event;
    if (message.type === 'membership') {
      membershipEventHandler(event);
    }
    console.log('object event params', { ...rest, message });
  };

  useAppStateChange({
    // handleAppDeactivated: () => unsubscribeFromChannels(),
    handleAppActivated: () => subscribeToChannels(),
  });

  useEffect(() => {
    if (pubnub && authenticatedUser.id) {
      console.log('Running use effect listeners');
      refreshUserChats();
      configureUUID();
      subscribeToChannels();
      const listeners: Pubnub.ListenerParameters = {
        status: (params) => {
          console.log('status event', params);
        },
        objects: objectEventListener,
        message: (params) => {
          console.log('navigation message event', params);
          const message = {
            _id: Number(params.timetoken),
            text: params.message.text,
            createdAt: fromTimeTokenToDate(params.timetoken).toISOString(),
            user: {
              _id: params.publisher,
            },
          };
          addChatMessages({ chatId: params.channel, messages: [message] });
        },
        presence: presenceListener,
      };
      pubnub.addListener(listeners);
      return () => {
        console.log('REMOVING ALL CHAT STUFF');
        pubnub.removeListener(listeners);
        unsubscribeFromChannels();
      };
    }
  }, [pubnub, authenticatedUser]);
};
