import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IChatItem } from '../app/Chat';

type ChatStore = {
  chats: IChatItem[];
  setChats: (chats: IChatItem[]) => void;
  addChat: (chat: IChatItem) => void;
  currentChat?: IChatItem;
  setCurrentChat: (chatId?: string) => void;
  updateChat: (chatId: string, chat: IChatItem) => void;
  chatExists: (chatId: string) => boolean;
};

const initialState: ChatStore = {
  chats: [],
  setChats: () => {},
  addChat: () => {},
  currentChat: undefined,
  setCurrentChat: () => {},
  updateChat: () => {},
  chatExists: () => false,
};

let store: StateCreator<ChatStore> = (set, get) => ({
  chats: initialState.chats,
  addChat: (chat) => {
    set(({ chats }) => ({ chats: chats.concat(chat) }));
  },
  setChats: (chats) => {
    set(() => ({ chats }));
  },
  setCurrentChat: (currentChatId) => {
    const currentChat = get().chats.find((e) => e.chatId === currentChatId);
    set(() => ({ currentChat }));
  },
  currentChat: initialState.currentChat,
  updateChat: (chatId, chat) => {
    const chats = get().chats.map((e) => (e.chatId === chatId ? chat : e));
    set(() => ({ chats }));
  },
  chatExists: (chatId) => {
    const chat = get().chats.find((e) => e.chatId === chatId);
    return !!chat;
  },
});

store = devtools(store);

store = persist(store, {
  name: 'chat-store',
  getStorage: () => AsyncStorage,
});

export const useChatsStore = create(store);
