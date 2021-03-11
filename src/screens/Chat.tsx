import * as React from 'react';
import { View } from 'react-native';
import { StackHeaderProps, StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components';
import { Header } from '../components/molecules/Header';
import { ChatStackParamList } from '../navigation/ChatsStackNav';
// TODO: Create a separate folder with all the dummy data
import { dummyData } from '../components/organisms/data';
import { UserInfo } from '../components/molecules/User/UserInfo';
import { capitalize } from '../util';

type ChatScreenNavigationProp = StackNavigationProp<ChatStackParamList, 'Chat'>;

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ChatHeader = (props: StackHeaderProps) => {
  // TODO: Jum, how to type this properly?
  const params = props.scene.route.params as { chatId: string };
  const chat = dummyData.find((e) => e.id === params.chatId);
  return (
    <Header insets={props.insets}>
      {chat ? (
        <UserInfo
          user={chat.author}
          description={capitalize(chat.author.status)}
          size={40}
        />
      ) : null}
    </Header>
  );
};

interface ChatProps {
  navigation: ChatScreenNavigationProp;
}

export const Chat = ({}: ChatProps) => {
  return <Container />;
};
