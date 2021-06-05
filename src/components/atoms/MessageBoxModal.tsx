import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';
import { BoxModal } from './BoxModal';
import { Button } from './Button';
import { Text } from './Text';
import { useBoxModalsStore, IBoxModalMessage } from '../../state/boxModal';

const CloseModalButton = styled(Button)`
  width: 100%;
`;

const Title = styled(Text)`
  padding-bottom: 20px;
  text-align: center;
`;

const Message = styled(Text)`
  padding-bottom: 20px;
  text-align: center;
`;

const Animation = styled(LottieView)`
  height: 150px;
  width: 150px;
`;

const Container = styled(View)`
  align-items: center;
`;

const variantProps = {
  success: {
    animation: require('../../animations/success.json'),
    defaultTitle: 'done',
  },
  info: {
    animation: require('../../animations/success.json'),
    defaultTitle: 'Info',
  },
  error: {
    animation: require('../../animations/error.json'),
    defaultTitle: 'Oh no, something went wrong!',
  },
};

export const MessageBoxModal = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [
    currentMessage,
    setCurrentMessage,
  ] = React.useState<IBoxModalMessage | null>(null);
  const { messages, removeMessage } = useBoxModalsStore();

  React.useEffect(() => {
    const areThereMessages = messages.length > 0;
    setCurrentMessage(areThereMessages ? messages[0] : null);
    setIsVisible(areThereMessages);
  }, [messages, messages.length]);

  React.useEffect(() => {
    if (currentMessage && !isVisible) {
      setIsVisible(true);
    }
  }, [currentMessage, isVisible]);

  const dismissMessage = () => {
    if (currentMessage) {
      if (typeof currentMessage.onClose === 'function') {
        currentMessage.onClose();
      }
      removeMessage(currentMessage);
      setCurrentMessage(null);
      setIsVisible(false);
    }
  };

  const defaultProps = variantProps[currentMessage?.variant || 'info'];

  return (
    <BoxModal isVisible={isVisible}>
      <Container>
        {currentMessage?.variant === 'error' && (
          <Animation
            source={require('../../animations/error.json')}
            loop={false}
            autoPlay
          />
        )}
        {currentMessage?.variant === 'success' && (
          <Animation
            source={require('../../animations/success.json')}
            loop={false}
            autoPlay
          />
        )}
        <Title variant="h2">
          {currentMessage?.title || defaultProps.defaultTitle}
        </Title>
        <Message>{currentMessage?.content}</Message>
        <CloseModalButton
          text="Close"
          variant="secondary"
          onPress={dismissMessage}
        />
      </Container>
    </BoxModal>
  );
};
