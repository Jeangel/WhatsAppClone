import * as React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { Text } from '../../components/atoms/Text';
import { PublicStackParamList } from '../../navigation/PublicStackNav';
import { Button } from '../../components/atoms/Button';
import styled from 'styled-components';
import { Illustration } from '../../components/atoms/Illustration';
import { CellphoneInput } from '../../components/molecules/CellphoneInput';
import { ScreenContainer } from '../../components/atoms/ScreenContainer';
import { useCountdown, useSpinner } from '../../hooks';
import { usePushError } from '../../state/error';
import dayjs, { OpUnitType } from 'dayjs';
import { EColor } from '../../theme';

const Container = styled(KeyboardAvoidingView)`
  padding: 20px;
  height: 100%;
  align-items: center;
  justify-content: center;
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

const SendOTPButton = styled(Button)`
  margin-top: 40px;
  align-self: center;
  width: 100%;
`;

const Countdown = styled(Text)`
  padding-top: 10px;
`;

type ConfirmPhoneScreenNavigationProp = StackNavigationProp<
  PublicStackParamList,
  'ConfirmPhone'
>;

interface ConfirmPhoneProps {
  navigation: ConfirmPhoneScreenNavigationProp;
}

export const ConfirmPhone = ({ navigation }: ConfirmPhoneProps) => {
  const [country, setCountry] = React.useState({
    code: 'CO',
    callingCode: '57',
  });
  const [phone, setPhone] = React.useState('');
  const [countdown, setCountdown] = React.useState('');
  const pushError = usePushError();
  const { showSpinner, hideSpinner } = useSpinner();
  const countdownSettings: { time: number; unit: OpUnitType } = __DEV__
    ? { time: 30, unit: 'seconds' }
    : { time: 10, unit: 'minutes' };
  const countDownEnd = dayjs()
    .add(countdownSettings.time, countdownSettings.unit)
    .toString();
  const { start: startCountdown, stop: stopCountdown } = useCountdown({
    id: 'OTP',
    persist: true,
    getEndDateTime: () => countDownEnd,
    onTick: ({ minutes, seconds }) => {
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
      setCountdown(`${minutes}:${formattedSeconds}`);
    },
    onFinish: async () => {
      await stopCountdown();
      setCountdown('');
    },
  });

  const signInWithPhoneNumber = async () => {
    const formattedPhone = `+${country.callingCode} ${phone}`;
    try {
      showSpinner();
      const confirmation = await auth().signInWithPhoneNumber(formattedPhone);
      navigation.navigate('ConfirmOTP', {
        confirmation,
        phone: formattedPhone,
      });
      await startCountdown();
    } catch (error) {
      pushError(error.message);
    } finally {
      hideSpinner();
    }
  };

  return (
    <ScreenContainer>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TitleContainer>
          <Title variant="h1">
            Sign up to start chatting with your friends!
          </Title>
        </TitleContainer>
        <DescriptionText>
          Add your phone number. We'll send you a{'\n'} verification code so we
          know you're real.
        </DescriptionText>
        <IllustrationContainer>
          <Illustration name="send_letter" />
        </IllustrationContainer>
        <CellphoneInput
          onChangeCountry={setCountry}
          country={country}
          phone={phone}
          onChangePhone={setPhone}
        />
        <SendOTPButton
          text="SEND OTP CODE"
          disabled={phone.length < 10 || !!countdown}
          onPress={signInWithPhoneNumber}
        />
        {!!countdown && (
          <Countdown variant="small" color={EColor.neutral60}>
            {countdown} left to allow code resend
          </Countdown>
        )}
      </Container>
    </ScreenContainer>
  );
};
