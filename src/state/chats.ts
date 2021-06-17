import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IChatItem } from '../app/Chat';
import _ from 'lodash';
import { useChatMessagesStore } from './chatMessages';

type ChatStore = {
  chats: IChatItem[];
  setChats: (args: { chats: IChatItem[] }) => void;
  addChat: (args: { chat: IChatItem }) => void;
  currentChat?: IChatItem;
  setCurrentChat: (args: { chatId?: string }) => void;
  updateChat: (args: { chatId: string; chat: IChatItem }) => void;
  chatExists: (args: { chatId: string }) => boolean;
  getSortedNonEmptyChats: () => IChatItem[];
};

const initialState: ChatStore = {
  chats: [],
  setChats: () => {},
  addChat: () => {},
  currentChat: undefined,
  setCurrentChat: () => {},
  updateChat: () => {},
  chatExists: () => false,
  getSortedNonEmptyChats: () => [],
};

let store: StateCreator<ChatStore> = (set, get) => ({
  chats: initialState.chats,
  currentChat: initialState.currentChat,
  addChat: ({ chat }) => {
    const mergedChats = get().chats.concat(chat);
    const uniqueChats = _.uniqBy(mergedChats, (e) => e.chatId);
    set({ chats: uniqueChats });
  },
  setChats: ({ chats }) => {
    const uniqueChats = _.uniqBy(chats, (e) => e.chatId);
    set({ chats: uniqueChats });
  },
  setCurrentChat: ({ chatId }) => {
    const currentChat = get().chats.find((e) => e.chatId === chatId);
    set(() => ({ currentChat }));
  },
  updateChat: ({ chatId, chat }) => {
    const chats = get().chats.map((e) => (e.chatId === chatId ? chat : e));
    set(() => ({ chats }));
  },
  chatExists: ({ chatId }) => {
    const chat = get().chats.find((e) => e.chatId === chatId);
    return !!chat;
  },
  getSortedNonEmptyChats: () => {
    const allChats = get().chats;
    const formattedChats = allChats.map((chat) => ({
      ...chat,
      lastMessage: useChatMessagesStore
        .getState()
        .getLastMessageFromChat({ chatId: chat.chatId }),
    }));
    const nonEmptyChats = formattedChats.filter((chat) => {
      return !!chat.lastMessage;
    });
    const sortedChats = nonEmptyChats.sort((a, b) => {
      if (a.lastMessage && b.lastMessage) {
        return b.lastMessage._id - a.lastMessage._id;
      }
      return 0;
    });
    return sortedChats;
  },
});

store = devtools(store);

store = persist(store, {
  name: 'chat-store',
  getStorage: () => AsyncStorage,
});

export const useChatsStore = create(store);
