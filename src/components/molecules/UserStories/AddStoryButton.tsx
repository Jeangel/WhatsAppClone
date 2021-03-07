import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { Icon } from '../../atoms/Icon';
import { StoryItem } from './StoryItem';

interface AddStoryButtonProps {
  onPress?: () => {};
}

const AddStoryButtonContent = styled(View)`
  width: 60px;
  height: 60px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

export const AddStoryButton = ({ onPress }: AddStoryButtonProps) => {
  return (
    <StoryItem onPress={onPress} label={'New Story'}>
      <AddStoryButtonContent>
        <Icon name="add" size={20} color={'white'} />
      </AddStoryButtonContent>
    </StoryItem>
  );
};
