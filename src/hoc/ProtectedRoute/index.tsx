import React from "react";
import { ProtectedRouteWarning } from "../../components/ProtectedRoute";
import { WalletStateType } from "../../features/wallet/types";
import useTypedSelector from "../../hooks/useTypedSelector";

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

const WithProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const wallet = useTypedSelector((state) => state.wallet);

  return wallet.state === WalletStateType.AUTHENTICATED ? (
    <>{children}</>
  ) : (
    <ProtectedRouteWarning />
  );
};

export default WithProtectedRoute;
