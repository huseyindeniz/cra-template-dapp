import React from "react";

import useTypedSelector from "../../hooks/useTypedSelector";
import { WalletStateType } from "./types";

import {
  ConnectButton,
  ProfileDropdownMenu,
  ConnectionModal,
} from "./components";

export const Wallet: React.FC = () => {
  const walletState = useTypedSelector((state) => state.wallet.state);

  return (
    <>
      {walletState === WalletStateType.AUTHENTICATED ? (
        <ProfileDropdownMenu />
      ) : (
        <>
          <ConnectButton />
          <ConnectionModal walletState={walletState} />
        </>
      )}
    </>
  );
};
