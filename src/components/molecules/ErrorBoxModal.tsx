import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';
import { useErrorStore } from '../../state/error';
import { BoxModal } from '../atoms/BoxModal';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';

interface ErrorBoxModal {
  isVisible: boolean;
}

const CloseModalButton = styled(Button)`
  width: 100%;
`;

const Title = styled(Text)`
  padding-bottom: 20px;
`;

const ErrorMessage = styled(Text)`
  padding-bottom: 20px;
  text-align: center;
`;

const ErrorAnimation = styled(LottieView)`
  height: 150px;
  width: 150px;
`;

const Container = styled(View)`
  align-items: center;
`;

export const ErrorBoxModal = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [currentError, setCurrentError] = React.useState('');
  const { errors, removeError } = useErrorStore();

  React.useEffect(() => {
    const areThereErrors = errors.length > 0;
    setCurrentError(areThereErrors ? errors[0] : '');
    setIsVisible(areThereErrors);
  }, [errors, errors.length]);

  const dismissError = () => {
    removeError(currentError);
    setIsVisible(false);
  };

  return (
    <BoxModal isVisible={isVisible}>
      <Container>
        <ErrorAnimation
          source={require('../../animations/error')}
          loop={false}
          autoPlay
        />
        <Title variant="h2">Oh no, something went wrong</Title>
        <ErrorMessage>{currentError}</ErrorMessage>
        <CloseModalButton
          text="Close"
          variant="secondary"
          onPress={dismissError}
        />
      </Container>
    </BoxModal>
  );
};
