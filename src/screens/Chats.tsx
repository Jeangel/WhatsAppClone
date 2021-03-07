import * as React from 'react';
import { View } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import styled from 'styled-components';
import { Icon } from '../components/atoms/Icon';
import { Text } from '../components/atoms/Text';
import { Header } from '../components/molecules/Header';
import { StatusList } from '../components/organisms/StatusList';

const HeaderContent = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ChatsHeader = (props: StackHeaderProps) => {
  return (
    <Header insets={props.insets}>
      <HeaderContent>
        <Text variant="h1">Chats</Text>
        <Icon name="add-people" size={35} color={'primary'} />
      </HeaderContent>
    </Header>
  );
};

export const Chats = () => {
  return (
    <Container>
      <StatusList />
    </Container>
  );
};
