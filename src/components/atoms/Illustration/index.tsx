import * as React from 'react';
import { NewContact } from './NewContact';
import { Chatting } from './Chatting';
import { SendLetter } from './SendLetter';
import { TakePhoto } from './TakePhoto';
import { Welcome } from './Welcome';

interface IllustrationProps {
  name: string;
}

export const Illustration = ({ name }: IllustrationProps) => {
  switch (name) {
    case 'welcome':
      return <Welcome />;
    case 'chatting':
      return <Chatting />;
    case 'send_letter':
      return <SendLetter />;
    case 'take_photo':
      return <TakePhoto />;
    case 'add_contact':
      return <NewContact />;
    default:
      return <React.Fragment />;
  }
};
