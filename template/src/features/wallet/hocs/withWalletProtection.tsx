import React from "react";
import { WalletProtectionWarning } from "../components/WalletProtectionWarning";
import { useWalletAuthentication } from "..";

export const withWalletProtection = (
  ChildWithProps: React.ComponentType<any | string>,
  CustomWarning: React.ReactElement | undefined = undefined
) => {
  const RouteWithProtection: React.FC = () => {
    const { isAuthenticated } = useWalletAuthentication();
    return isAuthenticated ? (
      <ChildWithProps />
    ) : (
      CustomWarning ?? <WalletProtectionWarning />
    );
  };
  return RouteWithProtection;
};
