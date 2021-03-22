import * as React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from '../components/atoms/Text';
import { PublicStackParamList } from '../navigation/PublicStackNav';
import { Button } from '../components/atoms/Button';
import { OTPInput } from '../components/molecules/OTPInput';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';
import { RouteProp } from '@react-navigation/core';
import { ScreenContainer } from '../components/atoms/ScreenContainer';

type ConfirmOTPScreenNavigationProp = StackNavigationProp<
  PublicStackParamList,
  'ConfirmOTP'
>;

type ConfirmOTPScreenRouteProp = RouteProp<PublicStackParamList, 'ConfirmOTP'>;

interface ConfirmOTPProps {
  navigation: ConfirmOTPScreenNavigationProp;
  route: ConfirmOTPScreenRouteProp;
}

const Container = styled(KeyboardAvoidingView)`
  padding: 20px;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const TitleContainer = styled(View)`
  align-items: center;
`;

const DescriptionText = styled(Text)`
  text-align: center;
  padding-bottom: 10px;
  padding-top: 10px;
`;

const Title = styled(Text)`
  text-align: center;
  padding-bottom: 10px;
`;

const IllustrationContainer = styled(View)`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ConfirmOTPCode = styled(Button)`
  margin-top: 40px;
  align-self: center;
  width: 100%;
`;

const ResendOTPCode = styled(Button)`
  width: 100%;
  align-self: center;
`;

const AnimationView = styled(LottieView)`
  height: 300px;
  width: 300px;
`;

export const ConfirmOTP = ({ route }: ConfirmOTPProps) => {
  const [code, setCode] = React.useState('');
  const [loop, setLoop] = React.useState(true);
  const [otpConfirmationTimes, setOTPConfirmationTimes] = React.useState(0);
  const [isFetching, setIsFetching] = React.useState(false);
  const animationRef = React.useRef<LottieView>(null);
  const confirmOTPCode = async () => {
    setIsFetching(true);
    try {
      const user = await route.params.confirmation.confirm(code);
      console.log(user);
      startFiniteAnimation();
    } catch (error) {
      console.log('CONFIRM OTP ERROR', error);
      setIsFetching(false);
    } finally {
      setOTPConfirmationTimes(otpConfirmationTimes + 1);
    }
  };
  const startFiniteAnimation = () => {
    setLoop(false);
    animationRef.current?.play(0);
  };
  const startInfiniteAnimation = () => {
    setLoop(true);
    animationRef.current?.play(60, 110);
  };
  React.useEffect(() => {
    startInfiniteAnimation();
  }, []);
  return (
    <ScreenContainer>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TitleContainer>
          <Title variant="h1">Verify Your {'\n'} Phone number</Title>
        </TitleContainer>
        <IllustrationContainer>
          <AnimationView
            source={require('../animations/confirm.json')}
            ref={animationRef}
            loop={loop}
          />
        </IllustrationContainer>
        <DescriptionText>Enter Your OTP code here</DescriptionText>
        <OTPInput value={code} onChange={setCode} />
        <ConfirmOTPCode
          text="CONFIRM OTP CODE"
          onPress={confirmOTPCode}
          disabled={code.length < 6 || isFetching}
        />
        <DescriptionText variant="small">
          Didn't you receive any code? {otpConfirmationTimes}
        </DescriptionText>
        <ResendOTPCode
          text="RESEND NEW CODE"
          variant="transparent"
          disabled={isFetching || otpConfirmationTimes === 0}
        />
      </Container>
    </ScreenContainer>
  );
};
