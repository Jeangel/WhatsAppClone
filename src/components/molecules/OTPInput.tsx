import * as React from 'react';
import { StyleSheet } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useTheme } from '../../hooks';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const OTPInput = ({ value, onChange, disabled }: OTPInputProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    inputFieldStyle: {
      borderColor: theme.colors.neutral60,
      borderWidth: 0.5,
      borderRadius: 10,
      color: theme.colors.neutral40,
    },
    highlightedInputFieldStyle: {
      borderColor: theme.colors.primary,
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
      editable={!disabled}
    />
  );
};
