import { ChainInfoType } from "./types";

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
