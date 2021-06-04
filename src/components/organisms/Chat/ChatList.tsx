/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components';
import { ChatItem } from '../../molecules/Chat/ChatItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Icon } from '../../atoms/Icon';
import { Illustration } from '../../atoms/Illustration';
import { Text } from '../../atoms/Text';
import { EColor } from '../../../theme';
import useChats from '../../../hooks/useChats';
import { useAuthStore } from '../../../state/auth';
import { IChatItem } from '../../../app/Chat';
import { usePushError } from '../../../state/error';

const Container = styled(View)`
  flex: 1;
`;

const EmptyViewContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
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

const EmptyViewTitle = styled(Text)`
  margin-bottom: 50px;
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

interface ChatListProps {
  onChatPress: (chatId: string) => void;
  onChatRemove: (chatId: string) => void;
}

export const ChatList = ({ onChatPress, onChatRemove }: ChatListProps) => {
  const [chats, setChats] = React.useState<IChatItem[]>([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const { getUserChats } = useChats();
  const { authenticatedUser } = useAuthStore();
  const pushError = usePushError();
  const refreshChats = async () => {
    try {
      setIsRefreshing(true);
      setChats(await getUserChats(authenticatedUser.id));
    } catch (error) {
      pushError(error);
    }
    setIsRefreshing(false);
  };
  React.useEffect(() => {
    refreshChats();
  }, [authenticatedUser]);
  const opacity = React.useRef(new Animated.Value(1)).current;
  opacity.interpolate({ inputRange: [0, 75], outputRange: [0, 1] });
  const contentContainerStyle = { flex: 1 };

  return (
    <Container>
      <SwipeListView
        data={chats}
        onRefresh={refreshChats}
        refreshing={isRefreshing}
        contentContainerStyle={contentContainerStyle}
        ListEmptyComponent={
          <EmptyViewContainer>
            <EmptyViewTitle variant="h2" color={EColor.neutral40}>
              You don't have any chats yet.
            </EmptyViewTitle>
            <Illustration name="no-chats" />
          </EmptyViewContainer>
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <ChatItem data={item} onPress={onChatPress} />
        )}
        leftOpenValue={75}
        renderHiddenItem={({}) => <RemoveItem id={''} onPress={onChatRemove} />}
      />
    </Container>
  );
};
