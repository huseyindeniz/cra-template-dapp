// ConnectionModal.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SUPPORTED_NETWORKS, DEFAULT_NETWORK } from '../../../config';
import { WalletNetworkStateType } from '../../../models/WalletGlobalState';

import { CheckNetwork } from './CheckNetwork';

const supportedNetworks = SUPPORTED_NETWORKS.map(network => {
  return {
    id: network.chainId,
    name: network.chainName,
    isTestChain: network.isTestChain,
    isLocalChain: network.isLocalChain,
  };
});
const defaultNetwork = DEFAULT_NETWORK.chainId;

export default {
  title: 'wallet/ConnectionModal/Steps/CheckNetwork',
  component: CheckNetwork,
} as ComponentMeta<typeof CheckNetwork>;

const Template: ComponentStory<typeof CheckNetwork> = args => (
  <CheckNetwork {...args} />
);

// IDLE
export const CheckNetworkIdle = Template.bind({});

// NETWORK_REQUESTED
export const NetworkRequested = Template.bind({});
NetworkRequested.args = {
  stepState: WalletNetworkStateType.NETWORK_REQUESTED,
};

// NETWORK_DETECTION_FAILED
export const NetworkDetectionFailed = Template.bind({});
NetworkDetectionFailed.args = {
  errorMessage: 'MockNetworkDetectionFailedErrorCode',
  stepState: WalletNetworkStateType.NETWORK_DETECTION_FAILED,
};

// WRONG_NETWORK
export const WrongNetwork = Template.bind({});
WrongNetwork.args = {
  supportedNetworks: supportedNetworks,
  defaultNetwork: defaultNetwork,
  onSwitchNetwork: () => null,
  errorMessage: null,
  stepState: WalletNetworkStateType.WRONG_NETWORK,
};

// NETWORK_SWITCH_REQUESTED
export const NetworkSwitchRequested = Template.bind({});
NetworkSwitchRequested.args = {
  stepState: WalletNetworkStateType.NETWORK_SWITCH_REQUESTED,
};

// NETWORK_SWITCH_REJECTED
export const NetworkSwitchRejected = Template.bind({});
NetworkSwitchRejected.args = {
  supportedNetworks: supportedNetworks,
  defaultNetwork: defaultNetwork,
  onSwitchNetwork: () => null,
  errorMessage: null,
  stepState: WalletNetworkStateType.NETWORK_SWITCH_REJECTED,
};

// NETWORK_SWITCH_FAILED
export const NetworkSwitchFailed = Template.bind({});
NetworkSwitchFailed.args = {
  errorMessage: 'MockNetworkSwitchFailedErrorCode',
  stepState: WalletNetworkStateType.NETWORK_SWITCH_FAILED,
};

// NETWORK_LOADED
export const NetworkLoaded = Template.bind({});
NetworkLoaded.args = {
  stepState: WalletNetworkStateType.NETWORK_LOADED,
};
