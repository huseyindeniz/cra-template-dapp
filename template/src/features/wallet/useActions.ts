import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import {
  connectWallet,
  switchNetwork,
  unlockWallet,
  signIn,
  disconnectWallet,
  latestBlock,
} from "./actions";

const useActions = () => {
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

export default useActions;
