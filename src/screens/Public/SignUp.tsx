import * as React from 'react';
import styled from 'styled-components';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { TextInput } from '../../components/atoms/TextInput';
import { Illustration } from '../../components/atoms/Illustration';
import { PublicStackParamList } from '../../navigation/PublicStackNav';
import { ScreenContainer } from '../../components/atoms/ScreenContainer';
import { ImagePicker } from '../../components/atoms/ImagePicker';

const Container = styled(KeyboardAvoidingView)`
  padding: 20px 0;
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

type SignUpScreenNavigationProp = StackNavigationProp<
  PublicStackParamList,
  'SignUp'
>;

interface SignUpProps {
  navigation: SignUpScreenNavigationProp;
}

export const SignUp = ({}: SignUpProps) => {
  return (
    <ScreenContainer>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
        <ImagePicker />
        <NameTextInput placeholder={'Enter your name'} />
      </Container>
    </ScreenContainer>
  );
};
