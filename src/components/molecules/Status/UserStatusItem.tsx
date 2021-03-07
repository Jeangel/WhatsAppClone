import * as React from 'react';
import { useTheme } from '../../../hooks';
import { ImageWithSegmentedBorder } from '../ImageWithSegmentedBorder';
import { StatusItem } from './StatusItem';

interface UserStatusItemProps {
  uploadedStatusAmount: number;
  user: {
    id: string;
    name: string;
    profileImageUrl: string;
  };
  onPress?: (userId: string) => {};
}

export const UserStatusItem = ({
  user,
  uploadedStatusAmount,
  onPress,
}: UserStatusItemProps) => {
  const theme = useTheme();
  const handleOnPress = () => {
    if (onPress && typeof onPress === 'function') {
      onPress(user.id);
    }
  };
  return (
    <StatusItem onPress={handleOnPress} label={user.name}>
      <ImageWithSegmentedBorder
        url={user.profileImageUrl}
        borderSlices={uploadedStatusAmount}
        size={70}
        borderColor={theme.colors.primary}
      />
    </StatusItem>
  );
};
