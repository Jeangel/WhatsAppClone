import { View } from 'react-native';
import styled from 'styled-components';

export const Surface = styled(View)`
  background-color: ${({ theme }) => theme.colors.surface};
`;
