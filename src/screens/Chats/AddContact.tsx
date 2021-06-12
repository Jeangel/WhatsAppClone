import { StackHeaderProps, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styled from 'styled-components';
import { Button } from '../../components/atoms/Button';
import { Illustration } from '../../components/atoms/Illustration';
import { ScreenContainer } from '../../components/atoms/ScreenContainer';
import { Text } from '../../components/atoms/Text';
import { TextInput } from '../../components/atoms/TextInput';
import { CellphoneInput } from '../../components/molecules/CellphoneInput';
import { Header } from '../../components/molecules/Header';
import useSpinner from '../../hooks/useSpinner';
import { useAuthStore } from '../../state/auth';
import { usePushError } from '../../state/error';
import { usePushBoxModal } from '../../state/boxModal';
import { ChatStackParamList } from '../../navigation/ChatsStackNav';
import useUsersRequests from '../../hooks/useUsersRequests';
import useChatsRequests from '../../hooks/useChatsRequests';
import { createOneToOneChatId } from '../../util';

const Container = styled(KeyboardAvoidingView)`
  height: 100%;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Section = styled(View)`
  align-items: center;
  justify-content: center;
`;

const NameInput = styled(TextInput)`
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
`;

const Title = styled(Text)`
  text-align: center;
  padding-bottom: 30px;
`;

const Form = styled(View)`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  padding-left: 50px;
  padding-right: 50px;
`;

const AddButton = styled(Button)`
  min-width: 100%;
  margin-top: 20px;
`;

export const AddContactHeader = (props: StackHeaderProps) => {
  return <Header {...props} showBackButton removeBorders />;
};

type AddContactScreenNavigationProp = StackNavigationProp<
  ChatStackParamList,
  'AddContact'
>;

interface AddContactProps {
  navigation: AddContactScreenNavigationProp;
}

export const AddContact = ({ navigation }: AddContactProps) => {
  const [country, setCountry] = React.useState({
    code: 'CO',
    callingCode: '57',
  });
  const [phone, setPhone] = React.useState('');
  const [name, setName] = React.useState('');
  const { getUserByPhoneNumber, getUserById, addContact } = useUsersRequests();
  const { authenticatedUser } = useAuthStore();
  const { showSpinner, hideSpinner } = useSpinner();
  const { setChatMembers } = useChatsRequests();
  const pushError = usePushError();
  const pushBoxModal = usePushBoxModal();

  const handleOnAddContact = async () => {
    Keyboard.dismiss();
    showSpinner();
    const formattedPhone = `+${country.callingCode} ${phone}`;
    try {
      const contact = await getUserByPhoneNumber(formattedPhone);
      const currentUser = await getUserById(authenticatedUser.id);
      const contacts = currentUser.contacts || [];
      const contactExists = contacts.find((e) => e.id === contact.id);
      if (!contactExists) {
        const members = [contact.id, authenticatedUser.id];
        await addContact({ id: contact.id, alias: name });
        await setChatMembers({
          chatId: createOneToOneChatId(members),
          members: members,
        });
        pushBoxModal({
          content: 'Contact was added successfully',
          variant: 'success',
          onClose: () => navigation.goBack(),
        });
      } else {
        pushError(
          `Contact with phone ${formattedPhone} is already part of your contacts`,
        );
      }
    } catch (error) {
      pushError(error);
    } finally {
      hideSpinner();
    }
  };

  return (
    <ScreenContainer>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Section>
              <Title variant="h1">Adding new Contact</Title>
              <Illustration name="add-contact" />
            </Section>
            <Form>
              <NameInput
                placeholder="Contact Name"
                numberOfLines={1}
                maxLength={30}
                onChangeText={setName}
                value={name}
              />
              <CellphoneInput
                onChangeCountry={setCountry}
                country={country}
                onChangePhone={setPhone}
                phone={phone}
                placeholder="Contact Phone"
              />
              <AddButton text="Add Contact" onPress={handleOnAddContact} />
            </Form>
          </>
        </TouchableWithoutFeedback>
      </Container>
    </ScreenContainer>
  );
};
