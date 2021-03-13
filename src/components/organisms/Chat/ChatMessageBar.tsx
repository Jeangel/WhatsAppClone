import * as React from 'react';
import { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Icon } from '../../atoms/Icon';

const Container = styled(View)`
  flex: 1;
  padding: 5px 15px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

const Input = styled(TextInput)`
  border: 1px solid ${({ theme }) => theme.colors.neutral80};
  padding: 5px 15px;
  padding-top: 7px;
  max-height: 200px;
  min-height: 35px;
  border-radius: 20px;
`;

const InputContainer = styled(View)`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 2px;
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

const MoreButton = () => {
  return (
    <RoundedBarButton>
      <Icon name="clip" size={20} color={'primary'} />
    </RoundedBarButton>
  );
};

const SendButton = () => {
  return (
    <RoundedBarButton>
      <Icon name="send" size={20} color={'primary'} />
    </RoundedBarButton>
  );
};

export const ChatMessageBar = ({}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [message, setMessage] = useState('');

  const handleOnFocus = () => {
    setIsInputFocused(true);
  };

  const handleOnBlur = () => {
    setIsInputFocused(false);
  };

  const onMessageChange = (text: string) => {
    setMessage(text);
  };

  return (
    <Container>
      <EmojiButton />
      <InputContainer>
        <Input
          placeholder="Type message"
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          multiline
          value={message}
          onChangeText={onMessageChange}
        />
      </InputContainer>
      {!isInputFocused && !message.length && <VoiceNoteButton />}
      {!isInputFocused && !message.length && <MoreButton />}
      {(isInputFocused || !!message.length) && <SendButton />}
    </Container>
  );
};
