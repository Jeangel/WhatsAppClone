import { Message } from './Message';
import { User } from './User';

export class Chat {
  id!: string;
  users!: User[];
  messages!: Message[];
  constructor() {}

  get lastMessage() {
    const isEmpty = !!this.messages.length;
    return isEmpty ? null : this.messages[this.messages.length - 1];
  }
}

export interface IChat {
  id: string;
  usersIds: string[];
  messages: Message[];
}

export interface IChatItem {
  id: string;
  lastMessage: Message;
  author: User;
  unreadMessages: number;
}
