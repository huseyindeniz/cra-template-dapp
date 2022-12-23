import React from "react";
import { ProtectedRouteWarning } from "../../components/UI/ProtectedRoute";
import { WalletStateType } from "../../features/wallet/types";
import useTypedSelector from "../../hooks/useTypedSelector";

export const withProtectedRoute = (
  ChildWithProps: React.ComponentType<any | string>
) => {
  const RouteWithProtection: React.FC = () => {
    const wallet = useTypedSelector((state) => state.wallet);
    return wallet.state === WalletStateType.AUTHENTICATED ? (
      <ChildWithProps />
    ) : (
      <ProtectedRouteWarning />
    );
  };
  return RouteWithProtection;
};
