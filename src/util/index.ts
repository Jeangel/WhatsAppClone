import Pubnub from 'pubnub';
import { IMessage } from '../app/Message';
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

export const fromTimeTokenToDate = (timetoken?: string | number) =>
  new Date(Number(timetoken) / 10000);

export const pubnubMessageToChatMessage = (
  message: PubNubChatMessage,
): IMessage => ({
  _id: Number(message.timetoken),
  createdAt: fromTimeTokenToDate(message.timetoken).toISOString(),
  text: message.message.text,
  user: {
    _id: message.message.author,
  },
});

export const pubnubMessageEventToChatMessage = (
  messageEvent: Pubnub.MessageEvent,
): IMessage => ({
  _id: Number(messageEvent.timetoken),
  createdAt: fromTimeTokenToDate(messageEvent.timetoken).toISOString(),
  text: messageEvent.message.text,
  user: {
    _id: messageEvent.message.author,
  },
});
