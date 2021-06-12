import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMessage, IChatMessage } from '../app/Message';
import _ from 'lodash';

type ChatMessagesStore = {
  chatMessages: IChatMessage[];
  addChat: (args: { chatId: string }) => void;
  addChatMessages: (args: { chatId: string; messages: IMessage[] }) => void;
  setChatMessages: (args: { chatMessages: IChatMessage[] }) => void;
  updateChatMessage: (args: {
    messageId: number;
    chatId: string;
    messageUpdated: IMessage;
  }) => void;
  getLastMessageFromChat: (args: { chatId: string }) => IMessage | undefined;
  getMessagesForChat: (args: { chatId: string }) => IMessage[];
};

const initialState: ChatMessagesStore = {
  chatMessages: [],
  addChatMessages: () => {},
  addChat: () => {},
  updateChatMessage: () => {},
  setChatMessages: () => {},
  getLastMessageFromChat: () => {
    return undefined;
  },
  getMessagesForChat: () => {
    return [];
  },
};

let store: StateCreator<ChatMessagesStore> = (set, get) => ({
  chatMessages: initialState.chatMessages,
  addChat: ({ chatId }) => {
    const mergedChats = get().chatMessages.concat({
      chatId,
      messages: [],
    });
    const uniqueChats = _.uniqBy(mergedChats, (e) => e.chatId);
    set({ chatMessages: uniqueChats });
  },
  addChatMessages: ({ chatId, messages: newMessages }) => {
    const existingMessages = get().chatMessages;
    const chat = existingMessages.find((e) => e.chatId === chatId);
    if (!chat) {
      return;
    }
    const mergedMessages = chat.messages.concat(newMessages);
    set({
      chatMessages: existingMessages.map((e) =>
        e.chatId === chatId ? { ...e, mergedMessages } : e,
      ),
    });
  },
  setChatMessages: ({ chatMessages }) => {
    set({ chatMessages });
  },
  updateChatMessage: ({ messageId, chatId, messageUpdated }) => {
    set(({ chatMessages }) => {
      const chat = chatMessages.find((e) => e.chatId === chatId);
      if (!chat) {
        return { chatMessages };
      }
      const messages = chat.messages.map((e) =>
        e._id === messageId ? messageUpdated : e,
      );
      const chats = chatMessages.map((e) =>
        e.chatId === chatId ? { ...e, messages } : e,
      );
      return {
        chatMessages: chats,
      };
    });
  },
  getLastMessageFromChat: ({ chatId }) => {
    const chat = get().chatMessages.find((e) => e.chatId === chatId);
    if (!chat || (chat && !chat.messages.length)) {
      return;
    }
    return chat.messages[chat.messages.length - 1];
  },
  getMessagesForChat: ({ chatId }) => {
    const chat = get().chatMessages.find((e) => e.chatId === chatId);
    if (!chat || (chat && !chat.messages.length)) {
      return [];
    }
    return chat.messages;
  },
});

store = devtools(store);

store = persist(store, {
  name: 'messages-store',
  getStorage: () => AsyncStorage,
});

export const useChatMessagesStore = create(store);
