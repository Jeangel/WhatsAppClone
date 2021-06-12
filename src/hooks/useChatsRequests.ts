import { usePubNub } from 'pubnub-react';
import { IChatItem } from '../app/Chat';
import { useAuthStore } from '../state/auth';
import { pubnubMessageToChatMessage } from '../util';

const useChatsRequests = () => {
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

  const getChatMessages = async (id: string) => {
    try {
      const { channels } = await pubnub.fetchMessages({ channels: [id] });
      const channelMessages = channels[id] || [];
      return channelMessages.map(pubnubMessageToChatMessage);
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
      const promises = [];
      const setChatMembersPromise = pubnub.objects.setChannelMembers({
        uuids: members,
        channel: chatId,
      });
      members.forEach((member) => {
        promises.push(
          pubnub.objects.setMemberships({
            uuid: member,
            channels: [chatId],
          }),
        );
      });
      promises.push(setChatMembersPromise);
      const response = await Promise.all(promises);
      console.log(response, 'setting stuff');
    } catch (error) {
      console.log('error setting chat members', error);
    }
  };

  const getMyChats = async () => {
    const chats: IChatItem[] = [];
    let chatsIds: string[] = [];
    try {
      const memberships = await pubnub.objects.getMemberships({
        uuid: authenticatedUser.id,
      });
      chatsIds = memberships.data.map((e) => e.channel.id);
    } catch (error) {
      console.log('error getting memberships', error);
    }
    try {
      for (const chat of chatsIds) {
        const members = await getChatMembers(chat);
        chats.push({ chatId: chat, members });
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
    getMyChats,
  };
};

export default useChatsRequests;
