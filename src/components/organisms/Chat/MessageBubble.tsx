import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { BubbleProps, IMessage } from 'react-native-gifted-chat';
import { Text } from '../../atoms/Text';

const Container = styled(View)`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 15px;
  border-radius: 30px;
`;

interface MessageBubbleProps extends BubbleProps<IMessage> {}

export const MessageBubble = (props: MessageBubbleProps) => {
  console.log(props);
  return (
    <Container>
      <Text color={'white'}>{props.currentMessage?.text}</Text>
    </Container>
  );
};
