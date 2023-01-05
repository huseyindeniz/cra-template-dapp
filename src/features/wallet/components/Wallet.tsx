import React from "react";

import { ConnectButton } from "./ConnectButton/ConnectButton";
import { ProfileDropdownMenu } from "./ProfileDropdownMenu/ProfileDropdownMenu";

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
