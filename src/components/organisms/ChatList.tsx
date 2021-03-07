import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Chat, IChatItem } from '../../app/Chat';
import { ChatItem } from '../molecules/Chat/ChatItem';

const styles = StyleSheet.create({});

export const ChatList = () => {
  const dummyData: IChatItem[] = [
    {
      id: '1',
      author: {
        id: '1-Jane',
        profileImageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        name: 'Jane',
        status: 'online',
      },
      lastMessage: {
        id: '1.1',
        author: '1-Jane',
        sentAt: '2021-03-07T19:46:25Z',
        sentTo: [],
        viewedBy: [],
        content: "Bro, they're fire 🔥🔥🔥",
        type: 'text',
      },
    },
    {
      id: '2',
      author: {
        id: '1-Jack',
        profileImageUrl:
          'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80',
        name: 'Jack',
        status: 'away',
      },
      lastMessage: {
        id: '2.1',
        author: '1-Jack',
        sentAt: '2021-03-05T17:50:25Z',
        sentTo: [],
        viewedBy: [],
        content: "Hey!! Text me when you're back at home 🙂",
        type: 'text',
      },
    },
    {
      id: '3',
      author: {
        id: '1-Mary',
        profileImageUrl:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        name: 'Jul',
        status: 'active',
      },
      lastMessage: {
        id: '3.1',
        author: '1-Mary',
        sentAt: '2021-02-28T09:00:25Z',
        sentTo: [],
        viewedBy: [],
        content:
          'The majestic Rocky Mountains are a major tourist location in that place',
        type: 'text',
      },
    },
    {
      id: '4',
      author: {
        id: '1-Jade',
        profileImageUrl:
          'https://images.unsplash.com/photo-1484588168347-9d835bb09939?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        name: 'Jade',
        status: 'offline',
      },
      lastMessage: {
        id: '2.1',
        author: '1-Jade',
        sentAt: '2021-03-05T17:50:25Z',
        sentTo: [],
        viewedBy: [],
        content: "Hey!! Text me when you're back at home 🙂",
        type: 'text',
      },
    },
  ];

  return (
    <View>
      <FlatList
        data={dummyData}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ChatItem data={item} />}
      />
    </View>
  );
};
