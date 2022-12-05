import React from "react";
import { useTranslation } from "react-i18next";

import {
  Box,
  VStack,
  Button,
  Alert,
  AlertIcon,
  Text,
  Progress,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

import { WalletStateType } from "../../types";

export interface StepCheckSignProps {
  stepState: WalletStateType;
  errorMessage: string | null;
  signCounter: number;
  onSign: () => void;
  onDisconnect: () => void;
}

export const StepCheckSign: React.FC<StepCheckSignProps> = ({
  stepState,
  errorMessage,
  signCounter,
  onSign,
  onDisconnect,
}) => {
  const { t } = useTranslation("FeatureWallet");

  const NotSigned = () => {
    return (
      <Box>
        <Alert status="warning">
          <Text fontSize={"xs"}>
            {t(
              "In order to use this app, you need to sign the login request in your wallet."
            )}
          </Text>
        </Alert>
      </Box>
    );
  };
  const SignRequested = () => {
    return (
      <Box>
        <CircularProgress value={(100 * signCounter) / 60} color={"yellow.400"}>
          <CircularProgressLabel>{signCounter}s</CircularProgressLabel>
        </CircularProgress>
        <Text fontSize={"xs"}>
          {t("Waiting for the login request to be signed.")}
          <br />
          {t("Please check your Metamask wallet.")}
        </Text>
      </Box>
    );
  };
  const SignRejected = () => {
    return (
      <Box>
        <Alert status="warning">
          <Text fontSize={"xs"}>
            {t("You rejected the sign request.")}
            <br /> {t("Please try again if you want to continue.")}
          </Text>
        </Alert>
      </Box>
    );
  };
  const SignTimedOut = () => {
    return (
      <Box>
        <Alert status="warning">
          <Text fontSize={"xs"}>
            {t("You didn't respond to the sign request in time.")}
            <br /> {t("Please try again if you want to continue.")}
          </Text>
        </Alert>
      </Box>
    );
  };
  const SignFailed = () => {
    return (
      <Box>
        <Alert status="warning">
          <Text fontSize={"xs"}>
            {t("An error has occured during the sign check.")}
            <br /> {t("Please try again later.")}
            <br />
            {t("The error code was")}: {errorMessage}
          </Text>
        </Alert>
      </Box>
    );
  };
  const Signed = () => {
    return (
      <Box>
        <Alert status="success">
          <AlertIcon />
          {t("You have successfully signed the login request.")}
          <br />
          {t("Redirecting to app...")}
        </Alert>
        <Progress size="xs" colorScheme={"green"} isIndeterminate />
      </Box>
    );
  };

  const Content = () => {
    switch (stepState) {
      case WalletStateType.NOT_SIGNED:
        return <NotSigned />;
      case WalletStateType.SIGN_REQUESTED:
        return <SignRequested />;
      case WalletStateType.SIGN_REJECTED:
        return <SignRejected />;
      case WalletStateType.SIGN_TIMED_OUT:
        return <SignTimedOut />;
      case WalletStateType.SIGN_FAILED:
        return <SignFailed />;
      case WalletStateType.SIGNED:
        return <Signed />;
      default:
        return null;
    }
  };

  const SignButton = () => {
    switch (stepState) {
      case WalletStateType.NOT_SIGNED:
      case WalletStateType.SIGN_REJECTED:
      case WalletStateType.SIGN_TIMED_OUT:
        return (
          <Box>
            <Button
              variant={"solid"}
              colorScheme={"yellow"}
              onClick={() => onSign()}
            >
              {t("Sign In")}
            </Button>
            <Button ml={1} variant={"outline"} onClick={() => onDisconnect()}>
              {t("Cancel")}
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
      <SignButton />
    </VStack>
  );
};
