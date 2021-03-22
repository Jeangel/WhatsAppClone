import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PubNubProvider } from 'pubnub-react';
import Config from 'react-native-config';
import Pubnub from 'pubnub';
import Navigation from './src/navigation';
import { ETheme, themes } from './src/theme';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { SpinnerProvider } from './src/contexts/SpinnerContext';
import { Spinner } from './src/components/atoms/Spinner';

const pubNubClient = new Pubnub({
  subscribeKey: Config.PUBNUB_SUBSCRIBE_SECRET,
  publishKey: Config.PUBNUB_PUBLISH_SECRET,
});

const App = () => {
  const [themeMode, setThemeMode] = useState(ETheme.light);
  const [isShowingSpinner, setIsShowingSpinner] = useState(true);
  const showSpinner = () => setIsShowingSpinner(true);
  const hideSpinner = () => setIsShowingSpinner(false);
  const toggleThemeMode = () => {
    const newTheme = themeMode === ETheme.light ? ETheme.dark : ETheme.light;
    setThemeMode(newTheme);
  };

  return (
    <NavigationContainer>
      <SpinnerProvider
        isShowingSpinner={isShowingSpinner}
        showSpinner={showSpinner}
        hideSpinner={hideSpinner}>
        <PubNubProvider client={pubNubClient}>
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
              <Spinner isVisible={isShowingSpinner} />
            </SafeAreaProvider>
          </ThemeProvider>
        </PubNubProvider>
      </SpinnerProvider>
    </NavigationContainer>
  );
};

export default App;
