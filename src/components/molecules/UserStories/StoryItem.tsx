import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { Text } from '../../atoms/Text';

interface StoryItemProps {
  label: string;
  children: React.ReactNode;
  onPress?: () => void;
}

const StoryContainer = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`;

const LabelContainer = styled(View)`
  min-width: 65px;
  max-width: 65px;
  align-items: center;
  justify-content: center;
`;

const Label = styled(Text)`
  text-align: center;
  line-height: 20px;
`;

const MainContentContainer = styled(View)`
  height: 70px;
  width: 70px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;

/**
 * Generic Story Item.
 */
export const StoryItem = ({ label, children, onPress }: StoryItemProps) => {
  const handleOnPress = () => {
    if (onPress && typeof onPress === 'function') {
      onPress();
    }
  };
  return (
    <StoryContainer onPress={handleOnPress}>
      <MainContentContainer>{children}</MainContentContainer>
      <LabelContainer>
        <Label color="neutral60" variant="small">
          {label}
        </Label>
      </LabelContainer>
    </StoryContainer>
  );
};
