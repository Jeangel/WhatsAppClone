import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { Text } from '../../atoms/Text';
import { UserImage } from './UserImage';
import { User } from '../../../app/User';

const Container = styled(View)`
  flex-direction: row;
`;

const ImageContainer = styled(View)`
  width: 25%;
`;

const MessageContainer = styled(View)`
  height: 100%;
  width: 55%;
`;

const UserName = styled(Text)`
  padding-bottom: 5px;
`;

interface UserCardProps {
  user: User;
  description: string;
  size?: number;
}

export const UserCard = ({ user, description, size }: UserCardProps) => {
  return (
    <Container>
      <ImageContainer>
        <UserImage
          url={user.profileImageUrl}
          status={user.status}
          size={size}
        />
      </ImageContainer>
      <MessageContainer>
        <UserName variant="h4" weight="600">
          {user.name}
        </UserName>
        <Text color="neutral60" numberOfLines={2} ellipsizeMode="tail">
          {description}
        </Text>
      </MessageContainer>
    </Container>
  );
};
