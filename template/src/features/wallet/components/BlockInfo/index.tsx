import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Flex, IconButton, Tag } from "@chakra-ui/react";
import { MdRefresh } from "@react-icons/all-files/md/MdRefresh";

import useTypedSelector from "../../../../hooks/useTypedSelector";
import { useActions } from "../../useActions";
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
      actions.latestBlock();
      const interval = setInterval(() => {
        actions.latestBlock();
      }, 15000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNetwork]);

  return (
    <>
      {blockInfo && (
        <Flex>
          <Box fontSize="xs" mr={1}>
            <Tag>
              {t("Block")}: {blockInfo.blockNumber}
            </Tag>
          </Box>
          <Box fontSize="xs" mr={1}>
            <Tag>
              {t("Balance")}
              {`: ${parseFloat(blockInfo.signerAccountBalance).toFixed(2)} ${
                currentNetwork?.nativeCurrency.symbol
              }`}
            </Tag>
          </Box>
          <IconButton
            isLoading={blockInfoLoading === LoadingStatusType.PENDING}
            icon={<MdRefresh />}
            variant="outline"
            size="xs"
            aria-label="refresh"
            onClick={() => actions.latestBlock()}
          />
        </Flex>
      )}
    </>
  );
};
