import create, { StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMessage, IMessagesByChat } from '../app/Message';

type MessagesStore = {
  messagesByChat: IMessagesByChat[];
  addMessagesByChat: (messages: IMessagesByChat[]) => void;
  setMessagesByChat: (messages: IMessagesByChat[]) => void;
  updateMessage: (messageId: number, chatId: string, update: IMessage) => void;
  getLastMessageFromChat: (chatId: string) => IMessage | undefined;
};

const initialState: MessagesStore = {
  messagesByChat: [],
  addMessagesByChat: () => {},
  updateMessage: () => {},
  setMessagesByChat: () => {},
  getLastMessageFromChat: () => {
    return undefined;
  },
};

let store: StateCreator<MessagesStore> = (set, get) => ({
  messagesByChat: initialState.messagesByChat,
  addMessagesByChat: (newMessages) => {
    set(({ messagesByChat }) => ({
      messagesByChat: messagesByChat.concat(newMessages),
    }));
  },
  setMessagesByChat: (messagesByChat) => {
    set(() => ({ messagesByChat }));
  },
  updateMessage: (messageId, chatId, message) => {
    set(({ messagesByChat }) => {
      const chat = messagesByChat.find((e) => e.chatId === chatId);
      if (!chat) {
        return {
          messagesByChat,
        };
      }
      const messages = chat.messages.map((e) =>
        e._id === messageId ? message : e,
      );
      const chats = messagesByChat.map((e) =>
        e.chatId === chatId ? { ...e, messages } : e,
      );
      return {
        messagesByChat: chats,
      };
    });
  },
  getLastMessageFromChat: (chatId) => {
    const chat = get().messagesByChat.find((e) => e.chatId === chatId);
    if (!chat || (chat && !chat.messages.length)) {
      return;
    }
    return chat.messages[chat.messages.length - 1];
  },
});

store = persist(store, {
  name: 'messages-store',
  getStorage: () => AsyncStorage,
});

export const useMessagesStore = create(store);
