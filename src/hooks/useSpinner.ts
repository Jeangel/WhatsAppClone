import * as React from 'react';
import { SpinnerContext } from '../contexts/SpinnerContext';

const useSpinner = () => {
  const { isShowingSpinner, showSpinner, hideSpinner } = React.useContext(
    SpinnerContext,
  );
  return { isShowingSpinner, showSpinner, hideSpinner };
};

export default useSpinner;
