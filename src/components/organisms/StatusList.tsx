import * as React from 'react';
import { View, FlatList } from 'react-native';
import { StatusItem } from '../molecules/StatusItem';

export const StatusList = () => {
  const dummyData = [
    {
      user: {
        id: '1-Jane',
        profileImageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        name: 'Jane',
      },
      uploadedStatusAmount: 1,
    },
    {
      user: {
        id: '1-Jack',
        profileImageUrl:
          'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80',
        name: 'Jack',
      },
      uploadedStatusAmount: 2,
    },
    {
      user: {
        id: '1-Mary',
        profileImageUrl:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        name: 'Mary',
      },
      uploadedStatusAmount: 1,
    },
    {
      user: {
        id: '1-Jon',
        profileImageUrl:
          'https://images.unsplash.com/photo-1463453091185-61582044d556?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        name: 'Jon',
      },
      uploadedStatusAmount: 3,
    },
    {
      user: {
        id: '1-Jade',
        profileImageUrl:
          'https://images.unsplash.com/photo-1484588168347-9d835bb09939?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        name: 'Jade',
      },
      uploadedStatusAmount: 4,
    },
    {
      user: {
        id: '1-Jax',
        profileImageUrl:
          'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80',
        name: 'Jax',
      },
      uploadedStatusAmount: 1,
    },
    {
      user: {
        id: '1-Jill',
        profileImageUrl:
          'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        name: 'Jill',
      },
      uploadedStatusAmount: 2,
    },
    {
      user: {
        id: '1-Jan',
        profileImageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        name: 'Jan',
      },
      uploadedStatusAmount: 1,
    },
  ];
  return (
    <View>
      <FlatList
        data={dummyData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <StatusItem
            key={item.user.id}
            user={item.user}
            uploadedStatusAmount={item.uploadedStatusAmount}
          />
        )}
      />
    </View>
  );
};
