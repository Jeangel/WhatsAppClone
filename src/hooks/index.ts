import * as React from 'react';
import { SpinnerContext } from '../contexts/SpinnerContext';
import { ThemeContext } from '../contexts/ThemeContext';

export const useTheme = () => React.useContext(ThemeContext).theme;

export const useSpinner = () => {
  const { isShowingSpinner, showSpinner, hideSpinner } = React.useContext(
    SpinnerContext,
  );
  return { isShowingSpinner, showSpinner, hideSpinner };
};
