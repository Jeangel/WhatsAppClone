import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StackHeaderProps, StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components';
import { Icon } from '../components/atoms/Icon';
import { Text } from '../components/atoms/Text';
import { Header } from '../components/molecules/Header';
import { ChatStackParamList } from '../navigation/ChatsStackNav';

type ChatScreenNavigationProp = StackNavigationProp<ChatStackParamList, 'Chat'>;

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
      <HeaderContent />
    </Header>
  );
};

interface ChatProps {
  navigation: ChatScreenNavigationProp;
}

export const Chat = ({}: ChatProps) => {
  return <Container />;
};
