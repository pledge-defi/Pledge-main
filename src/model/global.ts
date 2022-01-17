import { atom } from 'recoil';

export const currencies = ['BSC_Testnet', 'BSC_Mainnet'] as const;

export type CurrencyType = typeof currencies[number];

export const currencyState = atom<CurrencyType>({
  key: 'currencyState',
  default: 'BSC_Testnet',
});

export type BalanceType = Record<CurrencyType, string>;
export const balanceState = atom<BalanceType>({
  key: 'balanceState',
  default: {
    BSC_Testnet: '',
    BSC_Mainnet: '',
  },
});
