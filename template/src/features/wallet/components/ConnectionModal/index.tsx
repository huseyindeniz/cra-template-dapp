import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useSteps } from "chakra-ui-steps";

import { Modal } from "./Modal";
import { WalletStateType } from "../../types";
import { StepCheckWallet } from "./StepCheckWallet";
import { StepCheckNetwork } from "./StepCheckNetwork";
import { StepCheckUnlock } from "./StepCheckUnlock";
import { StepCheckSign } from "./StepCheckSign";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import { SUPPORTED_NETWORKS, DEFAULT_NETWORK } from "../../config";
import useActions from "../../useActions";

export interface ConnectionModalProps {
  walletState: WalletStateType;
}

export const ConnectionModal: React.FC<ConnectionModalProps> = ({
  walletState,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const actions = useActions();
  const error = useTypedSelector((state) => state.wallet.error);
  const signCounter = useTypedSelector((state) => state.wallet.signCounter);
  const { setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [stepState, setStepState] =
    useState<"error" | "loading" | undefined>(undefined);
  const defaultNetwork = DEFAULT_NETWORK.chainId;
  const supportedNetworks = SUPPORTED_NETWORKS.map((network) => {
    return {
      id: network.chainId,
      name: network.chainName,
      isTestChain: network.isTestChain,
      isLocalChain: network.isLocalChain,
    };
  });

  const handleDisconnect = () => {
    onClose();
    actions.disconnectWallet();
  };

  useEffect(() => {
    walletState !== null &&
    walletState !== undefined &&
    walletState !== WalletStateType.NOT_INITIALIZED &&
    walletState !== WalletStateType.AUTHENTICATED
      ? onOpen()
      : onClose();

    switch (walletState) {
      // STEP 0
      case WalletStateType.NOT_INITIALIZED:
      case WalletStateType.INIT_REQUESTED:
      case WalletStateType.NOT_SUPPORTED:
        setStep(0);
        break;
      // STEP 1
      case WalletStateType.ACCOUNT_REQUESTED:
      case WalletStateType.ACCOUNT_DETECTION_FAILED:
      case WalletStateType.LOCKED:
      case WalletStateType.UNLOCK_REQUESTED:
      case WalletStateType.UNLOCK_REJECTED:
      case WalletStateType.UNLOCK_FAILED:
        setStep(1);
        break;
      // STEP 2
      case WalletStateType.NETWORK_REQUESTED:
      case WalletStateType.NETWORK_DETECTION_FAILED:
      case WalletStateType.WRONG_NETWORK:
      case WalletStateType.NETWORK_SWITCH_REQUESTED:
      case WalletStateType.NETWORK_SWITCH_REJECTED:
      case WalletStateType.NETWORK_SWITCH_FAILED:
        setStep(2);
        break;
      // STEP 3
      case WalletStateType.NOT_SIGNED:
      case WalletStateType.SIGN_REQUESTED:
      case WalletStateType.SIGN_REJECTED:
      case WalletStateType.SIGN_TIMED_OUT:
      case WalletStateType.SIGN_FAILED:
      case WalletStateType.SIGNED:
      case WalletStateType.AUTHENTICATED:
        setStep(3);
        break;
      default:
        reset();
        break;
    }

    switch (walletState) {
      // STEP 0
      case WalletStateType.NOT_INITIALIZED:
      case WalletStateType.SIGNED:
      case WalletStateType.AUTHENTICATED:
        setStepState(undefined);
        break;
      case WalletStateType.INIT_REQUESTED:
      case WalletStateType.ACCOUNT_REQUESTED:
      case WalletStateType.UNLOCK_REQUESTED:
      case WalletStateType.NETWORK_REQUESTED:
      case WalletStateType.NETWORK_SWITCH_REQUESTED:
      case WalletStateType.SIGN_REQUESTED:
        setStepState("loading");
        break;
      case WalletStateType.NOT_SUPPORTED:
      case WalletStateType.ACCOUNT_DETECTION_FAILED:
      case WalletStateType.LOCKED:
      case WalletStateType.UNLOCK_REJECTED:
      case WalletStateType.UNLOCK_FAILED:
      case WalletStateType.NETWORK_DETECTION_FAILED:
      case WalletStateType.WRONG_NETWORK:
      case WalletStateType.NETWORK_SWITCH_REJECTED:
      case WalletStateType.NETWORK_SWITCH_FAILED:
      case WalletStateType.NOT_SIGNED:
      case WalletStateType.SIGN_REJECTED:
      case WalletStateType.SIGN_TIMED_OUT:
      case WalletStateType.SIGN_FAILED:
        setStepState("error");
        break;
      default:
        setStepState(undefined);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletState]);

  return (
    <Modal
      checkWalletContent={
        <StepCheckWallet stepState={walletState} onCancel={handleDisconnect} />
      }
      checkUnlockContent={
        <StepCheckUnlock
          onUnlock={actions.unlockWallet}
          stepState={walletState}
          errorMessage={error}
        />
      }
      checkNetworkContent={
        <StepCheckNetwork
          supportedNetworks={supportedNetworks}
          defaultNetwork={defaultNetwork}
          onSwitchNetwork={actions.switchNetwork}
          stepState={walletState}
          errorMessage={error}
        />
      }
      checkSignContent={
        <StepCheckSign
          onSign={actions.signIn}
          onDisconnect={handleDisconnect}
          stepState={walletState}
          signCounter={signCounter}
          errorMessage={error}
        />
      }
      activeStep={activeStep}
      isOpen={isOpen}
      onDisconnect={handleDisconnect}
      stepState={stepState}
    />
  );
};
