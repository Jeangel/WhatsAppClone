/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import useSpinner from '../../../hooks/useSpinner';
import { useAuthStore } from '../../../state/auth';
import { UserCard } from '../../../components/molecules/User/UserCard';
import { IUser } from '../../../app/User';
import useUsersRequests from '../../../hooks/useUsersRequests';
import { useOpenChat } from '../../../hooks/useOpenChat';
import { createOneToOneChatId } from '../../../util';
import { useIsFocused } from '@react-navigation/core';
import { Illustration } from '../../atoms/Illustration';
import { Text } from '../../atoms/Text';
import { EColor } from '../../../theme';

const Container = styled(View)`
  flex: 1;
`;

const Separator = styled(View)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const EmptyViewContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const EmptyViewTitle = styled(Text)`
  margin-bottom: 50px;
`;

export const ContactList = () => {
  const [contacts, setContacts] = useState<IUser[]>([]);
  const isFocused = useIsFocused();
  const { getUserById, getUsersByIdIn } = useUsersRequests();
  const { authenticatedUser } = useAuthStore();
  const { showSpinner, hideSpinner } = useSpinner();
  const openChat = useOpenChat();

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
    const membersIds = [contactId, authenticatedUser.id];
    const chatId = createOneToOneChatId(membersIds);
    await openChat({ chatId, membersIds });
  };

  useEffect(() => {
    if (isFocused) {
      getContacts();
    }
  }, [isFocused]);

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

  const contentContainerStyle = contacts.length ? {} : { flex: 1 };

  return (
    <Container>
      <FlatList
        data={contacts}
        contentContainerStyle={contentContainerStyle}
        ListEmptyComponent={
          <EmptyViewContainer>
            <EmptyViewTitle variant="h2" color={EColor.neutral40}>
              You don't have any contacts yet.
            </EmptyViewTitle>
            <Illustration name="no-contacts" />
          </EmptyViewContainer>
        }
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Separator}
      />
    </Container>
  );
};
