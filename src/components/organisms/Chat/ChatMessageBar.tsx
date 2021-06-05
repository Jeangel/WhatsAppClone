import * as React from 'react';
import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { InputToolbarProps } from 'react-native-gifted-chat';
import styled from 'styled-components';
import { Icon } from '../../atoms/Icon';

const Container = styled(View)`
  min-height: 50px;
  max-height: 70px;
  padding: 0 20px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

const Input = styled(TextInput)`
  border: 1px solid ${({ theme }) => theme.colors.neutral80};
  padding: 10px 15px;
  height: 40px;
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
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

const EmojiButtonContainer = styled(View)`
  width: 10%;
`;

const AnimatedItemsContainer = styled(View)`
  flex-direction: row;
  align-items: flex-start;
  width: 90%;
`;

const DynamicButtonsContainer = styled(Animated.View)`
  margin-right: 10px;
  align-items: flex-end;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

interface RoundedButtonProps {
  icon: string;
  onPress?: () => void;
  disabled?: boolean;
  style?:
    | Animated.AnimatedInterpolation
    | Animated.WithAnimatedObject<ViewStyle>
    | ViewStyle;
}

const RoundedButton = ({
  icon,
  style,
  onPress,
  disabled,
}: RoundedButtonProps) => {
  return (
    <Animated.View style={style}>
      <RoundedButtonShape onPress={onPress} disabled={disabled}>
        <Icon name={icon} size={20} color={'primary'} />
      </RoundedButtonShape>
    </Animated.View>
  );
};

const DynamicButton = styled(RoundedButton)`
  position: absolute;
`;

interface ChatMessageBarProps extends InputToolbarProps {
  /**
   * Sadly types are not updated for the InputToolbarProps from
   * react-native-gifted-chat... then, let's do it manual.
   */
  onSend?: ({ text: string }: { text: string }) => void;
}

export const ChatMessageBar = ({ onSend }: ChatMessageBarProps) => {
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
    duration: 100,
  });

  const decreaseAnimatedValueAnimation = Animated.timing(inputSizeAnimator, {
    toValue: 0,
    useNativeDriver: false,
    duration: 100,
  });

  React.useEffect(() => {
    const shouldGrow = !!message.length;
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
    message,
    increaseAnimateValueAnimation,
    decreaseAnimatedValueAnimation,
    dynamicButtonFadeOutAnimation,
    dynamicButtonFadeInAnimation,
  ]);

  const onMessageChange = (text: string) => {
    setMessage(text);
  };

  const handleOnSend = () => {
    if (typeof onSend === 'function') {
      onSend({ text: message.trim() });
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container>
        <EmojiButtonContainer>
          <RoundedButton icon="smile-face" />
        </EmojiButtonContainer>
        <AnimatedItemsContainer>
          <InputContainer style={{ width: messageInputSizeAnimation }}>
            <Input
              multiline
              placeholder="Type message"
              value={message}
              onChangeText={onMessageChange}
              numberOfLines={2}
            />
          </InputContainer>
          <DynamicButtonsContainer>
            <DynamicButton
              icon="mic"
              style={{ transform: [{ scale: dynamicButtonAnimator }] }}
            />
            <DynamicButton
              icon="send"
              onPress={handleOnSend}
              style={{ transform: [{ scale: sendButtonFadeInOutAnimation }] }}
              disabled={!message.trim()}
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
    </KeyboardAvoidingView>
  );
};
