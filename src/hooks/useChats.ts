import { usePubNub } from 'pubnub-react';
import { IChatItem } from '../app/Chat';
import { useAuthStore } from '../state/auth';
import { pubnubMessageToGiftedChatMessage } from '../util';

const useChats = () => {
  const pubnub = usePubNub();
  const { authenticatedUser } = useAuthStore();

  const getChatMembers = async (id: string) => {
    try {
      const response = await pubnub.objects.getChannelMembers({ channel: id });
      return response.data.map((e) => e.uuid.id);
    } catch (error) {
      console.log('error getting chat members', error);
      return [];
    }
  };

  const getLastChatMessage = async (id: string) => {
    try {
      const { channels } = await pubnub.fetchMessages({
        channels: [id],
        count: 1,
      });
      const channelMessages = channels[id] || [];
      return channelMessages.map(pubnubMessageToGiftedChatMessage);
    } catch (error) {
      console.log('error getting last chat message', error);
      return [];
    }
  };

  const getChatMessages = async (id: string) => {
    try {
      const { channels } = await pubnub.fetchMessages({ channels: [id] });
      const channelMessages = channels[id] || [];
      return channelMessages.map(pubnubMessageToGiftedChatMessage);
    } catch (error) {
      console.log('error getting chat messages', error);
      return [];
    }
  };

  const setChatMembers = async ({
    chatId,
    members,
  }: {
    chatId: string;
    members: string[];
  }) => {
    try {
      await pubnub.objects.setChannelMembers({
        uuids: members,
        channel: chatId,
      });
    } catch (error) {
      console.log('error setting chat members', error);
    }
  };

  const getUserChats = async (userId: string) => {
    const chats: IChatItem[] = [];
    let chatsIds: string[] = [];
    try {
      const memberships = await pubnub.objects.getMemberships({
        uuid: userId,
      });
      chatsIds = memberships.data.map((e) => e.channel.id);
    } catch (error) {
      console.log('error getting memberships', error);
    }
    try {
      for (const chat of chatsIds) {
        const membersPromise = pubnub.objects.getChannelMembers({
          channel: chat,
          include: { customUUIDFields: true },
        });
        const lastMessagePromise = pubnub.history({
          channel: chat,
          count: 1,
          includeMeta: true,
        });

        const [{ data: members }, lastMessages] = await Promise.all([
          membersPromise,
          lastMessagePromise,
        ]);

        const [lastMessage] = lastMessages.messages;
        if (!lastMessage) {
          continue;
        }
        const oppositeUser = members.find((e) => e.uuid.id !== userId) as any;
        const oppositeUserAsContact = authenticatedUser.contacts.find(
          (e) => e.id === oppositeUser.uuid.id,
        );
        chats.push({
          id: chat,
          lastMessage: {
            // types on getChannelMembers are not friendly
            id: lastMessage.timetoken as string,
            content: lastMessage.entry.text,
            type: 'text',
            author: lastMessage.entry.author,
            sentAt: new Date(
              Number(lastMessage?.timetoken) / 10000,
            ).toISOString(),
            status: 'received',
          },
          author: {
            id: oppositeUser?.uuid.id || '',
            name:
              oppositeUserAsContact?.alias ||
              oppositeUser?.uuid.custom?.name ||
              '',
            profileImageUrl: oppositeUser?.uuid.custom?.profileImageUrl || '',
          },
          unreadMessages: 0,
        });
      }
    } catch (error) {
      console.log('error getting user chats', error);
    }
    return chats;
  };

  return {
    setChatMembers,
    getChatMembers,
    getChatMessages,
    getLastChatMessage,
    getUserChats,
  };
};

export default useChats;
