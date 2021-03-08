import * as React from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components';

interface ChatUserImageProps {
  url: string;
  status: string;
}

const Container = styled(View)`
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled(Image)`
  height: 60px;
  width: 60px;
  border-radius: 100px;
`;

const ImageContainer = styled(View)`
  position: relative;
`;

const Status = styled(View)<{ status: string }>`
  width: 12px;
  height: 12px;
  border-radius: 100px;
  position: absolute;
  bottom: 4px;
  right: 0px;
  border: 1.5px solid ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'online':
        return theme.colors.primary;
      case 'offline':
        return theme.colors.neutral60;
      case 'away':
        return theme.colors.warning;
    }
  }};
`;

export const ChatUserImage = ({ url, status }: ChatUserImageProps) => {
  return (
    <Container>
      <ImageContainer>
        <ProfileImage source={{ uri: url }} />
        <Status status={status} />
      </ImageContainer>
    </Container>
  );
};
