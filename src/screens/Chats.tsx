import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import styled from 'styled-components';
import { Icon } from '../components/atoms/Icon';
import { Text } from '../components/atoms/Text';
import { Header } from '../components/molecules/Header';
import { StoriesList } from '../components/organisms/StoriesList';
import { ChatList } from '../components/organisms/ChatList';

const HeaderContent = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

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
    <Header insets={props.insets}>
      <HeaderContent>
        <Text variant="h1">Chats</Text>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="add-people" size={35} color={'primary'} />
        </TouchableOpacity>
      </HeaderContent>
    </Header>
  );
};

export const Chats = () => {
  return (
    <Container>
      <StoryContainer>
        <StoriesList />
      </StoryContainer>
      <ChatList />
    </Container>
  );
};
