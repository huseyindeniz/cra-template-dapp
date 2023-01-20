import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import {
  connectWallet,
  switchNetwork,
  unlockWallet,
  signIn,
  disconnectWallet,
  latestBlock,
} from './actions';

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      connectWallet,
      switchNetwork,
      unlockWallet,
      signIn,
      disconnectWallet,
      latestBlock,
    },
    dispatch
  );
};
