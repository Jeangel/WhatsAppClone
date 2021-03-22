import * as React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/atoms/Text';
import { PublicStackParamList } from '../navigation/PublicStackNav';
import { Button } from '../components/atoms/Button';
import { OTPInput } from '../components/molecules/OTPInput';
import styled from 'styled-components';
import { Illustration } from '../components/atoms/Illustration';

type ChatScreenNavigationProp = StackNavigationProp<
  PublicStackParamList,
  'ConfirmOTP'
>;

interface ConfirmOTPProps {
  navigation: ChatScreenNavigationProp;
}

const Container = styled(KeyboardAvoidingView)`
  padding: 20px;
  height: 100%;
  align-items: center;
  justify-content: center;
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

export const ConfirmOTP = ({}: ConfirmOTPProps) => {
  const [code, setCode] = React.useState('');

  return (
    <SafeAreaView>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TitleContainer>
          <Title variant="h1">Verify Your {'\n'} Phone number</Title>
        </TitleContainer>
        <IllustrationContainer>
          <Illustration name="chatting" />
        </IllustrationContainer>
        <DescriptionText>Enter Your OTP code here</DescriptionText>
        <OTPInput value={code} onChange={setCode} />
        <SendOTPButton text="CONFIRM OTP CODE" />
      </Container>
    </SafeAreaView>
  );
};
