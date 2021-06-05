import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IChatItem } from '../app/Chat';

type ChatStore = {
  chatList: IChatItem[];
  setChatList: (chatList: IChatItem[]) => void;
  currentChat?: IChatItem;
  setCurrentChat: (chatId?: string) => void;
  updateChat: (chatId: string, chat: IChatItem) => void;
};

const initialState: ChatStore = {
  chatList: [],
  setChatList: () => {},
  currentChat: undefined,
  setCurrentChat: () => {},
  updateChat: () => {},
};

export const useChatsStore = create<ChatStore>(
  persist(
    (set, get) => ({
      chatList: initialState.chatList,
      setChatList: (chatList) => {
        set(() => ({ chatList }));
      },
      setCurrentChat: (currentChatId) => {
        const currentChat = get().chatList.find((e) => e.id === currentChatId);
        set(() => ({ currentChat }));
      },
      currentChat: initialState.currentChat,
      updateChat: (chatId, chat) => {
        const chatList = get().chatList.map((e) =>
          e.id === chatId ? chat : e,
        );
        set(() => ({ chatList }));
      },
    }),
    { name: 'chat-store', getStorage: () => AsyncStorage },
  ),
);
