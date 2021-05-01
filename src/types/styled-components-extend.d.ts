import { ITheme } from '../theme';
import { DefaultTheme } from 'styled-components';

/**
 * Extending styled components theme to achieve:
 * 1. have typed theme prop inside 'styled' components.
 * 2. Add breakpoints to the theme as requested by styled-breakpoints
 */
declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
