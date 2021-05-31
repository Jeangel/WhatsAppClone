import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { AddStoryButton } from '../molecules/UserStories/AddStoryButton';

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 10,
  },
  separator: {
    padding: 10,
  },
  listHeaderComponent: {
    paddingLeft: 10,
    paddingRight: 20,
  },
});

const ListHeaderComponent = () => (
  <View style={styles.listHeaderComponent}>
    <AddStoryButton />
  </View>
);

const Separator = () => <View style={styles.separator} />;

export const StoriesList = () => {
  // const dummyData = [
  //   {
  //     user: {
  //       id: '1-Jane',
  //       profileImageUrl:
  //         'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
  //       name: 'Jane',
  //     },
  //     uploadedStoryAmount: 1,
  //   },
  // ];
  return (
    <View>
      <FlatList
        data={[]}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={({ user }) => user}
        renderItem={({}) => (
          // <UserStoryItem
          //   user={item.user}
          //   uploadedStoryAmount={item.uploadedStoryAmount}
          // />
          <></>
        )}
      />
    </View>
  );
};
