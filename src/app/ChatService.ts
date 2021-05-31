interface IChatUser {
  id: string;
  name: string;
  status?: string;
}

interface IChatMessage {
  id: string;
  type: string;
  content: string;
  by: string;
  sentAt: string;
}

interface IChatItem {}

interface IChat {}

interface IChatService {}
