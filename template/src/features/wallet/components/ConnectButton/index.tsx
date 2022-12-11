import React from "react";

import useTypedSelector from "../../../../hooks/useTypedSelector";
import { LoadingStatusType } from "../../types";
import useActions from "../../useActions";
import { Button } from "./Button";

export const ConnectButton: React.FC = () => {
  const actions = useActions();
  const loadingState = useTypedSelector((state) => state.wallet.loading);
  return (
    <Button
      isLoading={loadingState === LoadingStatusType.PENDING}
      onClick={actions.connectWallet}
    />
  );
};
