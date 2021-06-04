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
import { createOneToOneChatId } from '../../../util';
import useChats from '../../../hooks/useChats';
import { usePushError } from '../../../state/error';

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
  const { getChatMembers, setChatMembers } = useChats();
  const { authenticatedUser } = useAuthStore();
  const { showSpinner, hideSpinner } = useSpinner();
  const pushError = usePushError();
  const navigation = useNavigation();

  const getContacts = useCallback(async () => {
    showSpinner();
    const user = await getUserById(authenticatedUser.id);
    const authUserContacts = user.contacts || [];
    if (authUserContacts.length) {
      const contactsId = authUserContacts.map((e) => e.id);
      const users = await getUsersByIdIn(contactsId);
      const formattedUsers = users.map((e) => {
        const contact = authUserContacts.find((c) => c.id === e.id);
        return { ...e, name: contact?.alias || e.name };
      });
      setContacts(formattedUsers);
    }
    hideSpinner();
  }, [authenticatedUser.id]);

  const onItemPress = async (contactId: string) => {
    const chatId = createOneToOneChatId([contactId, authenticatedUser.id]);
    const members = await getChatMembers(chatId);
    if (members.length) {
      navigation.navigate('Chat', { chatId });
    }

    try {
      await setChatMembers({
        members: [contactId, authenticatedUser.id],
        chatId,
      });
      navigation.navigate('Chat', { chatId });
    } catch (error) {
      pushError(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const renderItem = ({ item }: ListRenderItemInfo<IUser>) => {
    return (
      <TouchableOpacity onPress={() => onItemPress(item.id)}>
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
