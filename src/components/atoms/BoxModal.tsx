import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import Modal from 'react-native-modal';

const Container = styled(View)`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 30px;
  border-radius: 20px;
`;

interface BoxModalProps {
  isVisible: boolean;
  children: React.ReactNode;
}

export const BoxModal = ({ isVisible, children }: BoxModalProps) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        animationIn="slideInDown"
        animationOut="slideOutDown">
        <Container>{children}</Container>
      </Modal>
    </View>
  );
};
