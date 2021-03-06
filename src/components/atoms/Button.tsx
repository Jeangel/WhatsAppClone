import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import styled from 'styled-components';
import { EColor } from '../../theme';
import { Text } from './Text';

enum EButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
  transparent = 'transparent',
  danger = 'danger',
}

type ButtonVariant = keyof typeof EButtonVariant;

const buttonColors = {
  [EButtonVariant.primary]: {
    background: EColor.primary,
    foreground: EColor.white,
  },
  [EButtonVariant.secondary]: {
    background: EColor.neutral80,
    foreground: EColor.neutral20,
  },
  [EButtonVariant.transparent]: {
    background: EColor.transparent,
    foreground: EColor.primary,
  },
  [EButtonVariant.danger]: {
    background: EColor.danger,
    foreground: EColor.white,
  },
};

const Container = styled(TouchableOpacity)<{ backgroundColor: EColor }>`
  border-radius: 100px;
  padding: 15px;
  background-color: ${({ backgroundColor, theme }) =>
    theme.colors[backgroundColor]};
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

interface ButtonProps {
  children?: React.ReactNode;
  text?: string;
  variant?: ButtonVariant;
  style?: ViewStyle;
  onPress?: Function;
  disabled?: boolean;
}

export const Button = ({
  children,
  text,
  variant = EButtonVariant.primary,
  onPress,
  style,
  disabled,
  ...rest
}: ButtonProps) => {
  const handlePress = () => {
    if (typeof onPress === 'function') {
      onPress();
    }
  };

  const colors = buttonColors[variant];

  const content = text ? (
    <Text variant="body" color={colors.foreground}>
      {text}
    </Text>
  ) : (
    children
  );

  return (
    <Container
      style={style}
      onPress={handlePress}
      disabled={disabled}
      backgroundColor={colors.background}
      accessible
      {...rest}>
      {content}
    </Container>
  );
};
