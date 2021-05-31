import { IContact } from './Contact';

/**
 * This interface represents a user in a general way (not in a chat context).
 */
export interface IUser {
  id: string;
  name: string;
  createdAt: Date;
  phoneNumber: string;
  profileImageUrl: string;
  contacts: IContact[];
}

/**
 * This interface represents a user in a chat context
 */
export interface IChatUser {
  id: string;
  name: string;
  profileImageUrl: string;
  chat: IChat;
  status: string;
}
