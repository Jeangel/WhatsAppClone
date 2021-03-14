import * as React from 'react';
import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Animated } from 'react-native';
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
  width: 100%;
`;

const InputContainer = styled(Animated.View)`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 2px;
`;

const RoundedBarButton = styled(TouchableOpacity)`
  height: 40px;
  width: 40px;
  border: 1px solid ${({ theme }) => theme.colors.neutral80};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;

const EmojiButtonContainer = styled(View)`
  width: 10%;
`;

const AnimatedItemsContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 90%;
`;

const VoiceNoteButtonContainer = styled(Animated.View)`
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
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const inputWidthAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['72%', '85%'],
  });

  const moreButtonTranslateAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });
  const moreButtonOpacityAnimation = animatedValue.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
  });

  const increaseAnimateValueAnimation = Animated.timing(animatedValue, {
    toValue: 1,
    useNativeDriver: false,
    duration: 200,
  });

  const decreaseAnimatedValueAnimation = Animated.timing(animatedValue, {
    toValue: 0,
    useNativeDriver: false,
    duration: 200,
  });

  React.useEffect(() => {
    const shouldGrow = !!(isInputFocused || message.length);
    if (shouldGrow) {
      increaseAnimateValueAnimation.start();
    } else {
      decreaseAnimatedValueAnimation.start();
    }
    return () => {
      increaseAnimateValueAnimation.stop();
      decreaseAnimatedValueAnimation.stop();
    };
  }, [
    isInputFocused,
    message,
    increaseAnimateValueAnimation,
    decreaseAnimatedValueAnimation,
  ]);

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
      <EmojiButtonContainer>
        <EmojiButton />
      </EmojiButtonContainer>
      <AnimatedItemsContainer>
        <InputContainer style={{ width: inputWidthAnimation }}>
          <Input
            placeholder="Type message"
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            multiline
            value={message}
            onChangeText={onMessageChange}
          />
        </InputContainer>
        <VoiceNoteButton />
        <Animated.View
          style={{
            transform: [{ translateX: moreButtonTranslateAnimation }],
            opacity: moreButtonOpacityAnimation,
          }}>
          <MoreButton />
        </Animated.View>
      </AnimatedItemsContainer>
    </Container>
  );
};
