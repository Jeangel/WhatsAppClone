import * as React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from '../../components/atoms/Text';
import { PublicStackParamList } from '../../navigation/PublicStackNav';
import styled from 'styled-components';
import { ScreenContainer } from '../../components/atoms/ScreenContainer';

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
          <Title variant="h1">Sign up</Title>
        </TitleContainer>
        <DescriptionText>
          Add your phone number. We'll send you a{'\n'} verification code so we
          know you're real.
        </DescriptionText>
      </Container>
    </ScreenContainer>
  );
};
