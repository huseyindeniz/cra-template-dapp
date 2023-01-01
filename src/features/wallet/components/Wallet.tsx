import React from "react";

import { ConnectButton } from "./ConnectButton";
import { ProfileDropdownMenu } from "./ProfileDropdownMenu";

import { useWalletAuthentication } from "../hooks/useWalletAuthentication";

export const Wallet: React.FC = () => {
  const { isAuthenticated } = useWalletAuthentication();
  return (
    <>
      {isAuthenticated ? (
        <ProfileDropdownMenu />
      ) : (
        <>
          <ConnectButton />
        </>
      )}
    </>
  );
};
