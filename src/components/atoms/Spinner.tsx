import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';

const Container = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AnimationView = styled(LottieView)`
  height: 300px;
  width: 300px;
`;

interface SpinnerProps {
  isVisible: boolean;
}

export const Spinner = ({ isVisible }: SpinnerProps) =>
  isVisible ? (
    <Container>
      <AnimationView
        source={require('../../animations/loading.json')}
        loop
        autoPlay
      />
    </Container>
  ) : (
    <React.Fragment />
  );
