import Pubnub from 'pubnub';
import { PubNubChatMessage } from './../types/pubnub';

export const getKeyValue = <U extends keyof T, T extends object>(
  key: U,
  obj: T,
) => obj[key];

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const createOneToOneChatId = (userIds: string[]) => {
  const ids = userIds.slice(0, 2).sort();
  return `chats.private.${ids.join('-')}`;
};

export const pubnubMessageToGiftedChatMessage = (
  message: PubNubChatMessage,
) => ({
  _id: message.timetoken,
  createdAt: new Date(Number(message.timetoken) / 10000),
  text: message.message.text,
  user: {
    _id: message.message.author,
  },
});

export const pubnubMessageEventToGiftedChatMessage = (
  messageEvent: Pubnub.MessageEvent,
) => ({
  _id: messageEvent.timetoken,
  createdAt: new Date(Number(messageEvent.timetoken) / 10000),
  text: messageEvent.message.text,
  user: {
    _id: messageEvent.message.author,
  },
});
