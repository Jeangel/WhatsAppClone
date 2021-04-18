import create from 'zustand';
import { v4 as uuid } from 'uuid';

export interface IBoxModalMessage {
  id: string;
  title?: string;
  content: string;
  variant?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

type BoxModalStore = {
  messages: IBoxModalMessage[];
  pushMessage: (message: Omit<IBoxModalMessage, 'id'> | string) => void;
  removeMessage: (message: IBoxModalMessage) => void;
};

export const useBoxModalsStore = create<BoxModalStore>((set, get) => ({
  messages: [],
  pushMessage: (message) => {
    const content = typeof message === 'string' ? message : message.content;
    const title = typeof message === 'string' ? undefined : message.title;
    const variant = typeof message === 'string' ? undefined : message.variant;
    const onClose = typeof message === 'string' ? undefined : message.onClose;
    const newMessage = {
      id: uuid(),
      content,
      title,
      variant: variant || 'info',
      onClose,
    };
    set((state) => ({ messages: state.messages.concat(newMessage) }));
  },
  removeMessage: (message) => {
    const filteredMessages = get().messages.filter((e) => e.id !== message.id);
    set(() => ({ messages: filteredMessages }));
  },
}));

export const selectMessages = (state: BoxModalStore) => state.messages;

export const useBoxModals = () => useBoxModalsStore(selectMessages);
export const usePushBoxModal = () =>
  useBoxModalsStore((state: BoxModalStore) => state.pushMessage);
