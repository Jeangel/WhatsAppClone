import React from 'react';
import { View } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import styled from 'styled-components';
import { Header } from '../../components/molecules/Header';
import { ContactList } from '../../components/organisms/Contact/ContactList';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ContactsHeader = (props: StackHeaderProps) => {
  return <Header {...props} showBackButton removeBorders />;
};

export const Contacts = () => {
  return (
    <Container>
      <ContactList />
    </Container>
  );
};
