import saga from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

import { EthersWalletAPI } from "../services/Ethers/WalletAPI";
import { watchWalletSaga /*announceWalletLoaded*/ } from "../features/wallet";

import RootReducer from "./rootReducer";

enableMapSet();

const walletApi = EthersWalletAPI.getInstance();

function* RootSaga() {
  yield all([fork(watchWalletSaga, walletApi)]);
}

const sagaMiddleware = saga();

const store = configureStore({
  reducer: RootReducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV === "development",
});

sagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
