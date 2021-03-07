import { View } from 'react-native';
import styled from 'styled-components';
import { EdgeInsets } from 'react-native-safe-area-context';

export const Header = styled(View)<{ insets: EdgeInsets }>`
  padding-top: ${({ insets }) => Math.max(insets.top + 10, 50)}px;
  padding-bottom: 20px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.neutral80};
`;
