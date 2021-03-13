import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StackHeaderProps, StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components';
import { Header } from '../components/molecules/Header';
import { ChatStackParamList } from '../navigation/ChatsStackNav';
// TODO: Create a separate folder with all the dummy data
import { dummyData } from '../components/organisms/data';
import { UserCard } from '../components/molecules/User/UserCard';
import { capitalize } from '../util';
import { Icon } from '../components/atoms/Icon';
import { GiftedChat } from 'react-native-gifted-chat';
import { ChatMessageBar } from '../components/organisms/Chat/ChatMessageBar';

type ChatScreenNavigationProp = StackNavigationProp<ChatStackParamList, 'Chat'>;

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const IconsContainer = styled(View)`
  flex-direction: row;
  padding-left: 10px;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;

const UserStatusContainer = styled(View)`
  flex: 3;
`;

const IconContainer = styled(TouchableOpacity)`
  padding-right: 10px;
  padding-left: 10px;
`;

export const ChatHeader = (props: StackHeaderProps) => {
  // TODO: Jum, how to type this properly?
  const params = props.scene.route.params as { chatId: string };
  const chat = dummyData.find((e) => e.id === params.chatId);
  return (
    <Header {...props} showBackButton>
      {chat ? (
        <UserStatusContainer>
          <UserCard
            user={chat.author}
            description={capitalize(chat.author.status)}
            size={40}
          />
        </UserStatusContainer>
      ) : null}
      <IconsContainer>
        <IconContainer>
          <Icon name="phone" size={25} color={'primary'} />
        </IconContainer>
        <IconContainer>
          <Icon name="vide-camera" size={30} color={'primary'} />
        </IconContainer>
      </IconsContainer>
    </Header>
  );
};
interface ChatProps {
  navigation: ChatScreenNavigationProp;
}

export const Chat = ({}: ChatProps) => {
  return (
    <Container>
      <GiftedChat
        renderInputToolbar={() => <ChatMessageBar />}
        minInputToolbarHeight={100}
      />
    </Container>
  );
};
