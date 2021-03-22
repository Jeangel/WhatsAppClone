import * as React from 'react';
import {
  Text as RNText,
  TextStyle,
  TextProps as RNTextProps,
} from 'react-native';
import styled from 'styled-components';
import { EColor } from '../../theme';

type TextWeight =
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

export enum ETextVariant {
  'extraSmall' = 'extraSmall',
  small = 'small',
  body = 'body',
  button = 'button',
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
}

interface TextProps extends RNTextProps {
  variant?: keyof typeof ETextVariant;
  style?: TextStyle;
  color?: keyof typeof EColor | string;
  weight?: TextWeight;
  children: React.ReactNode;
}

const BaseText = styled(RNText)<TextProps>`
  font-family: 'SFProText-Regular';
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.neutral40};
  font-weight: ${({ weight }) => (weight ? weight : '300')};
`;

const BodyText = styled(BaseText)`
  font-size: 14px;
`;

const SmallText = styled(BaseText)`
  font-size: 12px;
`;

const ExtraSmallText = styled(BaseText)`
  font-size: 10px;
`;

const H1Text = styled(BaseText)`
  font-family: 'SFProText-Bold';
  font-size: 25px;
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.neutral20};
  font-weight: ${({ weight }) => (weight ? weight : '900')};
`;

const H2Text = styled(BaseText)`
  font-family: 'SFProText-Bold';
  font-size: 20px;
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.neutral20};
  font-weight: ${({ weight }) => (weight ? weight : '600')};
`;

const H3Text = styled(BaseText)`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.neutral20};
  font-weight: ${({ weight }) => (weight ? weight : '500')};
`;

const H4Text = styled(BaseText)`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.neutral20};
  font-weight: ${({ weight }) => (weight ? weight : '500')};
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
      case ETextVariant.body:
        return BodyText;
      case ETextVariant.small:
        return SmallText;
      case ETextVariant.extraSmall:
        return ExtraSmallText;
      case ETextVariant.h1:
        return H1Text;
      case ETextVariant.h2:
        return H2Text;
      case ETextVariant.h4:
        return H4Text;
      case ETextVariant.h3:
        return H3Text;
      case ETextVariant.button:
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
