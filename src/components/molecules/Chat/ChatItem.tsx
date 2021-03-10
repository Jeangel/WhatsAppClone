import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { IChatItem } from '../../../app/Chat';
import { Text } from '../../atoms/Text';
import { ChatUserImage } from './ChatUserImage';
import { MessageStatus } from '../Message/MessageStatus';
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
  padding: 20px 5px 20px 0;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const ImageContainer = styled(View)`
  width: 25%;
`;

const MessageContainer = styled(View)`
  height: 100%;
  width: 55%;
`;

const ChatInfoContainer = styled(View)`
  width: 20%;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding-bottom: 15px;
`;

const ChatName = styled(Text)`
  padding-bottom: 5px;
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
        <ImageContainer>
          <ChatUserImage
            url={data.author.profileImageUrl}
            status={data.author.status}
          />
        </ImageContainer>
        <MessageContainer>
          <ChatName variant="h4" weight="600">
            {data.author.name}
          </ChatName>
          <Text color="neutral60" numberOfLines={2} ellipsizeMode="tail">
            {data.lastMessage.content}
          </Text>
        </MessageContainer>
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
