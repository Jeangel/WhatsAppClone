import * as React from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export const useTheme = () => React.useContext(ThemeContext).theme;
