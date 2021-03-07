import * as React from 'react';
import { View } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import styled from 'styled-components';
import { Text } from '../components/atoms/Text';
import { Header } from '../components/molecules/Header';

const HeaderContent = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

export const ChatsHeader = (props: StackHeaderProps) => {
  return (
    <Header insets={props.insets}>
      <HeaderContent>
        <Text variant="h1">Chats</Text>
        <Text variant="h1">X2</Text>
      </HeaderContent>
    </Header>
  );
};

export const Chats = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text variant="h2">Chats</Text>
    </View>
  );
};
