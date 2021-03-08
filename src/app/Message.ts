export class Message {
  id!: string;
  author!: string;
  sentAt!: string;
  sentTo!: string[];
  viewedBy!: string[];
  content!: string;
  type!: string;
  constructor() {}
}
