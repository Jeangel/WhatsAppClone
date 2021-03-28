import * as React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSpinner } from '../../hooks';
import { useAuthStore } from '../../state/auth';
import { usePushError } from '../../state/error';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { OTPInput } from '../../components/molecules/OTPInput';
import { PublicStackParamList } from '../../navigation/PublicStackNav';
import { ScreenContainer } from '../../components/atoms/ScreenContainer';

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
  padding-bottom: 15px;
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
  margin-top: 25px;
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
  const animationRef = React.useRef<LottieView>(null);
  const [code, setCode] = React.useState('');
  const [isFetching, setIsFetching] = React.useState(false);
  const [userIsNew, setUserIsNew] = React.useState<boolean>();
  const [animationIsLooping, setAnimationIsLooping] = React.useState(true);
  const [otpConfirmationTimes, setOTPConfirmationTimes] = React.useState(0);
  const [animationHasFinished, setAnimationHasFinished] = React.useState(false);
  const { showSpinner, hideSpinner } = useSpinner();
  const { setAuthenticatedUser, authenticatedUser } = useAuthStore();
  const pushError = usePushError();

  const confirmOTPCode = async () => {
    setIsFetching(true);
    try {
      showSpinner();
      const { confirmation } = route.params;
      const confirmationResponse = await confirmation.confirm(code);
      if (confirmationResponse) {
        startFiniteAnimation();
        setUserIsNew(confirmationResponse.additionalUserInfo?.isNewUser);
        setAuthenticatedUser({
          id: confirmationResponse.user.uid,
          name: confirmationResponse.user.displayName,
          profileImageUrl: confirmationResponse.user.photoURL,
          lastSignInAt: confirmationResponse.user.metadata.creationTime
            ? new Date(confirmationResponse.user.metadata.creationTime)
            : new Date(),
          createdAt: confirmationResponse.user.metadata.lastSignInTime
            ? new Date(confirmationResponse.user.metadata.lastSignInTime)
            : new Date(),
          phoneNumber: confirmationResponse.user.phoneNumber,
        });
      }
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
    setAnimationIsLooping(false);
  };

  const startInfiniteAnimation = () => {
    setAnimationIsLooping(true);
    animationRef.current?.play(60, 110);
  };

  /**
   * When mount, start the finite animation.
   */
  React.useEffect(() => {
    startInfiniteAnimation();
  }, []);

  /**
   * Go to the previous screen if the user has tried
   * to confirm OTP 3 times.
   */
  React.useEffect(() => {
    if (otpConfirmationTimes >= 3) {
      navigation.goBack();
    }
  }, [otpConfirmationTimes, navigation]);

  /**
   * Listen to the userCredential state.
   * If it's filled, it means that the OTP was success,
   * then just wait until animation completes and navigate
   * to the next screen.
   */
  React.useEffect(() => {
    if (authenticatedUser && typeof userIsNew === 'boolean') {
      setTimeout(() => {
        if (userIsNew) {
          navigation.navigate('SignUp');
        } else {
          navigation.navigate('Home');
        }
      }, 1500);
    }
  }, [navigation, authenticatedUser, userIsNew]);

  return (
    <ScreenContainer>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TitleContainer>
          <Title variant="h1">
            Verify Your {'\n'} Phone number {animationHasFinished}
          </Title>
        </TitleContainer>
        <IllustrationContainer>
          <AnimationView
            source={require('../../animations/confirm.json')}
            ref={animationRef}
            loop={animationIsLooping}
            onAnimationFinish={() => setAnimationHasFinished(true)}
          />
        </IllustrationContainer>
        <DescriptionText>
          Please enter the OTP code we {'\n'} sent to you at{' '}
          {route.params.phone}
        </DescriptionText>
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
