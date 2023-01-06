import { useSteps } from 'chakra-ui-steps';
import React, { useEffect, useState } from 'react';

import useTypedSelector from '../../../../hooks/useTypedSelector';
import { SUPPORTED_NETWORKS, DEFAULT_NETWORK } from '../../config';
import {
  WalletAccountStateType,
  WalletInitStateType,
  WalletNetworkStateType,
  WalletSignStateType,
  WalletStateType,
} from '../../types';
import { useActions } from '../../useActions';

import { Modal } from './Modal/Modal';
import { StepCheckAccount } from './Steps/StepCheckAccount';
import { StepCheckNetwork } from './Steps/StepCheckNetwork';
import { StepCheckSign } from './Steps/StepCheckSign';
import { StepCheckWallet } from './Steps/StepCheckWallet';

export interface ConnectionModalProps {
  onDisconnect: () => void;
}

export const ConnectionModal: React.FC<ConnectionModalProps> = ({
  onDisconnect,
}) => {
  const actions = useActions();
  const walletState = useTypedSelector(state => state.wallet.globalState.state);
  const initState = useTypedSelector(
    state => state.wallet.globalState.initState
  );
  const accountState = useTypedSelector(
    state => state.wallet.globalState.accountState
  );
  const networkState = useTypedSelector(
    state => state.wallet.globalState.networkState
  );
  const signState = useTypedSelector(
    state => state.wallet.globalState.signState
  );
  const error = useTypedSelector(state => state.wallet.error);
  const signCounter = useTypedSelector(state => state.wallet.signCounter);
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
    switch (initState) {
      case WalletInitStateType.IDLE:
      case WalletInitStateType.INITIALIZED:
        setStepState(undefined);
        break;
      case WalletInitStateType.INIT_REQUESTED:
        setStepState('loading');
        break;
      case WalletInitStateType.INIT_FAILED:
      case WalletInitStateType.NOT_SUPPORTED:
        setStepState('error');
        break;
      default:
        setStepState(undefined);
    }
  }, [initState]);

  useEffect(() => {
    switch (accountState) {
      case WalletAccountStateType.IDLE:
      case WalletAccountStateType.ACCOUNT_LOADED:
        setStepState(undefined);
        break;
      case WalletAccountStateType.ACCOUNT_REQUESTED:
      case WalletAccountStateType.UNLOCK_REQUESTED:
        setStepState('loading');
        break;
      case WalletAccountStateType.ACCOUNT_DETECTION_FAILED:
      case WalletAccountStateType.LOCKED:
      case WalletAccountStateType.UNLOCK_FAILED:
      case WalletAccountStateType.UNLOCK_REJECTED:
        setStepState('error');
        break;
      default:
        setStepState(undefined);
    }
  }, [accountState]);

  useEffect(() => {
    switch (networkState) {
      case WalletNetworkStateType.IDLE:
      case WalletNetworkStateType.NETWORK_LOADED:
        setStepState(undefined);
        break;
      case WalletNetworkStateType.NETWORK_REQUESTED:
      case WalletNetworkStateType.NETWORK_SWITCH_REQUESTED:
        setStepState('loading');
        break;
      case WalletNetworkStateType.NETWORK_DETECTION_FAILED:
      case WalletNetworkStateType.NETWORK_SWITCH_FAILED:
      case WalletNetworkStateType.NETWORK_SWITCH_REJECTED:
      case WalletNetworkStateType.WRONG_NETWORK:
        setStepState('error');
        break;
      default:
        setStepState(undefined);
    }
  }, [networkState]);

  useEffect(() => {
    switch (signState) {
      case WalletSignStateType.IDLE:
      case WalletSignStateType.SIGNED:
        setStepState(undefined);
        break;
      case WalletSignStateType.SIGN_REQUESTED:
        setStepState('loading');
        break;
      case WalletSignStateType.NOT_SIGNED:
      case WalletSignStateType.SIGN_FAILED:
      case WalletSignStateType.SIGN_REJECTED:
      case WalletSignStateType.SIGN_TIMED_OUT:
        setStepState('error');
        break;
      default:
        setStepState(undefined);
    }
  }, [signState]);

  useEffect(() => {
    switch (walletState) {
      // STEP 0: Initialization
      case WalletStateType.NOT_INITIALIZED:
      case WalletStateType.CHECKING_WALLET:
        setStep(0);
        break;
      // STEP 1: Account Check
      case WalletStateType.CHECKING_ACCOUNT:
        setStep(1);
        break;
      // STEP 2: Network Check
      case WalletStateType.CHECKING_NETWORK:
        setStep(2);
        break;
      // STEP 3: Sign Check
      case WalletStateType.CHECKING_SIGN:
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
        <StepCheckWallet stepState={initState} onCancel={handleDisconnect} />
      }
      checkAccountContent={
        <StepCheckAccount
          onUnlock={actions.unlockWallet}
          stepState={accountState}
          errorMessage={error}
        />
      }
      checkNetworkContent={
        <StepCheckNetwork
          supportedNetworks={supportedNetworks}
          defaultNetwork={defaultNetwork}
          onSwitchNetwork={actions.switchNetwork}
          stepState={networkState}
          errorMessage={error}
        />
      }
      checkSignContent={
        <StepCheckSign
          onSign={actions.signIn}
          onDisconnect={handleDisconnect}
          stepState={signState}
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
