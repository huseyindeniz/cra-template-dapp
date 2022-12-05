import saga from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

import { watchWalletSaga } from "../features/wallet/sagas";

import RootReducer from "./rootReducer";

enableMapSet();

function* RootSaga() {
  yield all([fork(watchWalletSaga)]);
}

const sagaMiddleware = saga();

const store = configureStore({
  reducer: RootReducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
