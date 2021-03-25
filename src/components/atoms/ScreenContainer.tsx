import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';

interface ScreenContainerProps {
  children: React.ReactNode;
}

const StyledSafeArea = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.surface};
  flex: 1;
`;

export const ScreenContainer = ({ children }: ScreenContainerProps) => {
  return <StyledSafeArea>{children}</StyledSafeArea>;
};
