import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Heading,
  Divider,
  Stack,
  useToast,
  IconButton,
  Text,
  Image,
  HStack,
  VStack,
} from "@chakra-ui/react";
import useTypedSelector from "../../hooks/useTypedSelector";
import { MdContentCopy } from "@react-icons/all-files/md/MdContentCopy";

import { Identicon } from "../../features/wallet/components/ProfileDropdownMenu/Identicon";
import useActions from "../../features/wallet/useActions";
import { BlockInfo } from "../../features/wallet/components/BlockInfo";

const Header: React.FC = () => {
  const { t } = useTranslation("PageUser");
  const toast = useToast();
  const actions = useActions();
  const account = useTypedSelector((state) => state.wallet.account);
  const currentNetwork = useTypedSelector(
    (state) => state.wallet.currentNetwork
  );

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("get latest block");
      actions.latestBlock();
    }, 15000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNetwork]);

  return (
    <>
      {account && (
        <Stack spacing={2} align={"center"}>
          <Text>User Dashboard</Text>
          <Identicon account={account?.address} size={48} /> : null
          <Heading mb={2} fontSize={"lg"}>
            <VStack>
              <Text>
                {account?.ens ? account?.ens : account?.shortAddress}
                <IconButton
                  ml={2}
                  mt={-1}
                  size="xs"
                  aria-label="Copy address"
                  icon={<MdContentCopy />}
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(account?.address);
                    toast({
                      title: t("Address copied."),
                      description: t(
                        "The address of your account has been copied to the clipboard."
                      ),
                      status: "info",
                      isClosable: true,
                    });
                  }}
                />
              </Text>
            </VStack>
          </Heading>
          <HStack p={2}>
            <Image
              width={"24px"}
              objectFit="cover"
              src={
                "assets/images/chains/" + currentNetwork?.chain.chainId + ".png"
              }
            />
            <Text>{currentNetwork?.chain.chainName}</Text>
          </HStack>
          <BlockInfo />
          <Divider />
        </Stack>
      )}
    </>
  );
};

export default Header;
