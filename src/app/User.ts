import { Contact } from './Contact';

export class User {
  id!: string;
  name!: string;
  createdAt!: Date;
  phoneNumber!: string;
  profileImageUrl!: string;
  contacts!: Contact[];
  constructor() {}
}

export class ChatUser {
  id!: string;
  name!: string;
  profileImageUrl!: string;
  chat!: IChat;
  status!: string;
}

export interface IUser extends User {}
export interface IChatUser extends ChatUser {}
