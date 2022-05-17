import { atom } from 'recoil';
import currencyInfos from './../constants/currencyInfos';
import type { CurrencyInfos, chainInfoKeys } from './../constants/currencyInfos';

export const currencies = ['BSC_Mainnet', 'BSC_Testnet'] as const;

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80;
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20;

export type CurrencyType = typeof currencies[number];
const defaultChain = currencyInfos[0];

export const currencyState = atom<CurrencyType>({
  key: 'currencyState',
  default: 'BSC_Mainnet',
});

export type BalanceType = Record<CurrencyType, string>;
export const balanceState = atom<BalanceType>({
  key: 'balanceState',
  default: {
    BSC_Mainnet: '',
    BSC_Testnet: '',
  },
});
export const chainInfoState = atom<CurrencyInfos>({
  key: 'chainInfoState',
  default: defaultChain,
});

export const walletModalOpen = atom<boolean>({
  key: 'walletModalOpen',
  default: false,
});
export const userSlippageTolerance = atom<number>({
  key: 'userSlippageTolerance',
  default: INITIAL_ALLOWED_SLIPPAGE,
});
// 20 minutes, denominated in seconds

export const userDeadline = atom<number>({
  key: 'userDeadline',
  default: DEFAULT_DEADLINE_FROM_NOW,
});
