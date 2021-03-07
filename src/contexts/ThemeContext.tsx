import * as React from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { ETheme, ITheme } from '../theme';
import { LightTheme } from '../theme/light';

interface ThemeProviderProps {
  children: React.ReactNode;
  themeMode: ETheme;
  toggleThemeMode: () => void;
  theme: ITheme;
}

export const ThemeContext = React.createContext({
  themeMode: ETheme.light,
  toggleThemeMode: () => {},
  theme: LightTheme,
});

export const ThemeProvider = ({
  children,
  themeMode,
  toggleThemeMode,
  theme,
}: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={{ themeMode, toggleThemeMode, theme }}>
      <StyledComponentsThemeProvider theme={theme}>
        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
};
