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
import { useSpinner } from '../hooks';
import { usePushError } from '../state/error';

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
  flex: 1;
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

export const ConfirmOTP = ({ route, navigation }: ConfirmOTPProps) => {
  const [code, setCode] = React.useState('');
  const [loop, setLoop] = React.useState(true);
  const { showSpinner, hideSpinner } = useSpinner();
  const pushError = usePushError();
  const [otpConfirmationTimes, setOTPConfirmationTimes] = React.useState(0);
  const [isFetching, setIsFetching] = React.useState(false);
  const animationRef = React.useRef<LottieView>(null);
  const confirmOTPCode = async () => {
    setIsFetching(true);
    try {
      showSpinner();
      const user = await route.params.confirmation.confirm(code);
      console.log(user);
      startFiniteAnimation();
    } catch (error) {
      pushError(error);
      setIsFetching(false);
    } finally {
      hideSpinner();
      setOTPConfirmationTimes(otpConfirmationTimes + 1);
    }
  };
  const startFiniteAnimation = () => {
    animationRef.current?.play(110, 149);
    setLoop(false);
  };
  const startInfiniteAnimation = () => {
    setLoop(true);
    animationRef.current?.play(60, 110);
  };
  React.useEffect(() => {
    startInfiniteAnimation();
  }, []);
  React.useEffect(() => {
    if (otpConfirmationTimes >= 3) {
      navigation.goBack();
    }
  }, [otpConfirmationTimes, navigation]);
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
          Didn't you receive any code?
        </DescriptionText>
        <ResendOTPCode
          text="RESEND NEW CODE"
          variant="transparent"
          disabled={isFetching || otpConfirmationTimes === 0}
          onPress={navigation.goBack}
        />
      </Container>
    </ScreenContainer>
  );
};
