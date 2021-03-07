import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { ETheme, themes } from './src/theme';

const App = () => {
  const [themeMode, setThemeMode] = useState(ETheme.light);

  const toggleThemeMode = () => {
    const newTheme = themeMode === ETheme.light ? ETheme.dark : ETheme.light;
    setThemeMode(newTheme);
  };

  return (
    <NavigationContainer>
      <ThemeProvider
        theme={themes[themeMode]}
        toggleThemeMode={toggleThemeMode}
        themeMode={themeMode}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={
              themeMode === ETheme.light ? 'dark-content' : 'light-content'
            }
          />
          <Navigation />
        </SafeAreaProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
