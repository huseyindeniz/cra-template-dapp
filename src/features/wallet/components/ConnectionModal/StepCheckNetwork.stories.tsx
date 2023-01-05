// ConnectionModal.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { WalletNetworkStateType } from "../../types";

import { Modal } from "./Modal";
import { StepCheckNetwork } from "./StepCheckNetwork";
import { SUPPORTED_NETWORKS, DEFAULT_NETWORK } from "../../config";

const supportedNetworks = SUPPORTED_NETWORKS.map((network) => {
  return {
    id: network.chainId,
    name: network.chainName,
    isTestChain: network.isTestChain,
    isLocalChain: network.isLocalChain,
  };
});
const defaultNetwork = DEFAULT_NETWORK.chainId;

export default {
  title: "wallet/Modal/CheckNetwork",
  component: Modal,
  args: {
    isOpen: true,
    activeStep: 2,
    checkWalletContent: null,
    checkUnlockContent: null,
    checkSignContent: "mock checkSign content",
    onDisconnect: () => null,
  },
} as ComponentMeta<typeof Modal>;

export const Default: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args} />
);

// NETWORK_REQUESTED
export const NetworkRequested = Default.bind({});
NetworkRequested.args = {
  stepState: "loading",
  checkNetworkContent: (
    <StepCheckNetwork
      supportedNetworks={supportedNetworks}
      defaultNetwork={defaultNetwork}
      onSwitchNetwork={() => null}
      errorMessage={null}
      stepState={WalletNetworkStateType.NETWORK_REQUESTED}
    />
  ),
};

// NETWORK_DETECTION_FAILED
export const NetworkDetectionFailed = Default.bind({});
NetworkDetectionFailed.args = {
  stepState: "error",
  checkNetworkContent: (
    <StepCheckNetwork
      supportedNetworks={supportedNetworks}
      defaultNetwork={defaultNetwork}
      onSwitchNetwork={() => null}
      errorMessage="mock error code"
      stepState={WalletNetworkStateType.NETWORK_DETECTION_FAILED}
    />
  ),
};

// WRONG_NETWORK
export const WrongNetwork = Default.bind({});
WrongNetwork.args = {
  stepState: "error",
  checkNetworkContent: (
    <StepCheckNetwork
      supportedNetworks={supportedNetworks}
      defaultNetwork={defaultNetwork}
      onSwitchNetwork={() => null}
      errorMessage={null}
      stepState={WalletNetworkStateType.WRONG_NETWORK}
    />
  ),
};

// NETWORK_SWITCH_REQUESTED
export const NetworkSwitchRequested = Default.bind({});
NetworkSwitchRequested.args = {
  stepState: "loading",
  checkNetworkContent: (
    <StepCheckNetwork
      supportedNetworks={supportedNetworks}
      defaultNetwork={defaultNetwork}
      onSwitchNetwork={() => null}
      errorMessage={null}
      stepState={WalletNetworkStateType.NETWORK_SWITCH_REQUESTED}
    />
  ),
};

// NETWORK_SWITCH_FAILED
export const NetworkSwitchFailed = Default.bind({});
NetworkSwitchFailed.args = {
  stepState: "error",
  checkNetworkContent: (
    <StepCheckNetwork
      supportedNetworks={supportedNetworks}
      defaultNetwork={defaultNetwork}
      onSwitchNetwork={() => null}
      errorMessage="mock error code"
      stepState={WalletNetworkStateType.NETWORK_SWITCH_FAILED}
    />
  ),
};

// UNLOCK_REJECTED
export const NetworkSwitchRejected = Default.bind({});
NetworkSwitchRejected.args = {
  stepState: "error",
  checkNetworkContent: (
    <StepCheckNetwork
      supportedNetworks={supportedNetworks}
      defaultNetwork={defaultNetwork}
      onSwitchNetwork={() => null}
      errorMessage={null}
      stepState={WalletNetworkStateType.NETWORK_SWITCH_REJECTED}
    />
  ),
};

// NETWORK_LOADED
export const NetworkLoaded = Default.bind({});
NetworkLoaded.args = {
  checkNetworkContent: (
    <StepCheckNetwork
      supportedNetworks={supportedNetworks}
      defaultNetwork={defaultNetwork}
      onSwitchNetwork={() => null}
      errorMessage={null}
      stepState={WalletNetworkStateType.NETWORK_LOADED}
    />
  ),
};
