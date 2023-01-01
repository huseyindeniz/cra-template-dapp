import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Heading, Divider, Text, HStack, Flex } from "@chakra-ui/react";

import { BlockInfo, NetworkLogo, useActions } from "../../features/wallet";

import useTypedSelector from "../../hooks/useTypedSelector";

export const Header: React.FC = () => {
  const { t } = useTranslation("PageUser");
  const actions = useActions();
  const account = useTypedSelector((state) => state.wallet.account);
  const currentNetwork = useTypedSelector(
    (state) => state.wallet.currentNetwork
  );

  useEffect(() => {
    const interval = setInterval(() => {
      actions.latestBlock();
    }, 15000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNetwork]);

  return (
    <>
      {account && (
        <>
          <Heading size={"xs"} textAlign="center">
            {t("User Dashboard")}
          </Heading>
          <Divider />
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <HStack mr={1}>
              {currentNetwork && (
                <NetworkLogo
                  networkId={currentNetwork?.chainId}
                  networkName={currentNetwork?.chainName}
                />
              )}
              <Text fontSize={"xs"}>{currentNetwork?.chainName}</Text>
            </HStack>
            <BlockInfo />
          </Flex>
          <Divider />
        </>
      )}
    </>
  );
};
