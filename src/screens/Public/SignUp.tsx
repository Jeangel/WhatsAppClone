import * as React from 'react';
import styled from 'styled-components';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { TextInput } from '../../components/atoms/TextInput';
import { Illustration } from '../../components/atoms/Illustration';
import { PublicStackParamList } from '../../navigation/PublicStackNav';
import { ScreenContainer } from '../../components/atoms/ScreenContainer';
import { ProfileImageUploader } from '../../components/molecules/ProfileImageUploader';
import { useAuthStore } from '../../state/auth';
import { useDBUser } from '../../hooks';
import useSpinner from '../../hooks/useSpinner';
import { usePushError } from '../../state/error';

const Container = styled(KeyboardAvoidingView)`
  padding: 20px;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const IllustrationContainer = styled(View)`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const TitleContainer = styled(View)``;

const DescriptionText = styled(Text)`
  padding-bottom: 10px;
  padding-top: 10px;
  width: 80%;
  text-align: center;
`;

const Title = styled(Text)`
  text-align: center;
  padding-bottom: 5px;
  padding-top: 20px;
`;

const NameTextInput = styled(TextInput)`
  width: 80%;
  margin-top: 20px;
`;

const Label = styled(DescriptionText)`
  font-weight: 500;
`;

const StyledButton = styled(Button)`
  margin-top: 25px;
  width: 90%;
  align-self: center;
`;

type SignUpScreenNavigationProp = StackNavigationProp<
  PublicStackParamList,
  'SignUp'
>;

interface SignUpProps {
  navigation: SignUpScreenNavigationProp;
}

export const SignUp = ({ navigation }: SignUpProps) => {
  const [name, setName] = React.useState('');
  const [profileImageUrl, setProfileImageUrl] = React.useState('');
  const [wasImageUploaded, setWasImageUploaded] = React.useState(false);
  const { authenticatedUser, updateAuthenticatedUser } = useAuthStore();
  const user = useDBUser(authenticatedUser?.id as string);
  const pushError = usePushError();
  const { showSpinner, hideSpinner } = useSpinner();

  const onCompleteImageUpload = (downloadUrl: string) => {
    setProfileImageUrl(downloadUrl);
    setWasImageUploaded(true);
  };

  const onCompleteSignUp = () => {
    showSpinner();
    user
      .update({
        name,
        profileImageUrl,
      })
      .then(goHome)
      .catch(pushError)
      .finally(hideSpinner);
  };

  const goHome = () => {
    updateAuthenticatedUser({
      name,
      profileImageUrl,
    });
    navigation.navigate('Home');
  };

  return (
    <ScreenContainer edges={['bottom']}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <TitleContainer>
              <Title variant="h1">One step away</Title>
            </TitleContainer>
            <IllustrationContainer>
              <Illustration name="take_photo" />
            </IllustrationContainer>
            <DescriptionText>
              We're almost there, to complete your profile, enter a few details
              about you.
            </DescriptionText>
            <Label>Add a profile Image</Label>
            <ProfileImageUploader
              imageId={authenticatedUser?.id as string}
              onStart={() => setWasImageUploaded(false)}
              onComplete={onCompleteImageUpload}
            />
            <NameTextInput
              placeholder={'Enter your name'}
              value={name}
              onChangeText={setName}
            />
            <StyledButton
              text="Complete"
              onPress={onCompleteSignUp}
              disabled={!wasImageUploaded || !name}
            />
          </>
        </TouchableWithoutFeedback>
      </Container>
    </ScreenContainer>
  );
};
