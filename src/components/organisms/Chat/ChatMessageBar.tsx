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

const ActionButtonContainer = styled(Animated.View)`
  padding-right: 10px;
  align-items: center;
  justify-content: center;
`;

const EmojiButton = () => {
  return (
    <RoundedBarButton>
      <Icon name="smile-face" size={20} color={'primary'} />
    </RoundedBarButton>
  );
};

const ActionButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <ActionButtonContainer>
      <RoundedBarButton>{children}</RoundedBarButton>
    </ActionButtonContainer>
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

const ActionButtonIconContainer = styled(Animated.View)`
  position: absolute;
  background-color: red;
`;

export const ChatMessageBar = ({}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [message, setMessage] = useState('');
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const actionButtonAnimator = React.useRef(new Animated.Value(0)).current;

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

  // const actionButtonOutAnimation = animatedValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [],
  // });

  const outActionButtonAnimation = Animated.spring(actionButtonAnimator, {
    toValue: 0,
    useNativeDriver: true,
  });

  const inActionButtonAnimation = Animated.spring(actionButtonAnimator, {
    toValue: 1,
    useNativeDriver: true,
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
      outActionButtonAnimation.start();
    } else {
      decreaseAnimatedValueAnimation.start();
      inActionButtonAnimation.start();
    }
    return () => {
      increaseAnimateValueAnimation.stop();
      decreaseAnimatedValueAnimation.stop();
      outActionButtonAnimation.stop();
      inActionButtonAnimation.stop();
    };
  }, [
    isInputFocused,
    message,
    increaseAnimateValueAnimation,
    decreaseAnimatedValueAnimation,
    outActionButtonAnimation,
    inActionButtonAnimation,
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

  const sendButtonAnimation = actionButtonAnimator.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <Container>
      <EmojiButtonContainer>
        <EmojiButton />
      </EmojiButtonContainer>
      <AnimatedItemsContainer>
        <InputContainer style={{ width: inputWidthAnimation }}>
          <Input
            multiline
            placeholder="Type message"
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            value={message}
            onChangeText={onMessageChange}
          />
        </InputContainer>
        <ActionButton>
          <ActionButtonIconContainer
            style={{ transform: [{ scale: actionButtonAnimator }] }}>
            <Icon name="mic" size={20} color={'primary'} />
          </ActionButtonIconContainer>
          <ActionButtonIconContainer
            style={{ transform: [{ scale: sendButtonAnimation }] }}>
            <Icon name="send" size={20} color={'primary'} />
          </ActionButtonIconContainer>
        </ActionButton>
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
