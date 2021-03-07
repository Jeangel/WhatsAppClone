import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Text } from '../atoms/Text';
import { useTheme } from '../../hooks';
import { ImageWithSegmentedBorder } from './ImageWithSegmentedBorder';

interface StatusItemProps {
  uploadedStatusAmount: number;
  user: {
    id: string;
    name: string;
    profileImageUrl: string;
  };
  onPress?: (userId: string) => {};
}

const StatusContainer = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  padding: 16px 4px;
`;

export const StatusItem = ({
  user,
  uploadedStatusAmount,
  onPress,
}: StatusItemProps) => {
  const theme = useTheme();
  const handleOnPress = () => {
    if (onPress && typeof onPress === 'function') {
      onPress(user.id);
    }
  };
  return (
    <StatusContainer onPress={handleOnPress}>
      <ImageWithSegmentedBorder
        url={user.profileImageUrl}
        borderSlices={uploadedStatusAmount}
        size={80}
        borderColor={theme.colors.primary}
      />
      <Text color="neutral60">{user.name}</Text>
    </StatusContainer>
  );
};
