import * as React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import useSpinner from '../../hooks/useSpinner';
import { useAuthStore } from '../../state/auth';
import { usePushError } from '../../state/error';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { OTPInput } from '../../components/molecules/OTPInput';
import { PublicStackParamList } from '../../navigation/PublicStackNav';
import { ScreenContainer } from '../../components/atoms/ScreenContainer';
import auth from '@react-native-firebase/auth';
import useUsers from '../../hooks/useUsers';

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
  const [animationIsLooping, setAnimationIsLooping] = React.useState(true);
  const [otpConfirmationTimes, setOTPConfirmationTimes] = React.useState(0);
  const [animationHasFinished, setAnimationHasFinished] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const [userId, setUserId] = React.useState('');
  const { showSpinner, hideSpinner } = useSpinner();
  const { setAuthenticatedUser, authenticatedUser } = useAuthStore();
  const pushError = usePushError();
  const { getUserById, updateUser, getUserExists } = useUsers();
  const { phone, confirmation } = route.params;

  /**
   * Confirms the OTP code that comes from route parameters.
   */
  const confirmOTPCode = async () => {
    setIsFetching(true);
    try {
      showSpinner();
      const confirmationResponse = await confirmation.confirm(code);
      if (confirmationResponse) {
        setUserId(confirmationResponse.user.uid);
        await handleSuccessOTPConfirmation();
      }
    } catch (error) {
      pushError(error);
      setIsFetching(false);
      setOTPConfirmationTimes(otpConfirmationTimes + 1);
    } finally {
      hideSpinner();
    }
  };

  /**
   * Finish the animation and navigate to the given route
   */
  const successNavigate = React.useCallback(
    async (nextRoute: keyof PublicStackParamList) => {
      startFiniteAnimation();
      const user = await getUserById(userId);
      const timeout = setTimeout(() => {
        setAuthenticatedUser({
          id: userId,
          name: user.name,
          profileImageUrl: user.profileImageUrl,
          phoneNumber: phone,
          contacts: user.contacts,
          subscribedChats: [],
          createdAt: user.createdAt,
        });
        navigation.navigate(nextRoute);
      }, 1500);
      return () => clearTimeout(timeout);
    },
    [getUserById, navigation, phone, setAuthenticatedUser, userId],
  );

  const handleExistingUser = React.useCallback(async () => {
    try {
      const user = await getUserById(userId);
      // if the user exists in the app DB but doesn't have name
      // take them to the SignUp screen, otherwise to the Home.
      const nextScreen = !user.name ? 'SignUp' : 'Home';
      await successNavigate(nextScreen);
    } catch (error) {
      pushError(error);
      setIsAuthenticating(false);
    }
  }, [getUserById, userId, successNavigate, pushError]);

  const handleNewUser = React.useCallback(async () => {
    try {
      await updateUser(
        userId,
        { phoneNumber: phone, createdAt: new Date() },
        { createIfNotExists: true },
      );
      await successNavigate('SignUp');
    } catch (error) {
      pushError(error);
      setIsAuthenticating(false);
    }
  }, [updateUser, userId, phone, successNavigate, pushError]);

  const handleSuccessOTPConfirmation = React.useCallback(async () => {
    // Try to get the user from the app DB.
    if (!userId) {
      return Promise.resolve();
    }
    setIsAuthenticating(true);
    const userExists = await getUserExists(userId);
    // Check if the user is new in the auth DB or doesn't exist yet in the app DB.
    if (!userExists) {
      // if so, create it in the app DB.
      // At this point it was already created in the auth DB.
      await handleNewUser();
    } else {
      await handleExistingUser();
    }
  }, [getUserExists, handleExistingUser, handleNewUser, userId]);

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

  React.useEffect(() => {
    return auth().onAuthStateChanged((user) => {
      if (!isAuthenticating && !authenticatedUser.id) {
        if (user) {
          if (!userId) {
            setUserId(user.uid);
          }
        }
      }
    });
  }, [isAuthenticating, navigation, authenticatedUser, userId]);

  React.useEffect(() => {
    if (userId && !isAuthenticating) {
      handleSuccessOTPConfirmation();
    }
  }, [userId, handleSuccessOTPConfirmation, isAuthenticating]);

  return (
    <ScreenContainer>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
        <OTPInput value={code} onChange={setCode} disabled={isAuthenticating} />
        <ConfirmOTPCode
          text="CONFIRM OTP CODE"
          onPress={confirmOTPCode}
          disabled={code.length < 6 || isFetching || isAuthenticating}
        />
        <DescriptionText variant="small">
          Didn't you receive any code?
        </DescriptionText>
        <ResendOTPCode
          text="RESEND NEW CODE"
          variant="transparent"
          disabled={
            isFetching || otpConfirmationTimes === 0 || isAuthenticating
          }
          onPress={navigation.goBack}
        />
      </Container>
    </ScreenContainer>
  );
};
