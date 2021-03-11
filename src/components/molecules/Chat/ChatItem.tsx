import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { IChatItem } from '../../../app/Chat';
import { Text } from '../../atoms/Text';
import { MessageStatus } from '../Message/MessageStatus';
import { UserInfo } from '../User/UserInfo';
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

const UserInfoContainer = styled(View)`
  height: 100%;
  width: 80%;
`;

const ChatInfoContainer = styled(View)`
  width: 20%;
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
`;

const Content = styled(View)`
  flex-direction: row;
`;

export const ChatItem = ({ data, onPress }: ChatItemProps) => {
  const hasUnreadMessages = data.unreadMessages > 0;
  const shouldShowUnreadMessages = data.lastMessage.author === data.author.id;
  const handleOnPress = () => {
    onPress(data.id);
  };
  return (
    <Container onPress={handleOnPress}>
      <Content>
        <UserInfoContainer>
          <UserInfo user={data.author} description={data.lastMessage.content} />
        </UserInfoContainer>
        <ChatInfoContainer>
          <LastMessageTimeStamp color="neutral60" variant="small">
            {dayjs(data.lastMessage.sentAt).fromNow()}
          </LastMessageTimeStamp>
          {shouldShowUnreadMessages ? (
            <UnreadMessagesContainer hide={!hasUnreadMessages}>
              <Text color="white" variant="small">
                {data.unreadMessages}
              </Text>
            </UnreadMessagesContainer>
          ) : (
            <MessageStatusContainer>
              <MessageStatus status={data.lastMessage.status} />
            </MessageStatusContainer>
          )}
        </ChatInfoContainer>
      </Content>
    </Container>
  );
};
