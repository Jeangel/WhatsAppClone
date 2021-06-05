import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IChatItem } from '../app/Chat';

type ChatStore = {
  chatList: IChatItem[];
  setChatList: (chatList: IChatItem[]) => void;
  currentChat?: IChatItem;
  setCurrentChat: (chatId?: string) => void;
};

const initialState: ChatStore = {
  chatList: [],
  setChatList: () => {},
  currentChat: undefined,
  setCurrentChat: () => {},
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
    }),
    { name: 'chat-store', getStorage: () => AsyncStorage },
  ),
);
