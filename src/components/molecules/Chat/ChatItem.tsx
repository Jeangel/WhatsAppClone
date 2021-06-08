import * as React from 'react';
import { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { IChatItem } from '../../../app/Chat';
import { Text } from '../../atoms/Text';
import { MessageStatus } from '../Message/MessageStatus';
import { UserCard } from '../User/UserCard';
import { useUsersStore } from '../../../state/users';
import { useAuthStore } from '../../../state/auth';
import { useMessagesStore } from '../../../state/messages';
dayjs.extend(RelativeTime);

interface ChatItemProps {
  data: IChatItem;
  onPress: (chatId: string) => void;
}

const Container = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  border-bottom-color: ${({ theme }) => theme.colors.neutral80};
  border-bottom-width: 1px;
  padding: 20px 5px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const UserCardContainer = styled(View)`
  height: 100%;
  width: 75%;
`;

const ChatInfoContainer = styled(View)`
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding-bottom: 15px;
`;

const UnreadMessagesContainer = styled(View)<{ hide: boolean }>`
  height: 20px;
  width: 20px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  display: ${({ hide }) => (hide ? 'none' : 'flex')};
`;

const MessageStatusContainer = styled(View)`
  align-items: center;
  justify-content: center;
`;

const LastMessageTimeStamp = styled(Text)`
  text-transform: capitalize;
  text-align: center;
`;

const Content = styled(View)`
  flex-direction: row;
`;

export const ChatItem = ({ data, onPress }: ChatItemProps) => {
  const { authenticatedUser } = useAuthStore();
  const { members, chatId } = data;
  const notMeUserId = members.find((e) => e !== authenticatedUser.id);
  const notMeUser = useUsersStore(
    useCallback((state) => state.users.find((e) => e.id === notMeUserId), [
      notMeUserId,
    ]),
  );
  const lastChatMessage = useMessagesStore((state) =>
    state.getLastMessageFromChat(chatId),
  );
  const hasUnreadMessages = false;
  if (!notMeUser) {
    return <React.Fragment />;
  }
  const handleOnPress = () => {
    onPress(data.chatId);
  };
  return (
    <Container onPress={handleOnPress}>
      <Content>
        <UserCardContainer>
          <UserCard
            user={notMeUser}
            description={lastChatMessage?.text || ''}
          />
        </UserCardContainer>
        <ChatInfoContainer>
          {lastChatMessage && (
            <>
              <LastMessageTimeStamp color="neutral60" variant="small">
                {dayjs(lastChatMessage?.createdAt).fromNow()}
              </LastMessageTimeStamp>
              {hasUnreadMessages ? (
                <UnreadMessagesContainer hide={!hasUnreadMessages}>
                  <Text color="white" variant="small">
                    {1}
                  </Text>
                </UnreadMessagesContainer>
              ) : (
                <MessageStatusContainer>
                  <MessageStatus status={'sent'} />
                </MessageStatusContainer>
              )}
            </>
          )}
        </ChatInfoContainer>
      </Content>
    </Container>
  );
};
