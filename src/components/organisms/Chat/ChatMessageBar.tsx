import * as React from 'react';
import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  ViewStyle,
} from 'react-native';
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

const RoundedButtonShape = styled(TouchableOpacity)`
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

const DynamicButtonsContainer = styled(Animated.View)`
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

interface RoundedButtonProps {
  icon: string;
  style?:
    | Animated.AnimatedInterpolation
    | Animated.WithAnimatedObject<ViewStyle>
    | ViewStyle;
}

const RoundedButton = ({ icon, style }: RoundedButtonProps) => {
  return (
    <Animated.View style={style}>
      <RoundedButtonShape>
        <Icon name={icon} size={20} color={'primary'} />
      </RoundedButtonShape>
    </Animated.View>
  );
};

const DynamicButton = styled(RoundedButton)`
  position: absolute;
`;

export const ChatMessageBar = ({}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [message, setMessage] = useState('');
  const inputSizeAnimator = React.useRef(new Animated.Value(0)).current;
  const dynamicButtonAnimator = React.useRef(new Animated.Value(0)).current;

  const messageInputSizeAnimation = inputSizeAnimator.interpolate({
    inputRange: [0, 1],
    outputRange: ['75%', '85%'],
  });

  const moreButtonTranslateAnimation = inputSizeAnimator.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  const moreButtonOpacityAnimation = inputSizeAnimator.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
  });

  const dynamicButtonFadeOutAnimation = Animated.spring(dynamicButtonAnimator, {
    toValue: 0,
    useNativeDriver: true,
  });

  const dynamicButtonFadeInAnimation = Animated.spring(dynamicButtonAnimator, {
    toValue: 1,
    useNativeDriver: true,
  });

  const sendButtonFadeInOutAnimation = dynamicButtonAnimator.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const increaseAnimateValueAnimation = Animated.timing(inputSizeAnimator, {
    toValue: 1,
    useNativeDriver: false,
    duration: 200,
  });

  const decreaseAnimatedValueAnimation = Animated.timing(inputSizeAnimator, {
    toValue: 0,
    useNativeDriver: false,
    duration: 200,
  });

  React.useEffect(() => {
    const shouldGrow = !!(isInputFocused || message.length);
    if (shouldGrow) {
      increaseAnimateValueAnimation.start();
      dynamicButtonFadeOutAnimation.start();
    } else {
      decreaseAnimatedValueAnimation.start();
      dynamicButtonFadeInAnimation.start();
    }
    return () => {
      increaseAnimateValueAnimation.stop();
      decreaseAnimatedValueAnimation.stop();
      dynamicButtonFadeOutAnimation.stop();
      dynamicButtonFadeInAnimation.stop();
    };
  }, [
    isInputFocused,
    message,
    increaseAnimateValueAnimation,
    decreaseAnimatedValueAnimation,
    dynamicButtonFadeOutAnimation,
    dynamicButtonFadeInAnimation,
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
        <RoundedButton icon="smile-face" />
      </EmojiButtonContainer>
      <AnimatedItemsContainer>
        <InputContainer style={{ width: messageInputSizeAnimation }}>
          <Input
            multiline
            placeholder="Type message"
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            value={message}
            onChangeText={onMessageChange}
          />
        </InputContainer>
        <DynamicButtonsContainer>
          <DynamicButton
            icon="mic"
            style={{ transform: [{ scale: dynamicButtonAnimator }] }}
          />
          <DynamicButton
            icon="send"
            style={{ transform: [{ scale: sendButtonFadeInOutAnimation }] }}
          />
        </DynamicButtonsContainer>
        <Animated.View
          style={{
            transform: [{ translateX: moreButtonTranslateAnimation }],
            opacity: moreButtonOpacityAnimation,
          }}>
          <RoundedButton icon="clip" />
        </Animated.View>
      </AnimatedItemsContainer>
    </Container>
  );
};
