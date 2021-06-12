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
  getNonEmptyChats: () => IChatItem[];
};

const initialState: ChatStore = {
  chats: [],
  setChats: () => {},
  addChat: () => {},
  currentChat: undefined,
  setCurrentChat: () => {},
  updateChat: () => {},
  chatExists: () => false,
  getNonEmptyChats: () => [],
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
  getNonEmptyChats: () => {
    const chatMessagesStore = useChatMessagesStore.getState().chatMessages;
    const nonEmptyChats = get().chats.filter((chat) => {
      const messages =
        chatMessagesStore.find((e) => e.chatId === chat.chatId)?.messages || [];
      return messages.length > 0;
    });
    return nonEmptyChats;
  },
});

store = devtools(store);

store = persist(store, {
  name: 'chat-store',
  getStorage: () => AsyncStorage,
});

export const useChatsStore = create(store);
