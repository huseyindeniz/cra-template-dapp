import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import useTypedSelector from '../../../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

import { DropdownMenu } from './DropdownMenu';

export const ProfileDropdownMenu: React.FC = () => {
  const { t } = useTranslation('FeatureWallet');
  const navigate = useNavigate();
  const toast = useToast();
  const actions = useActions();
  const account = useTypedSelector(state => state.wallet.account.account);
  const currentNetwork = useTypedSelector(
    state => state.wallet.network.network
  );

  const [addressExplorerUrl, setAddressExplorerUrl] = useState<string>('');
  const [ensOrAddressTruncated, setensOrAddressTruncated] =
    useState<string>('');

  useEffect(() => {
    if (currentNetwork) {
      setAddressExplorerUrl(
        `${currentNetwork.blockExplorerUrls[0]}/${currentNetwork.addressExplorerUrl}`
      );
    }
  }, [currentNetwork]);

  useEffect(() => {
    if (account) {
      const ensOrAddress: string =
        account.ens && account.ens !== '' ? account.ens : account.shortAddress;
      setensOrAddressTruncated(
        ensOrAddress && ensOrAddress.length > 20
          ? ensOrAddress?.slice(0, 4) + '...' + ensOrAddress?.slice(-6)
          : ensOrAddress
      );
    }
  }, [account]);

  const onCopyClicked = () => {
    navigator.clipboard.writeText(account?.address ?? '');
    toast({
      title: t('Address copied.'),
      description: t(
        'The address of your account has been copied to the clipboard.'
      ),
      status: 'info',
      isClosable: true,
    });
  };

  const onDisconnectClick = () => {
    actions.disconnectWallet();
    navigate('/');
  };

  return account && account.address && account.address !== '' ? (
    <DropdownMenu
      address={account.address}
      ensOrAddressTruncated={ensOrAddressTruncated ?? ''}
      currentNetwork={currentNetwork}
      addressExplorerUrl={addressExplorerUrl}
      onCopyAddressClicked={onCopyClicked}
      onDisconnectClicked={onDisconnectClick}
    />
  ) : null;
};
