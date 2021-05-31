/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/core';
import useSpinner from '../../../hooks/useSpinner';
import { useAuthStore } from '../../../state/auth';
import { UserCard } from '../../../components/molecules/User/UserCard';
import { IUser } from '../../../app/User';
import useUsers from '../../../hooks/useUsers';

const Container = styled(View)`
  flex: 1;
`;

const Separator = styled(View)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ContactList = () => {
  const [contacts, setContacts] = useState<IUser[]>([]);
  const { getUserById, getUsersByIdIn } = useUsers();
  const { authenticatedUser } = useAuthStore();
  const { showSpinner, hideSpinner } = useSpinner();
  const navigation = useNavigation();

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

  const renderItem = ({ item }: ListRenderItemInfo<IUser>) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat', { chatId: item.id })}>
        <UserCard
          user={{
            id: item.id,
            status: '',
            name: item.name,
            profileImageUrl: item.profileImageUrl,
          }}
          description={'Last time online, yesterday.'}
        />
      </TouchableOpacity>
    );
  };

  const keyExtractor = (contact: IUser, index: number) =>
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
