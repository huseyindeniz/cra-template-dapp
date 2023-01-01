import { combineReducers } from "@reduxjs/toolkit";

import { walletReducer } from "../features/wallet";

export default combineReducers({
  wallet: walletReducer,
});
