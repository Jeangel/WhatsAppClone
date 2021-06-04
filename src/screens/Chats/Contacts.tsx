import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import styled from 'styled-components';
import { Header } from '../../components/molecules/Header';
import { ContactList } from '../../components/organisms/Contact/ContactList';
import { Icon } from '../../components/atoms/Icon';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ContactsHeader = (props: StackHeaderProps) => {
  return (
    <Header {...props} showBackButton removeBorders>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('AddContact');
        }}>
        <Icon name="add-people" size={35} color={'primary'} />
      </TouchableOpacity>
    </Header>
  );
};

/**
 * TODO: Refresh when screen state changes
 */
export const Contacts = () => {
  return (
    <Container>
      <ContactList />
    </Container>
  );
};
