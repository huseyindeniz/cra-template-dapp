import React from "react";
import { useTranslation } from "react-i18next";
import { Box, VStack, Button, Alert, Text, Progress } from "@chakra-ui/react";

import { WalletStateType } from "../../types";

export interface StepCheckUnlockProps {
  stepState: WalletStateType;
  errorMessage: string | null;
  onUnlock: () => void;
}

export const StepCheckUnlock: React.FC<StepCheckUnlockProps> = ({
  stepState,
  errorMessage,
  onUnlock,
}) => {
  const { t } = useTranslation("FeatureWallet");

  const AccountDetectionFailed = () => {
    return (
      <Box>
        <Alert status="warning">
          <Text fontSize={"xs"}>
            {t("An error has occured during the wallet status check.")}
            <br /> {t("Please try again later.")}
            <br />
            {t("The error code was")}: {errorMessage}
          </Text>
        </Alert>
      </Box>
    );
  };

  const Locked = () => {
    return (
      <Box>
        <Alert status="warning">
          <Text fontSize={"xs"}>
            {t("Your wallet is locked.")}
            <br />
            {t("Please unlock your wallet if you want to continue.")}
          </Text>
        </Alert>
      </Box>
    );
  };

  const UnlockRequested = () => {
    return (
      <Box>
        <Progress size="xs" isIndeterminate colorScheme={"yellow"} />
        <Text fontSize={"xs"}>
          {t("Waiting for the unlock wallet request to be accepted.")}
          <br />
          {t("Please check your Metamask wallet.")}
        </Text>
      </Box>
    );
  };

  const UnlockRejected = () => {
    return (
      <Box>
        <Alert status="warning">
          <Text fontSize={"xs"}>
            {t("You rejected the unlock wallet request.")}
            <br />
            {t("Please try again if you want to continue.")}
          </Text>
        </Alert>
      </Box>
    );
  };

  const UnlockFailed = () => {
    return (
      <Box>
        <Alert status="warning">
          <Text fontSize={"xs"}>
            {t("An error has occured during the unlock wallet check.")}
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
      case WalletStateType.ACCOUNT_DETECTION_FAILED:
        return <AccountDetectionFailed />;
      case WalletStateType.LOCKED:
        return <Locked />;
      case WalletStateType.UNLOCK_REQUESTED:
        return <UnlockRequested />;
      case WalletStateType.UNLOCK_REJECTED:
        return <UnlockRejected />;
      case WalletStateType.UNLOCK_FAILED:
        return <UnlockFailed />;
      default:
        return null;
    }
  };

  const UnlockButton = () => {
    switch (stepState) {
      case WalletStateType.LOCKED:
      case WalletStateType.UNLOCK_REJECTED:
        return (
          <Box>
            <Button
              variant={"solid"}
              colorScheme={"yellow"}
              onClick={() => onUnlock()}
            >
              {t("Unlock Wallet")}
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <VStack>
      <Content />
      <UnlockButton />
    </VStack>
  );
};
