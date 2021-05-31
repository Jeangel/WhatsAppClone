/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import styled from 'styled-components';
import { Header } from '../../components/molecules/Header';
import useSpinner from '../../hooks/useSpinner';
import { useAuthStore } from '../../state/auth';
import { UserCard } from '../../components/molecules/User/UserCard';
import { UserDB } from '../../app/User';
import useUsers from '../../hooks/useUsers';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Separator = styled(View)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ContactListHeader = (props: StackHeaderProps) => {
  return <Header {...props} showBackButton removeBorders />;
};

export const ContactList = () => {
  const [contacts, setContacts] = useState<UserDB[]>([]);
  const { getUserById, getUsersByIdIn } = useUsers();
  const { authenticatedUser } = useAuthStore();
  const { showSpinner, hideSpinner } = useSpinner();

  const getContacts = useCallback(async () => {
    showSpinner();
    const user = await getUserById(authenticatedUser.id);
    const authUserContacts = user.contacts || [];
    if (authUserContacts.length) {
      const contactsId = authUserContacts.map((e) => e.id);
      const users = await getUsersByIdIn(contactsId);
      setContacts(users);
    }
    hideSpinner();
  }, [authenticatedUser.id]);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const renderItem = ({ item }: ListRenderItemInfo<UserDB>) => {
    return (
      <View>
        <UserCard
          user={{
            id: item.id,
            status: '',
            name: item.name,
            profileImageUrl: item.profileImageUrl,
          }}
          description={'Last time online, yesterday.'}
        />
      </View>
    );
  };

  const keyExtractor = (contact: UserDB, index: number) =>
    `contact-${contact.id}-${index}`;

  return (
    <Container>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Separator}
      />
    </Container>
  );
};
