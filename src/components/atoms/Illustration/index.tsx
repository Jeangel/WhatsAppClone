import * as React from 'react';
import { NewContact } from './NewContact';
import { Chatting } from './Chatting';
import { SendLetter } from './SendLetter';
import { TakePhoto } from './TakePhoto';
import { Welcome } from './Welcome';
import { NoChats } from './NoChats';

interface IllustrationProps {
  name: string;
}

export const Illustration = ({ name }: IllustrationProps) => {
  switch (name) {
    case 'welcome':
      return <Welcome />;
    case 'chatting':
      return <Chatting />;
    case 'send-letter':
      return <SendLetter />;
    case 'take-photo':
      return <TakePhoto />;
    case 'add-contact':
      return <NewContact />;
    case 'no-chats':
      return <NoChats />;
    default:
      return <React.Fragment />;
  }
};
