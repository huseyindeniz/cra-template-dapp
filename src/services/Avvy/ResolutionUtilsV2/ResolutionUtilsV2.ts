/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from '../../../blockchain/types/common';

export interface ResolutionUtilsV2Interface extends utils.Interface {
  functions: {
    'resolveStandard(string,uint256)': FunctionFragment;
    'reverseResolveEVMToName(address)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: 'resolveStandard' | 'reverseResolveEVMToName'
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'resolveStandard',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'reverseResolveEVMToName',
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: 'resolveStandard',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'reverseResolveEVMToName',
    data: BytesLike
  ): Result;

  events: {};
}

export interface ResolutionUtilsV2 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ResolutionUtilsV2Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    resolveStandard(
      name: PromiseOrValue<string>,
      key: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { value: string }>;

    reverseResolveEVMToName(
      addy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string] & { preimage: string }>;
  };

  resolveStandard(
    name: PromiseOrValue<string>,
    key: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  reverseResolveEVMToName(
    addy: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    resolveStandard(
      name: PromiseOrValue<string>,
      key: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    reverseResolveEVMToName(
      addy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    resolveStandard(
      name: PromiseOrValue<string>,
      key: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    reverseResolveEVMToName(
      addy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    resolveStandard(
      name: PromiseOrValue<string>,
      key: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    reverseResolveEVMToName(
      addy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}