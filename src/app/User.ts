import { ObjectCustom } from 'pubnub';
import { IContact } from './Contact';

/**
 * This interface represents a user in a general way (not in a chat context).
 */
export interface IUser {
  id: string;
  name: string;
  phoneNumber: string;
  profileImageUrl: string;
  contacts: IContact[];
}

export interface ICustomUserMetaData extends ObjectCustom {
  name: string;
  profileImageUrl: string;
}

/**
 * This interface represents a user in a chat context
 */
export interface IChatUser {
  id: string;
  name: string;
  profileImageUrl: string;
  status?: string;
}
