import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import useTypedSelector from '../../../../hooks/useTypedSelector';
import { LoadingStatusType } from '../../models/LoadingStatus';
import { WalletStateType } from '../../models/WalletGlobalState';
import { useActions } from '../../useActions';

import { Button } from './Button/Button';
import { WalletLoading } from './WalletLoading/WalletLoading';

const ConnectionModal = React.lazy(() =>
  import(
    /* webpackChunkName: "../ConnectionModal" */ '../ConnectionModal/ConnectionModal'
  ).then(module => ({
    default: module.ConnectionModal,
  }))
);

export const ConnectButton: React.FC = () => {
  const actions = useActions();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const loadingState = useTypedSelector(state => state.wallet.loading);
  const walletState = useTypedSelector(state => state.wallet.globalState.state);

  useEffect(() => {
    walletState !== undefined &&
    walletState !== WalletStateType.NOT_INITIALIZED &&
    walletState !== WalletStateType.AUTHENTICATED
      ? onOpen()
      : onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletState]);
  return (
    <>
      <Button
        isLoading={loadingState === LoadingStatusType.PENDING}
        onClick={actions.connectWallet}
      />
      {isOpen ? (
        <React.Suspense fallback={<WalletLoading />}>
          <ConnectionModal onDisconnect={onClose} />
        </React.Suspense>
      ) : null}
    </>
  );
};
