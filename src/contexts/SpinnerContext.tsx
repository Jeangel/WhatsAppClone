import React from 'react';

export const SpinnerContext = React.createContext({
  isShowingSpinner: false,
  showSpinner: () => {},
  hideSpinner: () => {},
});

interface SpinnerProvider {
  isShowingSpinner: boolean;
  showSpinner: () => void;
  hideSpinner: () => void;
  children: React.ReactNode;
}

export const SpinnerProvider = ({ children, ...rest }: SpinnerProvider) => {
  return (
    <SpinnerContext.Provider value={{ ...rest }}>
      {children}
    </SpinnerContext.Provider>
  );
};
