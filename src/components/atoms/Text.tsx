import * as React from 'react';
import {
  Text as RNText,
  TextStyle,
  TextProps as RNTextProps,
} from 'react-native';
import styled from 'styled-components';
import { EColor } from '../../theme';

interface TextProps extends RNTextProps {
  variant?: string;
  style?: TextStyle;
  color?: keyof typeof EColor;
  weight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  children: React.ReactNode;
}

const BaseText = styled(RNText)`
  font-family: 'SFProText-Regular';
`;

const BodyText = styled(BaseText)<{
  color: keyof typeof EColor;
  weight: string;
}>`
  font-size: 14px;
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.neutral40};
  font-weight: ${({ weight }) => (weight ? weight : '300')};
`;

const SmallText = styled(BaseText)`
  font-size: 12px;
`;

const ExtraSmallText = styled(BaseText)`
  font-size: 10px;
`;

const H1Text = styled(BaseText)`
  font-size: 28px;
  font-weight: 900;
`;

const H4Text = styled(BaseText)`
  font-size: 16px;
  font-weight: 500;
`;

const ButtonText = styled(BaseText)`
  font-size: 18px;
  font-weight: 700;
`;

export const Text = ({
  variant = 'body',
  style,
  children,
  ...rest
}: TextProps) => {
  const getTextComponent = () => {
    switch (variant) {
      case 'body':
        return BodyText;
      case 'small':
        return SmallText;
      case 'extra-small':
        return ExtraSmallText;
      case 'h1':
        return H1Text;
      case 'h4':
        return H4Text;
      case 'button':
        return ButtonText;
      default:
        return BodyText;
    }
  };
  const Component = getTextComponent();
  return (
    <Component style={style} {...rest} allowFontScaling={false}>
      {children}
    </Component>
  );
};
