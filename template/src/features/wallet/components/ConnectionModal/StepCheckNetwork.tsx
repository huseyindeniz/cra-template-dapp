import React from "react";
import { useTranslation } from "react-i18next";
import { Box, VStack, Button, Text, Progress, Select } from "@chakra-ui/react";
import { AlertMessage } from "../../../ui";

import { WalletNetworkStateType } from "../../types";

export interface StepCheckNetworkProps {
  supportedNetworks: {
    id: number;
    name: string;
    isTestChain: boolean;
    isLocalChain: boolean;
  }[];
  defaultNetwork: number;
  stepState: WalletNetworkStateType;
  errorMessage: string | null;
  onSwitchNetwork: (id: number) => void;
}

export const StepCheckNetwork: React.FC<StepCheckNetworkProps> = ({
  supportedNetworks,
  defaultNetwork,
  stepState,
  errorMessage,
  onSwitchNetwork,
}) => {
  const { t } = useTranslation("FeatureWallet");
  const [selectedNetwork, setSelectedNetwork] =
    React.useState<number>(defaultNetwork);

  const NetworkDetectionFailed = () => {
    return (
      <Box w="full">
        <AlertMessage status="warning" title={t("Unexpected Error")}>
          <Text fontSize={"xs"}>
            {t("An error has occured during the network check.")}
            <br /> {t("Please try again later.")}
            <br />
            {t("The error code was")}: {errorMessage}
          </Text>
        </AlertMessage>
      </Box>
    );
  };

  const WrongNetwork = () => {
    return (
      <Box w="full">
        <AlertMessage status="warning" title={t("Unsupported Network")}>
          <Text fontSize={"xs"}>
            {t("Current network is not supported by this app.")}
            <br />
            {t(
              "If you want to continue, please switch to any supported network. "
            )}
          </Text>
        </AlertMessage>
      </Box>
    );
  };

  const NetworkSwitchRequested = () => {
    return (
      <Box w="full">
        <Progress size="xs" isIndeterminate colorScheme={"yellow"} />
        <Text fontSize={"xs"}>
          {t("Waiting for the network switch request to be accepted.")}
          <br /> {t("Please check your Metamask wallet.")}
        </Text>
      </Box>
    );
  };

  const NetworkSwitchRejected = () => {
    return (
      <Box w="full">
        <AlertMessage status="warning" title={t("Switch Rejected")}>
          <Text fontSize={"xs"}>
            {t("You rejected the network switch request.")}
            <br /> {t("Please try again if you want to continue.")}
          </Text>
        </AlertMessage>
      </Box>
    );
  };

  const NetworkSwitchFailed = () => {
    return (
      <Box w="full">
        <AlertMessage status="warning" title={t("Unexpected Error")}>
          <Text fontSize={"xs"}>
            {t("An error has occured during the network switch request.")}
            <br /> {t("Please try again later.")}
            <br />
            {t("The error code was")}: {errorMessage}
          </Text>
        </AlertMessage>
      </Box>
    );
  };

  const Content = () => {
    switch (stepState) {
      case WalletNetworkStateType.NETWORK_DETECTION_FAILED:
        return <NetworkDetectionFailed />;
      case WalletNetworkStateType.WRONG_NETWORK:
        return <WrongNetwork />;
      case WalletNetworkStateType.NETWORK_SWITCH_REQUESTED:
        return <NetworkSwitchRequested />;
      case WalletNetworkStateType.NETWORK_SWITCH_REJECTED:
        return <NetworkSwitchRejected />;
      case WalletNetworkStateType.NETWORK_SWITCH_FAILED:
        return <NetworkSwitchFailed />;
      default:
        return null;
    }
  };

  const SwitchNetworkMenu = () => {
    switch (stepState) {
      case WalletNetworkStateType.WRONG_NETWORK:
      case WalletNetworkStateType.NETWORK_SWITCH_REJECTED:
        return (
          <VStack spacing={2}>
            <Select
              size={"md"}
              defaultValue={defaultNetwork}
              onChange={(event) =>
                setSelectedNetwork(parseInt(event.target.value))
              }
            >
              {supportedNetworks.map((network) => {
                let networkName = network.name;
                networkName = network.isLocalChain
                  ? `(Local) ${networkName}`
                  : networkName;
                networkName = network.isTestChain
                  ? `(TestNet) ${networkName}`
                  : networkName;
                return (
                  <option key={network.id} value={network.id}>
                    {networkName}
                  </option>
                );
              })}
            </Select>
            <Box>
              <Button
                variant={"solid"}
                colorScheme={"yellow"}
                onClick={() => onSwitchNetwork(selectedNetwork)}
              >
                {t("Switch Network")}
              </Button>
            </Box>
          </VStack>
        );
      default:
        return null;
    }
  };

  return (
    <VStack>
      <Content />
      <SwitchNetworkMenu />
    </VStack>
  );
};
