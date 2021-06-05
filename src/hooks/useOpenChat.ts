import { useNavigation } from '@react-navigation/core';
import { useChatsStore } from '../state/chats';
import { usePushError } from '../state/error';
import useChats from './useChats';

interface IOpenChatArgs {
  /**
   * We always need the chatId.
   * This can be built by external components with help of some utilities
   */
  chatId: string;
  /**
   * When members are passed is mostly because the chat didn't exist
   * and need to add chat members to the channel.
   */
  membersIds?: string[];
}

/**
 * This hook returns a function to open a chat...
 * This function performs a set of needed operations to open
 * the chat successfully.
 */
export const useOpenChat = () => {
  const navigation = useNavigation();
  const { getChatMembers, setChatMembers } = useChats();
  const { setCurrentChat } = useChatsStore();
  const pushError = usePushError();

  const openChat = async ({ chatId, membersIds }: IOpenChatArgs) => {
    setCurrentChat(chatId);
    const members = await getChatMembers(chatId);
    // if the chat contain members yet, we're ready to go to the chat.
    if (members.length) {
      navigation.navigate('Chat', { chatId });
    }
    // otherwise we need to update the chat members before moving away.
    try {
      if (membersIds) {
        await setChatMembers({ members: membersIds, chatId });
        navigation.navigate('Chat', { chatId });
      }
    } catch (error) {
      pushError(error);
    }
  };
  return openChat;
};
