export enum EMessageStatus {
  sent = 'sent',
  read = 'read',
  received = 'received',
}

export interface IMessage {
  _id: number;
  createdAt: string;
  text: string;
  user: {
    _id: string;
  };
}

export interface IChatMessage {
  chatId: string;
  messages: IMessage[];
}
