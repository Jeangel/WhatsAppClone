import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { Icon } from '../../atoms/Icon';
import { StatusItem } from './StatusItem';

interface AddStatusButtonProps {
  onPress?: () => {};
}

const AddStatusButtonContent = styled(View)`
  width: 60px;
  height: 60px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

export const AddStatusButton = ({ onPress }: AddStatusButtonProps) => {
  return (
    <StatusItem onPress={onPress} label={'New Status'}>
      <AddStatusButtonContent>
        <Icon name="add" size={20} color={'white'} />
      </AddStatusButtonContent>
    </StatusItem>
  );
};
