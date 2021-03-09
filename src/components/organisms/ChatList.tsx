import * as React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components';
import { ChatItem } from '../molecules/Chat/ChatItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Icon } from '../atoms/Icon';
import { dummyData } from './data';

const Container = styled(View)`
  flex: 1;
`;

const ItemContainer = styled(TouchableOpacity)`
  background-color: white;
`;

const RemoveItemButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`;

const RemoveItemContainer = styled(Animated.View)`
  flex: 1;
  width: 18%;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const RemoveItem = ({
  id,
  swipeAnimatedValue,
  onPress,
}: {
  id: string;
  swipeAnimatedValue?: Animated.Value;
  onPress: (id: string) => void;
}) => {
  const opacityAnimation = swipeAnimatedValue?.interpolate({
    inputRange: [0, 75],
    outputRange: [0, 1],
  });

  const handleOnPress = () => {
    if (typeof onPress === 'function') {
      onPress(id);
    }
  };

  return (
    <RemoveItemContainer
      style={{
        opacity: opacityAnimation,
      }}>
      <RemoveItemButton onPress={handleOnPress}>
        <Icon name="archive" size={30} color={'white'} />
      </RemoveItemButton>
    </RemoveItemContainer>
  );
};

export const ChatList = () => {
  const opacity = React.useRef(new Animated.Value(1)).current;
  opacity.interpolate({ inputRange: [0, 75], outputRange: [0, 1] });

  const onRemove = () => {};

  return (
    <Container>
      <SwipeListView
        data={dummyData}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <ItemContainer>
            <ChatItem data={item} />
          </ItemContainer>
        )}
        leftOpenValue={75}
        renderHiddenItem={({ item }) => (
          <RemoveItem id={item.id} onPress={onRemove} />
        )}
      />
    </Container>
  );
};
