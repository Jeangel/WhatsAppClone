import { DarkTheme } from './dark';
import { LightTheme } from './light';

export enum ETheme {
  light = 'light',
  dark = 'dark',
}

export enum EColor {
  primary = 'primary',
  white = 'white',
  black = 'black',
  surface = 'surface',
  safe = 'safe',
  warning = 'warning',
  danger = 'danger',
  neutral20 = 'neutral20',
  neutral40 = 'neutral40',
  neutral60 = 'neutral60',
  neutral80 = 'neutral80',
}

export interface ITheme {
  colors: keyof typeof EColor;
}

export const themes = {
  [ETheme.light]: LightTheme,
  [ETheme.dark]: DarkTheme,
};
