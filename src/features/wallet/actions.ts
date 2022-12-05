import { createAction } from "@reduxjs/toolkit";

export const connectWallet = createAction("CONNECT_WALLET");
export const unlockWallet = createAction("UNLOCK_WALLET");
export const switchNetwork = createAction<number>("SWITCH_NETWORK");
export const signIn = createAction("SIGN_IN");
export const disconnectWallet = createAction("DISCONNECT_WALLET");
export const latestBlock = createAction("LATEST_BLOCK");
