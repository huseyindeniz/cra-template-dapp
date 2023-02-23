import { useSteps } from 'chakra-ui-steps';
import React, { useEffect, useState } from 'react';

import useTypedSelector from '../../../../hooks/useTypedSelector';
import { SUPPORTED_NETWORKS, DEFAULT_NETWORK } from '../../config';
import { useActions } from '../../hooks/useActions';
import { AccountLoadState } from '../../models/account/types/AccountLoadState';
import { AccountSignState } from '../../models/account/types/AccountSignState';
import { NetworkLoadState } from '../../models/network/types/NetworkLoadState';
import { ProviderLoadState } from '../../models/provider/types/ProviderLoadState';
import { WalletState } from '../../models/types/WalletState';

import { Modal } from './Modal/Modal';
import { CheckAccount } from './Steps/CheckAccount';
import { CheckNetwork } from './Steps/CheckNetwork';
import { CheckSign } from './Steps/CheckSign';
import { CheckWallet } from './Steps/CheckWallet';

export interface ConnectionModalProps {
  onDisconnect: () => void;
}

export const ConnectionModal: React.FC<ConnectionModalProps> = ({
  onDisconnect,
}) => {
  const actions = useActions();
  const walletState = useTypedSelector(state => state.wallet.state.state);
  const error = useTypedSelector(state => state.wallet.state.error);
  const providerLoadState = useTypedSelector(
    state => state.wallet.provider.providerLoadState
  );
  const accountLoadState = useTypedSelector(
    state => state.wallet.account.accountLoadState
  );
  const networkLoadState = useTypedSelector(
    state => state.wallet.network.networkLoadState
  );
  const accountSignState = useTypedSelector(
    state => state.wallet.account.accountSignState
  );
  const signCounter = useTypedSelector(
    state => state.wallet.account.signCounter
  );
  const { setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const [stepState, setStepState] = useState<'error' | 'loading' | undefined>(
    undefined
  );

  const defaultNetwork = DEFAULT_NETWORK.chainId;
  const supportedNetworks = SUPPORTED_NETWORKS.map(network => {
    return {
      id: network.chainId,
      name: network.chainName,
      isTestChain: network.isTestChain,
      isLocalChain: network.isLocalChain,
    };
  });

  const handleDisconnect = () => {
    onDisconnect();
    actions.disconnectWallet();
  };

  useEffect(() => {
    switch (providerLoadState) {
      case ProviderLoadState.IDLE:
      case ProviderLoadState.INITIALIZED:
        setStepState(undefined);
        break;
      case ProviderLoadState.REQUESTED:
        setStepState('loading');
        break;
      case ProviderLoadState.FAILED:
      case ProviderLoadState.NOT_SUPPORTED:
        setStepState('error');
        break;
      default:
        setStepState(undefined);
    }
  }, [providerLoadState]);

  useEffect(() => {
    switch (accountLoadState) {
      case AccountLoadState.IDLE:
      case AccountLoadState.ACCOUNT_LOADED:
        setStepState(undefined);
        break;
      case AccountLoadState.ACCOUNT_REQUESTED:
      case AccountLoadState.UNLOCK_REQUESTED:
        setStepState('loading');
        break;
      case AccountLoadState.ACCOUNT_DETECTION_FAILED:
      case AccountLoadState.LOCKED:
      case AccountLoadState.UNLOCK_FAILED:
      case AccountLoadState.UNLOCK_REJECTED:
        setStepState('error');
        break;
      default:
        setStepState(undefined);
    }
  }, [accountLoadState]);

  useEffect(() => {
    switch (networkLoadState) {
      case NetworkLoadState.IDLE:
      case NetworkLoadState.NETWORK_LOADED:
        setStepState(undefined);
        break;
      case NetworkLoadState.NETWORK_REQUESTED:
      case NetworkLoadState.NETWORK_SWITCH_REQUESTED:
        setStepState('loading');
        break;
      case NetworkLoadState.NETWORK_DETECTION_FAILED:
      case NetworkLoadState.NETWORK_SWITCH_FAILED:
      case NetworkLoadState.NETWORK_SWITCH_REJECTED:
      case NetworkLoadState.WRONG_NETWORK:
        setStepState('error');
        break;
      default:
        setStepState(undefined);
    }
  }, [networkLoadState]);

  useEffect(() => {
    switch (accountSignState) {
      case AccountSignState.IDLE:
      case AccountSignState.SIGNED:
        setStepState(undefined);
        break;
      case AccountSignState.SIGN_REQUESTED:
        setStepState('loading');
        break;
      case AccountSignState.NOT_SIGNED:
      case AccountSignState.SIGN_FAILED:
      case AccountSignState.SIGN_REJECTED:
      case AccountSignState.SIGN_TIMED_OUT:
        setStepState('error');
        break;
      default:
        setStepState(undefined);
    }
  }, [accountSignState]);

  useEffect(() => {
    switch (walletState) {
      // STEP 0: Initialization
      case WalletState.NOT_INITIALIZED:
      case WalletState.CHECKING_WALLET:
        setStep(0);
        break;
      // STEP 1: Account Check
      case WalletState.CHECKING_ACCOUNT:
        setStep(1);
        break;
      // STEP 2: Network Check
      case WalletState.CHECKING_NETWORK:
        setStep(2);
        break;
      // STEP 3: Sign Check
      case WalletState.CHECKING_SIGN:
        setStep(3);
        break;
      default:
        reset();
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletState]);

  return (
    <Modal
      checkWalletContent={
        <CheckWallet
          stepState={providerLoadState}
          onCancel={handleDisconnect}
        />
      }
      checkAccountContent={
        <CheckAccount
          onUnlock={actions.unlockWallet}
          stepState={accountLoadState}
          errorMessage={error}
        />
      }
      checkNetworkContent={
        <CheckNetwork
          supportedNetworks={supportedNetworks}
          defaultNetwork={defaultNetwork}
          onSwitchNetwork={actions.switchNetwork}
          stepState={networkLoadState}
          errorMessage={error}
        />
      }
      checkSignContent={
        <CheckSign
          onSign={actions.signIn}
          onDisconnect={handleDisconnect}
          stepState={accountSignState}
          signCounter={signCounter}
          errorMessage={error}
        />
      }
      activeStep={activeStep}
      isOpen={true}
      onDisconnect={handleDisconnect}
      stepState={stepState}
    />
  );
};
