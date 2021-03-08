import * as React from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components';
import { IChatItem } from '../../app/Chat';
import { ChatItem } from '../molecules/Chat/ChatItem';

const Container = styled(View)`
  flex: 1;
`;

export const ChatList = () => {
  const dummyData: IChatItem[] = [
    {
      id: '4',
      author: {
        id: '1-Jade',
        profileImageUrl:
          'https://images.unsplash.com/photo-1484588168347-9d835bb09939?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        name: 'Jade Doe',
        status: 'online',
      },
      lastMessage: {
        id: '2.1',
        author: '1-Jade',
        sentAt: '2021-03-08T22:50:25Z',
        sentTo: [],
        viewedBy: [],
        content: "Hey!! Text me when you're back at home 🙂",
        type: 'text',
      },
      unreadMessages: 2,
    },
    {
      id: '2',
      author: {
        id: '1-Jack',
        profileImageUrl:
          'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80',
        name: 'Jack Doe',
        status: 'away',
      },
      lastMessage: {
        id: '2.1',
        author: '1-Jack',
        sentAt: '2021-03-07T17:50:25Z',
        sentTo: [],
        viewedBy: [],
        content: "Hey!! Text me when you're back at home 🙂",
        type: 'text',
      },
      unreadMessages: 3,
    },
    {
      id: '1',
      author: {
        id: '1-Jane',
        profileImageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        name: 'Jane Doe',
        status: 'offline',
      },
      lastMessage: {
        id: '1.1',
        author: '1-Jane',
        sentAt: '2021-03-01T19:46:25Z',
        sentTo: [],
        viewedBy: [],
        content: "Bro, they're fire 🔥🔥🔥",
        type: 'text',
      },
      unreadMessages: 0,
    },
    {
      id: '3',
      author: {
        id: '1-Mary',
        profileImageUrl:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        name: 'Jul Doe',
        status: 'online',
      },
      lastMessage: {
        id: '3.1',
        author: '1-Mary',
        sentAt: '2021-02-01T09:00:25Z',
        sentTo: [],
        viewedBy: [],
        content:
          'The majestic Rocky Mountains are a major tourist location in that place',
        type: 'text',
      },
      unreadMessages: 0,
    },
  ];

  return (
    <Container>
      <FlatList
        data={dummyData}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ChatItem data={item} />}
      />
    </Container>
  );
};
