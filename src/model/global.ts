import { atom } from 'recoil';
import currencyInfos from './../constants/currencyInfos';
import type { CurrencyInfos, chainInfoKeys } from './../constants/currencyInfos';

export const currencies = ['BSC_Mainnet', 'BSC_Testnet'] as const;

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
