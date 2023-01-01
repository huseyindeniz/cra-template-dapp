import { ChainInfoType } from "./types";

import { AvalancheChain } from "./chains/avalanche";
import { AvalancheTestChain } from "./chains/avalancheTest";
import { GanacheChain } from "./chains/ganache";
import { BinanceSmartChain } from "./chains/bsc";
import { BSCTestChain } from "./chains/bscTest";
import { PolygonChain } from "./chains/polygon";
import { PolygonMumbaiChain } from "./chains/polygonMumbai";
import { HardhatChain } from "./chains/hardhat";
import { GoerliTestChain } from "./chains/goerliTest";
import { EthereumMainnetChain } from "./chains/ethereum";

export const SUPPORTED_NETWORKS: ChainInfoType[] = [
  AvalancheChain,
  BinanceSmartChain,
  PolygonChain,
  EthereumMainnetChain,
  AvalancheTestChain,
  BSCTestChain,
  PolygonMumbaiChain,
  GoerliTestChain,
  GanacheChain,
  HardhatChain,
];
export const DEFAULT_NETWORK = AvalancheChain;
export const SIGN_TIMEOUT_IN_SEC = 60;
export const SLOW_DOWN_IN_MS = 1000;
