import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StackHeaderProps, StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components';
import { Header } from '../../components/molecules/Header';
import { ChatStackParamList } from '../../navigation/ChatsStackNav';
import { UserCard } from '../../components/molecules/User/UserCard';
import { capitalize } from '../../util';
import { Icon } from '../../components/atoms/Icon';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { ChatMessageBar } from '../../components/organisms/Chat/ChatMessageBar';
import { MessageBubble } from '../../components/organisms/Chat/MessageBubble';
import { usePubNub } from 'pubnub-react';
import { useAuthStore } from '../../state/auth';
import { RouteProp } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer } from '../../components/atoms/ScreenContainer';
import { useChatMessagesStore } from '../../state/chatMessages';
import { useChatsStore } from '../../state/chats';
import { useUsersStore } from '../../state/users';

type ChatScreenNavigationProp = StackNavigationProp<ChatStackParamList, 'Chat'>;

const IconsContainer = styled(View)`
  flex-direction: row;
  padding-left: 10px;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;

const UserStatusContainer = styled(View)`
  flex: 3;
`;

const IconContainer = styled(TouchableOpacity)`
  padding-right: 10px;
  padding-left: 10px;
`;

export const ChatHeader = (props: StackHeaderProps) => {
  const authenticatedUser = useAuthStore((e) => e.authenticatedUser);
  const currentChat = useChatsStore((store) => store.currentChat);
  const notMeUser = useUsersStore((store) =>
    store.users.find(
      (e) =>
        currentChat?.members.includes(e.id) && e.id !== authenticatedUser.id,
    ),
  );
  return (
    <Header {...props} showBackButton>
      {notMeUser ? (
        <UserStatusContainer>
          <UserCard
            user={notMeUser}
            description={capitalize(
              notMeUser.status === 'online' ? 'online' : '',
            )}
            size={40}
          />
        </UserStatusContainer>
      ) : null}
      <IconsContainer>
        <IconContainer>
          <Icon name="phone" size={25} color={'primary'} />
        </IconContainer>
        <IconContainer>
          <Icon name="vide-camera" size={30} color={'primary'} />
        </IconContainer>
      </IconsContainer>
    </Header>
  );
};
interface ChatProps {
  navigation: ChatScreenNavigationProp;
  route: RouteProp<ChatStackParamList, 'Chat'>;
}

export const Chat = ({ route }: ChatProps) => {
  const pubnub = usePubNub();

  const { authenticatedUser } = useAuthStore();
  const { bottom } = useSafeAreaInsets();
  const chatId = route.params.chatId;
  const messages = useChatMessagesStore((state) =>
    state
      .getMessagesForChat({ chatId })
      .map((e) => ({ ...e, createdAt: new Date(e.createdAt) })),
  );

  const handleOnSend = async (newMessages: IMessage[]) => {
    const newMessage = newMessages[0];
    try {
      console.log('Chat screen', newMessage);
      await pubnub.publish({
        channel: chatId,
        message: { text: newMessage.text, author: newMessage.user._id },
      });
    } catch (error) {
      console.log('error sending message', error);
    }
  };
  return (
    <ScreenContainer edges={['bottom']}>
      <GiftedChat
        user={{ _id: authenticatedUser.id }}
        renderInputToolbar={(props) => <ChatMessageBar {...props} />}
        renderBubble={(props) => <MessageBubble {...props} />}
        minInputToolbarHeight={60}
        onSend={handleOnSend}
        bottomOffset={bottom}
        messages={messages}
        showUserAvatar={false}
        inverted={false}
      />
    </ScreenContainer>
  );
};
