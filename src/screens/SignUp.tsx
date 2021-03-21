import * as React from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/atoms/Text';
import { PublicStackParamList } from '../navigation/PublicStackNav';
import { Button } from '../components/atoms/Button';
import { OTPInput } from '../components/molecules/OTPInput';
import styled from 'styled-components';
import { Illustration } from '../components/atoms/Illustration';
import { CellphoneInput } from '../components/molecules/CellphoneInput';

type ChatScreenNavigationProp = StackNavigationProp<
  PublicStackParamList,
  'SignUp'
>;

interface SignUpProps {
  navigation: ChatScreenNavigationProp;
}

const PhoneSignIn = () => {
  // If null, no SMS has been sent
  const [
    confirm,
    setConfirm,
  ] = React.useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const [code, setCode] = React.useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: string) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log('asd;asdkj', error);
    }
  }

  async function confirmCode() {
    try {
      const asd = await confirm?.confirm(code);
      console.log(asd);
    } catch (error) {
      console.log('Invalid code.', error);
    }
  }

  if (confirm) {
    return (
      <Button
        text="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+57 3104445909')}
      />
    );
  }

  return (
    <>
      <OTPInput value={code} onChange={setCode} />
      <Button text="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
};

const Container = styled(View)`
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
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Title = styled(Text)`
  text-align: center;
  margin-bottom: 10px;
`;

const IllustrationContainer = styled(View)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const SignUp = ({}: SignUpProps) => {
  const [country, setCountry] = React.useState({
    code: 'CO',
    callingCode: '57',
  });
  const [phone, setPhone] = React.useState('');

  return (
    <SafeAreaView>
      <Container>
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
      </Container>
    </SafeAreaView>
  );
};
