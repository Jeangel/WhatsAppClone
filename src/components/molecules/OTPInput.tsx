import * as React from 'react';
import { StyleSheet } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useTheme } from '../../hooks';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const OTPInput = ({ value, onChange }: OTPInputProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    inputFieldStyle: {
      borderColor: 'transparent',
      borderBottomColor: theme.colors.neutral60,
      color: theme.colors.neutral40,
    },
    highlightedInputFieldStyle: {
      borderColor: 'transparent',
      borderBottomColor: theme.colors.primary,
      color: theme.colors.neutral40,
    },
    container: {
      height: 50,
      width: '85%',
    },
  });
  return (
    <OTPInputView
      pinCount={6}
      code={value}
      style={styles.container}
      onCodeChanged={onChange}
      codeInputFieldStyle={styles.inputFieldStyle}
      codeInputHighlightStyle={styles.highlightedInputFieldStyle}
    />
  );
};
