import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, HStack, IconButton, Tag, VStack } from "@chakra-ui/react";
import { MdRefresh } from "@react-icons/all-files/md/MdRefresh";

import useTypedSelector from "../../../../hooks/useTypedSelector";
import useActions from "../../useActions";
import { LoadingStatusType } from "../../types";

export const BlockInfo: React.FC = () => {
  const { t } = useTranslation("PageUser");
  const actions = useActions();
  const currentNetwork = useTypedSelector(
    (state) => state.wallet.currentNetwork
  );
  const blockInfoLoading = useTypedSelector(
    (state) => state.wallet.blockInfoLoading
  );
  const blockInfo = useTypedSelector((state) => state.wallet.blockInfo);

  useEffect(() => {
    if (currentNetwork) {
      const interval = setInterval(() => {
        console.log("get latest block");
        actions.latestBlock();
      }, 15000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNetwork]);

  useEffect(() => {
    actions.latestBlock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HStack m={2}>
      {blockInfo && (
        <VStack shadow={"md"} p={2}>
          <Box fontSize={"md"}>
            <Tag>{t("Block")}</Tag> {blockInfo.blockNumber}
          </Box>
          <Box fontSize={"md"}>
            <Tag>{t("Balance")}</Tag> {blockInfo.signerAccountBalance}{" "}
            {currentNetwork?.chain.nativeCurrency.symbol}
          </Box>
        </VStack>
      )}
      <Box>
        <IconButton
          isLoading={blockInfoLoading === LoadingStatusType.PENDING}
          icon={<MdRefresh />}
          variant={"outline"}
          size={"xs"}
          aria-label="refresh"
          onClick={() => actions.latestBlock()}
        />
      </Box>
    </HStack>
  );
};
