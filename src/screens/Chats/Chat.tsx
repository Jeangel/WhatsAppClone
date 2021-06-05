/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StackHeaderProps, StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components';
import { Header } from '../../components/molecules/Header';
import { ChatStackParamList } from '../../navigation/ChatsStackNav';
import { UserCard } from '../../components/molecules/User/UserCard';
import { capitalize, pubnubMessageEventToGiftedChatMessage } from '../../util';
import { Icon } from '../../components/atoms/Icon';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { ChatMessageBar } from '../../components/organisms/Chat/ChatMessageBar';
import { MessageBubble } from '../../components/organisms/Chat/MessageBubble';
import { usePubNub } from 'pubnub-react';
import { useAuthStore } from '../../state/auth';
import Pubnub from 'pubnub';
import { RouteProp } from '@react-navigation/core';
import useChats from '../../hooks/useChats';
import { useChatsStore } from '../../state/chats';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer } from '../../components/atoms/ScreenContainer';

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
  // TODO: Jum, how to type this properly?
  // const params = props.scene.route.params as { chatId: string };
  // const chat = dummyData.find((e) => e.id === params.chatId);
  return (
    <Header {...props} showBackButton>
      {false ? (
        <UserStatusContainer>
          <UserCard
            user={{} as any}
            description={capitalize('active')}
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
  const { getChatMessages } = useChats();
  const { authenticatedUser } = useAuthStore();
  const { currentChat } = useChatsStore();
  const { bottom } = useSafeAreaInsets();
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const chatId = route.params.chatId;
  console.log(currentChat, 'current chat in Chat screenƒ');
  React.useEffect(() => {
    getChatMessages(chatId).then(setMessages);
    pubnub
      .hereNow({
        channels: [chatId],
        includeState: true,
        includeUUIDs: true,
      })
      .then((e) => {
        console.log('HERE NOW', e);
      });
  }, [chatId]);

  // React.useEffect(() => {
  //   if (pubnub) {
  //     const listeners: Pubnub.ListenerParameters = {
  //       message: async (envelope) => {
  //         console.log('message listener on Chat Screen', envelope);
  //         setMessages((msgs) => [
  //           ...msgs,
  //           pubnubMessageEventToGiftedChatMessage(envelope),
  //         ]);
  //       },
  //     };
  //     pubnub.addListener(listeners);
  //     return () => {
  //       pubnub.removeListener(listeners);
  //       pubnub.unsubscribeAll();
  //     };
  //   }
  // }, [authenticatedUser.id, pubnub, chatId]);

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
