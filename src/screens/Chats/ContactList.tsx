/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import styled from 'styled-components';
import firestore from '@react-native-firebase/firestore';
import { Contact } from '../../app/Contact';
import { Header } from '../../components/molecules/Header';
import { useSpinner, useUsersCollection } from '../../hooks';
import { useAuthStore } from '../../state/auth';
import { UserCard } from '../../components/molecules/User/UserCard';
import { UserDB } from '../../app/User';

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
  /**
   * TODO: Create a hook that provides functions to query users collection
   * easily...
   * This can contain, getById, getByPhoneNumber
   */
  const usersCollection = useUsersCollection();
  const { authenticatedUser } = useAuthStore();
  const { showSpinner, hideSpinner } = useSpinner();

  const getContacts = useCallback(async () => {
    showSpinner();
    const result = await usersCollection.doc(authenticatedUser.id).get();
    const authUserContacts: Contact[] = result.data()?.contacts || [];
    if (authUserContacts.length) {
      const contactsId = authUserContacts.map((e) => e.id);
      const contactsUsersResult = await usersCollection
        .where(firestore.FieldPath.documentId(), 'in', contactsId)
        .get();
      const users: UserDB[] = contactsUsersResult.docs.map((e) => ({
        ...(e.data() as UserDB),
        id: e.id,
      }));
      console.log(contactsUsersResult.docs);
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
