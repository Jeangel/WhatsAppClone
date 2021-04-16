import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StackHeaderProps, StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components';
import { Icon } from '../../components/atoms/Icon';
import { Header } from '../../components/molecules/Header';
import { StoriesList } from '../../components/organisms/StoriesList';
import { ChatList } from '../../components/organisms/Chat/ChatList';
import { ChatStackParamList } from '../../navigation/ChatsStackNav';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const StoryContainer = styled(View)`
  padding: 20px 0;
  border-bottom-color: ${({ theme }) => theme.colors.neutral80};
  border-bottom-width: 0.5px;
`;

export const ChatsHeader = (props: StackHeaderProps) => {
  return (
    <Header {...props} title="Chats">
      <TouchableOpacity onPress={() => {}}>
        <Icon name="add-people" size={35} color={'primary'} />
      </TouchableOpacity>
    </Header>
  );
};

type ChatScreenNavigationProp = StackNavigationProp<
  ChatStackParamList,
  'Chats'
>;

interface ChatsProps {
  navigation: ChatScreenNavigationProp;
}

export const Chats = ({ navigation }: ChatsProps) => {
  const onChatPress = (chatId: string) => {
    navigation.navigate('Chat', { chatId });
  };
  const onChatRemove = () => {};
  return (
    <Container>
      <StoryContainer>
        <StoriesList />
      </StoryContainer>
      <ChatList onChatPress={onChatPress} onChatRemove={onChatRemove} />
    </Container>
  );
};
