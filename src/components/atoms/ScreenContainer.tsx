import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { useTheme } from '../../hooks';

interface ScreenContainerProps {
  children: React.ReactNode;
}

export const ScreenContainer = ({ children }: ScreenContainerProps) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.surface }}>
      {children}
    </SafeAreaView>
  );
};
