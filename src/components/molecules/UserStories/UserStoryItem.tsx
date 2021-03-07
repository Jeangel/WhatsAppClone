import * as React from 'react';
import { useTheme } from '../../../hooks';
import { ImageWithSegmentedBorder } from '../ImageWithSegmentedBorder';
import { StoryItem } from './StoryItem';

interface UserStoryItemProps {
  uploadedStoryAmount: number;
  user: {
    id: string;
    name: string;
    profileImageUrl: string;
  };
  onPress?: (userId: string) => {};
}

export const UserStoryItem = ({
  user,
  uploadedStoryAmount,
  onPress,
}: UserStoryItemProps) => {
  const theme = useTheme();
  const handleOnPress = () => {
    if (onPress && typeof onPress === 'function') {
      onPress(user.id);
    }
  };
  return (
    <StoryItem onPress={handleOnPress} label={user.name}>
      <ImageWithSegmentedBorder
        url={user.profileImageUrl}
        borderSlices={uploadedStoryAmount}
        size={70}
        borderColor={theme.colors.primary}
      />
    </StoryItem>
  );
};
