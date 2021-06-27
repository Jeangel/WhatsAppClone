# WhatsAppClone

I'm building this project with the sole purpose of learning/applying new technologies and have some fun with it :).

The following are the features I hope it includes ... But remember! it's still a WIP ⚠

- [x] Sign Up/Sign In with phone number using firebase authentication (OTP).
- [x] Avatar image upload (_For not it support only from gallery, Camera is still TODO_)
- [x] Managing contacts, a contact is composed by an alias (not used yet! 😭) and a phone number.
- [x] Chat list
- [x] Chat screen with basic text messages (_For now it just support 1 to 1 chats_)
- [ ] Add emoji picker to the message toolbar
- [ ] Add ability to send images
- [ ] Add presence events to the users I have an active chat with.
- [ ] Add ability to archive a chat
- [ ] Add message status (sent / viewed)
- [ ] A lot more 🙈

How to run?
Clone the project.
Run yarn install. If on iOS run cd ios && pod install.
Create a .env file in the root of the project.
Add a [Pubnub PUBNUB_PUBLISH_SECRET and PUBNUB_SUBSCRIBE_SECRET](https://www.pubnub.com/) API Keys to the .env file.
Finally, Run yarn ios or yarn android
