import { Message } from './Message';
import { IChatUser } from './User';

export class Chat {
  id!: string;
  users!: IChatUser[];
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
  chatId: string;
  members: string[];
}
