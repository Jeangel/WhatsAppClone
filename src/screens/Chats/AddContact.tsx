import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import styled from 'styled-components';
import { Button } from '../../components/atoms/Button';
import { Illustration } from '../../components/atoms/Illustration';
import { ScreenContainer } from '../../components/atoms/ScreenContainer';
import { Text } from '../../components/atoms/Text';
import { TextInput } from '../../components/atoms/TextInput';
import { CellphoneInput } from '../../components/molecules/CellphoneInput';
import { Header } from '../../components/molecules/Header';

const Container = styled(KeyboardAvoidingView)`
  height: 100%;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Section = styled(View)`
  align-items: center;
  justify-content: center;
`;

const NameInput = styled(TextInput)`
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
`;

const Title = styled(Text)`
  text-align: center;
  padding-bottom: 30px;
`;

const Form = styled(View)`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  padding: 50px;
`;

const AddButton = styled(Button)`
  min-width: 100%;
  margin-top: 20px;
`;

export const AddContactHeader = (props: StackHeaderProps) => {
  return <Header {...props} showBackButton removeBorders />;
};
export const AddContact = () => {
  const [country, setCountry] = React.useState({
    code: 'CO',
    callingCode: '57',
  });
  const [phone, setPhone] = React.useState('');
  return (
    <ScreenContainer edges={['bottom']}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Section>
          <Title variant="h1">Adding new Contact</Title>
          <Illustration name="add_contact" />
        </Section>
        <Form>
          <NameInput
            placeholder="Contact Name"
            numberOfLines={1}
            maxLength={30}
          />
          <CellphoneInput
            onChangeCountry={setCountry}
            country={country}
            onChangePhone={setPhone}
            phone={phone}
            placeholder="Contact Phone"
          />
          <AddButton text="Add Contact" />
        </Form>
      </Container>
    </ScreenContainer>
  );
};
