import * as React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Icon } from '../../atoms/Icon';

const Container = styled(View)`
  flex: 1;
  padding: 5px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Input = styled(TextInput)`
  border: 1px solid ${({ theme }) => theme.colors.neutral80};
  padding: 5px 15px;
  height: 40px;
  border-radius: 40px;
`;

const InputContainer = styled(View)`
  padding-left: 10px;
  padding-right: 10px;
  flex: 1;
`;

const RoundedBarButton = styled(TouchableOpacity)`
  height: 40px;
  width: 40px;
  border: 1px solid ${({ theme }) => theme.colors.neutral80};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;

const VoiceNoteButtonContainer = styled(View)`
  padding-right: 10px;
`;

const EmojiButton = () => {
  return (
    <RoundedBarButton>
      <Icon name="smile-face" size={20} color={'primary'} />
    </RoundedBarButton>
  );
};

const VoiceNoteButton = () => {
  return (
    <VoiceNoteButtonContainer>
      <RoundedBarButton>
        <Icon name="mic" size={20} color={'primary'} />
      </RoundedBarButton>
    </VoiceNoteButtonContainer>
  );
};

const More = () => {
  return (
    <RoundedBarButton>
      <Icon name="clip" size={20} color={'primary'} />
    </RoundedBarButton>
  );
};

export const ChatMessageBar = ({}) => {
  return (
    <Container>
      <EmojiButton />
      <InputContainer>
        <Input placeholder="Type message" />
      </InputContainer>
      <VoiceNoteButton />
      <More />
    </Container>
  );
};
