import React from "react";
import { useTranslation } from "react-i18next";

import {
  Box,
  VStack,
  Button,
  Alert,
  Text,
  AlertIcon,
  Progress,
  Select,
  HStack,
} from "@chakra-ui/react";

import { WalletStateType } from "../../types";

export interface StepCheckNetworkProps {
  supportedNetworks: {
    id: number;
    name: string;
    isTestChain: boolean;
    isLocalChain: boolean;
  }[];
  defaultNetwork: number;
  stepState: WalletStateType;
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
      <Box>
        <Alert status="warning">
          <Text fontSize={"xs"}>
            {t("An error has occured during the network check.")}
            <br /> {t("Please try again later.")}
            <br />
            {t("The error code was")}: {errorMessage}
          </Text>
        </Alert>
      </Box>
    );
  };

  const WrongNetwork = () => {
    return (
      <Box>
        <Alert status="warning">
          <AlertIcon />
          <Text fontSize={"xs"}>
            {t("Current network is not supported by this app.")}
            <br />
            {t("Please switch network if you want to continue.")}
          </Text>
        </Alert>
      </Box>
    );
  };

  const NetworkSwitchRequested = () => {
    return (
      <Box>
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
      <Box>
        <Alert status="warning">
          <Text fontSize={"xs"}>
            {t("You rejected the network switch request.")}
            <br /> {t("Please try again if you want to continue.")}
          </Text>
        </Alert>
      </Box>
    );
  };

  const NetworkSwitchFailed = () => {
    return (
      <Box>
        <Alert status="warning">
          <Text fontSize={"xs"}>
            {t("An error has occured during the network switch requesting.")}
            <br /> {t("Please try again later.")}
            <br />
            {t("The error code was")}: {errorMessage}
          </Text>
        </Alert>
      </Box>
    );
  };

  const Content = () => {
    switch (stepState) {
      case WalletStateType.NETWORK_DETECTION_FAILED:
        return <NetworkDetectionFailed />;
      case WalletStateType.WRONG_NETWORK:
        return <WrongNetwork />;
      case WalletStateType.NETWORK_SWITCH_REQUESTED:
        return <NetworkSwitchRequested />;
      case WalletStateType.NETWORK_SWITCH_REJECTED:
        return <NetworkSwitchRejected />;
      case WalletStateType.NETWORK_SWITCH_FAILED:
        return <NetworkSwitchFailed />;
      default:
        return null;
    }
  };

  const SwitchNetworkMenu = () => {
    switch (stepState) {
      case WalletStateType.WRONG_NETWORK:
      case WalletStateType.NETWORK_SWITCH_REJECTED:
        return (
          <HStack spacing={2}>
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
          </HStack>
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
