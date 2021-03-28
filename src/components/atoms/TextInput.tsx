import React from 'react';
import { NativeSyntheticEvent, TextInput as RNTextInput, TextInputFocusEventData, TextInputProps } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '../../hooks';

const StyledInput = styled(RNTextInput)<{ borderColor: string }>`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 10px;
  width: 100%;
  max-height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: 'SFProText-Regular';
  font-weight: 300;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral40};
  border-color: ${({ borderColor }) => borderColor};
  border-width: 0.5px;
`;

export const TextInput = (props: TextInputProps) => {
  const theme = useTheme();
  const [borderColor, setBorderColor] = React.useState(theme.colors.neutral60);
  const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setBorderColor(theme.colors.primary);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setBorderColor(theme.colors.neutral60);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  return (
    <StyledInput
      {...props}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      borderColor={borderColor}
    />
  );
};
