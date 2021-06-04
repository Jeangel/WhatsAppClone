import Pubnub from 'pubnub';

export type PubNubChatMessage = Pubnub.FetchMessagesResponse['channels'][0][0];
