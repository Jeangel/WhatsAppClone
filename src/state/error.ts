import { useBoxModalsStore } from './boxModal';
import create from 'zustand';

type ErrorState = {
  errors: string[];
  pushError: (error: Error | string) => void;
  removeError: (error: Error | string) => void;
};

export const useErrorStore = create<ErrorState>((set, get) => ({
  errors: [],
  pushError: (error) => {
    let errorMessage = typeof error === 'string' ? error : error.message;
    set((state) => ({ errors: state.errors.concat(errorMessage) }));
  },
  removeError: (error) => {
    const filteredErrors = get().errors.filter((e) => e !== error);
    set(() => ({ errors: filteredErrors }));
  },
}));

export const selectErrors = (state: ErrorState) => state.errors;

export const useErrors = () => useErrorStore(selectErrors);
export const usePushError = () => {
  const { pushMessage } = useBoxModalsStore();
  const [pushErrorToStore, removeErrorFromStore] = useErrorStore((state) => [
    state.pushError,
    state.removeError,
  ]);
  const pushError = (error: Error | string) => {
    pushMessage({
      content: typeof error === 'string' ? error : error.message,
      variant: 'error',
      onClose: () => removeErrorFromStore(error),
    });
    pushErrorToStore(error);
  };
  return pushError;
};
