import { ethers } from 'ethers';
import { eventChannel, EventChannel } from 'redux-saga';

import { SUPPORTED_NETWORKS } from '../../../features/wallet/config';
import { AccountType } from '../../../features/wallet/models/account/types/Account';
import { IWalletAPI } from '../../../features/wallet/models/IWalletAPI';

enum MetamaskRPCErrors {
  ACTION_REJECTED = 'ACTION_REJECTED',
}

export class EthersWalletAPI implements IWalletAPI {
  private static _instance: IWalletAPI | null = null;
  private _isUnlocked: boolean = false;
  private _isSigned: boolean = false;
  private _signerAddress: string | null = null;
  private _provider: ethers.providers.Web3Provider | null = null;
  private _network: ethers.providers.Network | null = null;
  private _accountChangeListener: EventChannel<any> | null = null;
  private _networkChangeListener: EventChannel<any> | null = null;

  private constructor() {}

  public static getInstance(): IWalletAPI {
    if (this._instance === null) {
      console.debug('ethers init');
      this._instance = new EthersWalletAPI();
    }
    return this._instance;
  }

  public loadProvider = async () => {
    if (window.ethereum) {
      // only metamask installed
      if (window.ethereum.isMetaMask) {
        this._provider = new ethers.providers.Web3Provider(
          window.ethereum,
          'any'
        );
      }
      // metamask and others installed, select Metamask
      if (window.ethereum.providers) {
        this._provider = new ethers.providers.Web3Provider(
          window.ethereum.providers.find((provider: any) => provider.isMetaMask)
        );
      }
    }
    return this._provider !== null;
  };

  public loadNetwork = async () => {
    await this._provider?.ready;
    this._network = this._provider ? await this._provider.getNetwork() : null;
    const isSupported: boolean = await this._isNetworkSupported(null);
    if (!isSupported) {
      this._network = null;
    }
    return this.getNetwork();
  };

  public getNetwork = () => {
    return SUPPORTED_NETWORKS.find(
      chain => chain.chainId === this._network?.chainId
    );
  };

  public switchNetwork = async (networkId: number) => {
    const isSupported = this._isNetworkSupported(networkId);
    if (!isSupported) {
      return false;
    }
    await this._provider?.ready;
    console.debug('0x' + networkId.toString(16));
    try {
      await this._provider?.send('wallet_switchEthereumChain', [
        { chainId: '0x' + networkId.toString(16) },
      ]);
      return true;
    } catch (error: any) {
      const networkDetails = SUPPORTED_NETWORKS.find(
        chain => chain.chainId === networkId
      );
      await this._provider?.send('wallet_addEthereumChain', [
        {
          chainId: '0x' + networkId.toString(16),
          rpcUrls: networkDetails?.rpcUrls,
          chainName: networkDetails?.chainName,
          nativeCurrency: networkDetails?.nativeCurrency,
          blockExplorerUrls: networkDetails?.blockExplorerUrls,
        },
      ]);
      return false;
    }
  };

  private _isNetworkSupported = async (chainId: number | null) => {
    if (chainId) {
      // check if chainId is in the supported list
      console.debug('isSupported for:', chainId);
      return SUPPORTED_NETWORKS.some(chain => chain.chainId === chainId);
    } else {
      console.debug('isNetworkSupported', this._network);
      return SUPPORTED_NETWORKS.some(
        chain => chain.chainId === this._network?.chainId
      );
    }
  };

  public isEnsSupported = async (chainId: number | null) => {
    console.debug(this._network?.chainId);
    if (chainId) {
      return chainId === 1;
    } else {
      return this._network?.chainId === 1;
    }
  };

  public isUnlocked = async () => {
    const accounts: string[] = await this._provider?.send('eth_accounts', []);
    this._isUnlocked = accounts.length > 0;
    return this._isUnlocked;
  };

  public unlock = async () => {
    await this._provider?.send('eth_requestAccounts', []);
    this._isUnlocked = true;
  };

  public isSigned = async () => {
    return this._isSigned;
  };

  public sign = async (message: string | ethers.utils.Bytes) => {
    const signer = this._provider?.getSigner();
    console.debug('signer', signer);
    message += this._newUUID();
    let signature: string | undefined = undefined;
    try {
      signature = await signer?.signMessage(message);
    } catch (error: any) {
      if (error.code === MetamaskRPCErrors.ACTION_REJECTED) {
        throw new Error('sign_rejected');
      }
    }
    if (signature) {
      const signerAddress: string = await ethers.utils.verifyMessage(
        message,
        signature
      );

      const address: string | undefined = await signer?.getAddress();
      this._isSigned = signerAddress === address;
      this._signerAddress = signerAddress;
    }
  };

  public getSigner = () => {
    return this._signerAddress;
  };

  public getProvider = () => {
    return this._provider;
  };

  // getAccount
  public getAccount = async () => {
    let result: AccountType | null = null;
    if (this._signerAddress) {
      result = {
        address: this._signerAddress,
        shortAddress:
          this._signerAddress.slice(0, 6) +
          '...' +
          this._signerAddress.slice(-4),
        ens: null,
      };
    }
    return result;
  };

  public getEns = async () => {
    if (this._network?.chainId === 1 && this._signerAddress) {
      return await this._provider?.lookupAddress(this._signerAddress);
    }
  };

  // reset
  public reset = async () => {
    window.ethereum.removeAllListeners();
    this._isUnlocked = false;
    this._isSigned = false;
    this._signerAddress = null;
    this._network = null;
    return;
  };

  public listenAccountChange = (): EventChannel<string[]> | undefined => {
    if (this._accountChangeListener) {
      this._accountChangeListener.close();
      this._accountChangeListener = null;
    }
    this._accountChangeListener = eventChannel<string[]>(emit => {
      console.debug('listening for account changes');
      window.ethereum.addListener('accountsChanged', (accounts: string[]) => {
        emit(accounts);
      });

      return (): void => {
        console.debug('account listener closed');
        window.ethereum.removeListener('accountsChanged', emit);
      };
    });
    return this._accountChangeListener;
  };

  public listenNetworkChange = (): EventChannel<string> | undefined => {
    if (this._networkChangeListener) {
      this._networkChangeListener.close();
      this._networkChangeListener = null;
    }
    this._networkChangeListener = eventChannel<string>(emit => {
      console.debug('listening for network changes');
      window.ethereum.on('chainChanged', (chainId: string) => {
        emit(chainId);
      });

      return (): void => {
        console.debug('network listener closed');
        window.ethereum.removeListener('chainChanged', emit);
      };
    });
    return this._networkChangeListener;
  };

  public handleAccountChange = async () => {
    await this.reset();
  };

  public handleNetworkChange = async () => {
    await this.reset();
  };

  public getLatestBlock = async () => {
    console.debug('get latest block called');
    const blockNumber = await this._provider?.getBlockNumber();
    console.debug('block:', blockNumber);
    return blockNumber;
  };

  public getBalance = async () => {
    console.debug('get balance called');
    if (this._signerAddress) {
      const balance = await this._provider?.getBalance(this._signerAddress);
      if (balance) {
        return ethers.utils.formatEther(balance);
      }
    }
    return '';
  };

  private _newUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };
}
