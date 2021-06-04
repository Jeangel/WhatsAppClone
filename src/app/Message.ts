export enum EMessageStatus {
  sent = 'sent',
  read = 'read',
  received = 'received',
}
export class Message {
  id!: string;
  author!: string;
  sentAt!: string;
  content!: string;
  type!: string;
  status!: keyof typeof EMessageStatus;
  constructor() {}
}
