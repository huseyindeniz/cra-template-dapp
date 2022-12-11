import { ChainInfoType, SignMessage } from "./types";
import { LangCode } from "../../config/types";

import { AvalancheChain } from "./chains/avalanche";
import { AvalancheFujiChain } from "./chains/avalancheFuji";
import { GanacheChain } from "./chains/ganache";
import { EthereumMainnetChain } from "./chains/ethereum";

export const SUPPORTED_NETWORKS: ChainInfoType[] = [
  AvalancheChain,
  AvalancheFujiChain,
  GanacheChain,
  EthereumMainnetChain,
];
export const DEFAULT_NETWORK = AvalancheChain;
export const SIGN_TIMEOUT_IN_SEC = 60;
export const SLOW_DOWN_IN_MS = 1000;

export const WalletSignMessage: SignMessage = {
  [LangCode.EN_US]:
    "Hi there from My Awesome dApp!" +
    "\nSign this message to prove you have access to this wallet and I'll log you in." +
    "\nThis won't cost you any token." +
    "\nTo stop hackers using your wallet, here's a unique message ID they can't guess:" +
    "\n",
  [LangCode.TR_TR]:
    "Harika Merkeziyetsiz Uygulamam'dan merhaba!" +
    "\nBu cüzdana erişiminiz olduğunu kanıtlamak için bu mesajı imzalayın, ben de oturumunuzu açayım." +
    "\nBu size herhangi bir jetona mal olmayacak." +
    "\nBilgisayar korsanlarının cüzdanınızı kullanmasını durdurmak için işte tahmin edemeyecekleri benzersiz bir mesaj kimliği:" +
    "\n",
};
