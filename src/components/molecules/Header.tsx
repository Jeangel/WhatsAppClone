import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { EdgeInsets } from 'react-native-safe-area-context';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { Icon } from '../atoms/Icon';
import { Text } from '../atoms/Text';

type JustifyContent =
  | 'space-between'
  | 'center'
  | 'space-evenly'
  | 'space-around';

const Container = styled(View)<{
  insets: EdgeInsets;
  justifyContent?: JustifyContent;
  removeBorders?: boolean;
}>`
  padding-top: ${({ insets }) => Math.max(insets.top, 25)}px;
  padding-bottom: 20px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: ${({ theme }) => theme.colors.surface};
  ${({ removeBorders, theme }) => {
    if (!removeBorders) {
      return `
        border-bottom-width: 1px;
        border-bottom-color: ${theme.colors.neutral80};
      `;
    }
  }}
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeftContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const BackButtonContainer = styled(View)`
  margin-right: 5px;
`;

interface HeaderProps extends StackHeaderProps {
  children?: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
  removeBorders?: boolean;
}

export const Header = ({
  insets,
  navigation,
  children,
  showBackButton,
  title,
  removeBorders = false,
}: HeaderProps) => {
  return (
    <Container insets={insets} removeBorders={removeBorders}>
      <HeaderLeftContainer>
        {showBackButton && (
          <BackButtonContainer>
            <TouchableOpacity onPress={navigation.goBack}>
              <Icon name="back-arrow" size={25} color={'primary'} />
            </TouchableOpacity>
          </BackButtonContainer>
        )}
        {title && <Text variant="h1">{title}</Text>}
      </HeaderLeftContainer>
      {children}
    </Container>
  );
};
