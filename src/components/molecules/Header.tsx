import { View } from 'react-native';
import styled from 'styled-components';
import { EdgeInsets } from 'react-native-safe-area-context';

type JustifyContent =
  | 'space-between'
  | 'center'
  | 'space-evenly'
  | 'space-around';

export const Header = styled(View)<{
  insets: EdgeInsets;
  justifyContent?: JustifyContent;
}>`
  padding-top: ${({ insets }) => Math.max(insets.top + 10, 50)}px;
  padding-bottom: 20px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.neutral80};
  flex-direction: row;
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : 'space-between'};
`;
