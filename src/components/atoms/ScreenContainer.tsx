import * as React from 'react';
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from 'react-native-safe-area-context';
import styled from 'styled-components';

interface ScreenContainerProps extends NativeSafeAreaViewProps {
  children: React.ReactNode;
}

const StyledSafeArea = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.surface};
  flex: 1;
`;

export const ScreenContainer = ({
  children,
  ...rest
}: ScreenContainerProps) => {
  return <StyledSafeArea {...rest}>{children}</StyledSafeArea>;
};
