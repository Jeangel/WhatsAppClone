/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface IUseAppStateChange {
  handleChange?: Function;
  handleAppActivated?: Function;
  handleAppDeactivated?: Function;
}

const useAppStateChange = (stateHandlers: IUseAppStateChange) => {
  const { handleChange, handleAppActivated, handleAppDeactivated } =
    stateHandlers || {};
  const [appState, setAppState] = useState(AppState.currentState);

  /**
   * Executes the an action based on the state change that happens.
   */
  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active' && handleAppActivated) {
      handleAppActivated();
    } else if (
      appState === 'active' &&
      nextAppState.match(/inactive|background/) &&
      handleAppDeactivated
    ) {
      handleAppDeactivated();
    }
    setAppState(nextAppState);
    if (handleChange) {
      handleChange(nextAppState);
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, [handleChange, handleAppActivated, handleAppDeactivated, appState]);
  return { appState };
};

export default useAppStateChange;
