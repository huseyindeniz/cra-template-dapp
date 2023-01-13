import { combineReducers } from '@reduxjs/toolkit';

import { walletReducer } from '../features/wallet/slices';

export default combineReducers({
  wallet: walletReducer,
});
