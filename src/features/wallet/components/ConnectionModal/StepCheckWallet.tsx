import React from "react";
import { useTranslation } from "react-i18next";

import {
  Box,
  Link,
  Image,
  VStack,
  Button,
  Text,
  Alert,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt";

import metamaskLogo from "../../assets/mm-logo.svg";
import { WalletStateType } from "../../types";

export interface StepCheckWalletProps {
  stepState: WalletStateType;
  onCancel: () => void;
}

export const StepCheckWallet: React.FC<StepCheckWalletProps> = ({
  stepState,
  onCancel,
}) => {
  const { t } = useTranslation("FeatureWallet");
  const isVisible: boolean =
    stepState === WalletStateType.NOT_SUPPORTED ||
    stepState === WalletStateType.INIT_FAILED;
  return isVisible ? (
    <VStack>
      <Box>
        <Alert status="warning">
          <Image width={"25%"} src={metamaskLogo} alt="Metamask" m={2} />
          <Text fontSize={"xs"}>
            {t(
              "The Metamask wallet extension is not detected in your browser."
            )}
            <br />
            {t(
              "In order to use this app, please install the Metamask extension for your browser from the official link below and try again."
            )}
          </Text>
        </Alert>
      </Box>
      <Box>
        <Button
          size={"xs"}
          variant={"outline"}
          rightIcon={<FaExternalLinkAlt />}
        >
          <Link href="https://metamask.io/" isExternal>
            https://metamask.io/
          </Link>
        </Button>
        <Button size={"xs"} onClick={() => onCancel()} variant={"outline"}>
          {t("Cancel")}
        </Button>
      </Box>
    </VStack>
  ) : null;
};
