import * as React from 'react';
import { Text } from '../components/atoms/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';
import { View } from 'react-native';
import { Illustration } from '../components/atoms/Illustration';
import { Button } from '../components/atoms/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { PublicStackParamList } from '../navigation/PublicStackNav';

const Container = styled(View)`
  padding: 20px;
  height: 100%;
  align-items: center;
`;

const Section = styled(View)`
  height: 80%;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`;

const WelcomeMessage = styled(Text)`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 25px;
`;

const StyledButton = styled(Button)`
  width: 90%;
  align-self: center;
`;

type LandingScreenNavigationProps = StackNavigationProp<
  PublicStackParamList,
  'Landing'
>;

interface LandingProps {
  navigation: LandingScreenNavigationProps;
}

export const Landing = ({ navigation }: LandingProps) => {
  const onLetsDoIt = () => {
    navigation.navigate('ConfirmPhone');
  };
  return (
    <SafeAreaView>
      <Container>
        <Section>
          <Illustration name="welcome" />
        </Section>
        <WelcomeMessage>
          Welcome to the most amazing chat app ever! {'\n'}
          Let's create an account to start chatting 😎
        </WelcomeMessage>
        <StyledButton text="Let's do it!" onPress={onLetsDoIt} />
      </Container>
    </SafeAreaView>
  );
};
