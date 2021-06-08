import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IChatItem } from '../app/Chat';

type ChatStore = {
  chats: IChatItem[];
  setChats: (chats: IChatItem[]) => void;
  currentChat?: IChatItem;
  setCurrentChat: (chatId?: string) => void;
  updateChat: (chatId: string, chat: IChatItem) => void;
};

const initialState: ChatStore = {
  chats: [],
  setChats: () => {},
  currentChat: undefined,
  setCurrentChat: () => {},
  updateChat: () => {},
};

export const useChatsStore = create<ChatStore>(
  persist(
    (set, get) => ({
      chats: initialState.chats,
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
    }),
    { name: 'chat-store', getStorage: () => AsyncStorage },
  ),
);
