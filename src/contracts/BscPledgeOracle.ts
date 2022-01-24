import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext,
} from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>;
  send(options: SendOptions, callback: (error: Error, result: any) => void): PromiEvent<TransactionReceipt>;
  estimateGas(options: EstimateGasOptions): Promise<number>;
  estimateGas(options: EstimateGasOptions, callback: (error: Error, result: any) => void): Promise<number>;
  encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;
  call(options: CallOptions): Promise<TCallReturn>;
  call(options: CallOptions, callback: (error: Error, result: TCallReturn) => void): Promise<TCallReturn>;
  encodeABI(): string;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export type ContractContext = Web3ContractContext<
  BscPledgeOracle,
  BscPledgeOracleMethodNames,
  BscPledgeOracleEventsContext,
  BscPledgeOracleEvents
>;
export type BscPledgeOracleEvents = 'OwnershipTransferred';
export interface BscPledgeOracleEventsContext {
  OwnershipTransferred(
    parameters: {
      filter?: { previousOwner?: string | string[]; newOwner?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
}
export type BscPledgeOracleMethodNames =
  | 'new'
  | 'getAssetsAggregator'
  | 'getPrice'
  | 'getPrices'
  | 'getUnderlyingAggregator'
  | 'getUnderlyingPrice'
  | 'owner'
  | 'renounceOwnership'
  | 'setAssetsAggregator'
  | 'setDecimals'
  | 'setPrice'
  | 'setPrices'
  | 'setUnderlyingAggregator'
  | 'setUnderlyingPrice'
  | 'transferOwnership';
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface GetAssetsAggregatorResponse {
  result0: string;
  result1: string;
}
export interface GetUnderlyingAggregatorResponse {
  result0: string;
  result1: string;
}
export interface BscPledgeOracle {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   */
  'new'(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param asset Type: address, Indexed: false
   */
  getAssetsAggregator(asset: string): MethodConstantReturnContext<GetAssetsAggregatorResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param asset Type: address, Indexed: false
   */
  getPrice(asset: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assets Type: uint256[], Indexed: false
   */
  getPrices(assets: string[]): MethodConstantReturnContext<string[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param underlying Type: uint256, Indexed: false
   */
  getUnderlyingAggregator(underlying: string): MethodConstantReturnContext<GetUnderlyingAggregatorResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param underlying Type: uint256, Indexed: false
   */
  getUnderlyingPrice(underlying: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  renounceOwnership(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param asset Type: address, Indexed: false
   * @param aggergator Type: address, Indexed: false
   * @param _decimals Type: uint256, Indexed: false
   */
  setAssetsAggregator(asset: string, aggergator: string, _decimals: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newDecimals Type: uint256, Indexed: false
   */
  setDecimals(newDecimals: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param asset Type: address, Indexed: false
   * @param price Type: uint256, Indexed: false
   */
  setPrice(asset: string, price: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param assets Type: uint256[], Indexed: false
   * @param prices Type: uint256[], Indexed: false
   */
  setPrices(assets: string[], prices: string[]): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param underlying Type: uint256, Indexed: false
   * @param aggergator Type: address, Indexed: false
   * @param _decimals Type: uint256, Indexed: false
   */
  setUnderlyingAggregator(underlying: string, aggergator: string, _decimals: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param underlying Type: uint256, Indexed: false
   * @param price Type: uint256, Indexed: false
   */
  setUnderlyingPrice(underlying: string, price: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  transferOwnership(newOwner: string): MethodReturnContext;
}
