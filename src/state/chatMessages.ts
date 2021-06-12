import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMessage, IChatMessage } from '../app/Message';
import _ from 'lodash';

type ChatMessagesStore = {
  chatMessages: IChatMessage[];
  addChat: (chatId: string) => void;
  addChatMessages: (chatId: string, messages: IMessage[]) => void;
  setChatMessages: ({ chatMessages }: { chatMessages: IChatMessage[] }) => void;
  updateChatMessage: (
    messageId: number,
    chatId: string,
    update: IMessage,
  ) => void;
  getLastMessageFromChat: (chatId: string) => IMessage | undefined;
  getMessagesForChat: (chat: string) => IMessage[];
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
  addChat: (chatId) => {
    set(({ chatMessages }) => {
      const newChats = chatMessages.concat({
        chatId,
        messages: [],
      });
      return { chatMessages: _.uniqBy(newChats, (e) => e.chatId) };
    });
  },
  addChatMessages: (chatId, newMessages) => {
    set(({ chatMessages }) => {
      const chat = chatMessages.find((e) => e.chatId === chatId);
      if (!chat) {
        return { chatMessages };
      }
      const messages = chat.messages.concat(newMessages);
      return {
        chatMessages: chatMessages.map((e) =>
          e.chatId === chatId ? { ...e, messages } : e,
        ),
      };
    });
  },
  setChatMessages: ({ chatMessages }) => {
    set({ chatMessages });
  },
  updateChatMessage: (messageId, chatId, message) => {
    set(({ chatMessages }) => {
      const chat = chatMessages.find((e) => e.chatId === chatId);
      if (!chat) {
        return { chatMessages };
      }
      const messages = chat.messages.map((e) =>
        e._id === messageId ? message : e,
      );
      const chats = chatMessages.map((e) =>
        e.chatId === chatId ? { ...e, messages } : e,
      );
      return {
        chatMessages: chats,
      };
    });
  },
  getLastMessageFromChat: (chatId) => {
    const chat = get().chatMessages.find((e) => e.chatId === chatId);
    if (!chat || (chat && !chat.messages.length)) {
      return;
    }
    return chat.messages[chat.messages.length - 1];
  },
  getMessagesForChat: (chatId) => {
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
