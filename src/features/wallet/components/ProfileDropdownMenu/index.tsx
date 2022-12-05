import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";

import { DropdownMenu } from "./DropdownMenu";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import useActions from "../../useActions";

export const ProfileDropdownMenu: React.FC = () => {
  const { i18n, t } = useTranslation("FeatureWallet");
  const toast = useToast();
  const actions = useActions();
  const account = useTypedSelector((state) => state.wallet.account);
  const [explorerUrl, setExplorerUrl] = useState<string>("");
  const [ensOrAddressTruncated, setensOrAddressTruncated] =
    useState<string>("");
  const currentNetwork = useTypedSelector(
    (state) => state.wallet.currentNetwork
  );

  useEffect(() => {
    if (currentNetwork) {
      setExplorerUrl(currentNetwork.chain.blockExplorerUrls[0]);
    }
  }, [currentNetwork]);

  useEffect(() => {
    if (account) {
      const ensOrAddress: string =
        account.ens && account.ens !== "" ? account.ens : account.shortAddress;
      setensOrAddressTruncated(
        ensOrAddress && ensOrAddress.length > 20
          ? ensOrAddress?.slice(0, 4) + "..." + ensOrAddress?.slice(-6)
          : ensOrAddress
      );
    }
  }, [account]);

  const onCopyClicked = () => {
    navigator.clipboard.writeText(account?.address ?? "");
    toast({
      title: t("Address copied."),
      description: t(
        "The address of your account has been copied to the clipboard."
      ),
      status: "info",
      isClosable: true,
    });
  };

  return account && account.address && account.address !== "" ? (
    <DropdownMenu
      address={account.address}
      currentLangCode={i18n.resolvedLanguage}
      ensOrAddressTruncated={ensOrAddressTruncated ?? ""}
      explorerUrl={explorerUrl}
      onCopyAddressClicked={onCopyClicked}
      onDisconnectClicked={actions.disconnectWallet}
    />
  ) : null;
};
