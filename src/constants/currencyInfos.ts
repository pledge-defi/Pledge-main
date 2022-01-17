import type { CurrencyType } from '_src/model/global';
import { web3 } from '_src/services/web3';
import {
  MPLGR_CONTRACT_ADDRESS,
  PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS,
  PLEDGER_BRIDGE_ETH_CONTRACT_ADDRESS,
  PLGR_CONTRACT_ADDRESS,
} from '_utils/constants';
import type { AddEthereumChainParameter } from './ChainBridge.d';

type CurrencyInfos = Record<
  CurrencyType,
  {
    chainId: number;
    chainName: CurrencyType;
    contractAddress: string;
    pledgerBridgeContractAddress: string;
    chainImageAsset: string;
    chainDesc: string;
    currencyName: string;
    currencyImageAsset: string;
    netWorkInfo: AddEthereumChainParameter;
  }
>;

const currencyInfos: CurrencyInfos = {
  BSC_Testnet: {
    chainName: 'BSC_Testnet',
    contractAddress: PLGR_CONTRACT_ADDRESS,
    pledgerBridgeContractAddress: PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS,
    chainImageAsset: require('_assets/images/BSC.svg'),
    chainDesc: 'BSC Network',
    currencyName: 'PLGR',
    currencyImageAsset: require('_assets/images/PLGR.svg'),
    chainId: 97,
    netWorkInfo: {
      chainId: web3.utils.toHex(97),
      chainName: 'Binance Smart Chain Testnet',
      nativeCurrency: {
        name: 'BSC',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
      blockExplorerUrls: ['https://testnet.bscscan.com'],
    },
  },
  BSC_Mainnet: {
    chainId: 56,
    chainName: 'BSC_Mainnet',
    contractAddress: PLGR_CONTRACT_ADDRESS,
    pledgerBridgeContractAddress: PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS,
    chainImageAsset: require('_assets/images/BSC.svg'),
    chainDesc: 'BSC Network',
    currencyName: 'PLGR',
    currencyImageAsset: require('_assets/images/PLGR.svg'),
    netWorkInfo: {
      chainId: web3.utils.toHex(56),
      chainName: 'Smart Chain',
      nativeCurrency: {
        name: 'BSC',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://bsc-dataseed.binance.org'],
      blockExplorerUrls: ['https://bscscan.com'],
    },
  },
  // Ethereum: {
  //   chainId: 3,
  //   chainName: 'Ethereum',
  //   contractAddress: MPLGR_CONTRACT_ADDRESS,
  //   pledgerBridgeContractAddress: PLEDGER_BRIDGE_ETH_CONTRACT_ADDRESS,
  //   chainImageAsset: require('_assets/images/Ethereum.svg'),
  //   chainDesc: 'Ethereum Network',
  //   currencyName: 'MPLGR',
  //   currencyImageAsset: require('_assets/images/MPLGR.svg'),
  //   netWorkInfo: {
  //     chainId: web3.utils.toHex(3),
  //     chainName: 'Ropsten 测试网络',
  //     nativeCurrency: {
  //       name: 'ETH',
  //       symbol: 'ETH',
  //       decimals: 18,
  //     },
  //     rpcUrls: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
  //     blockExplorerUrls: ['https://ropsten.etherscan.io'],
  //   },
  // },
};

export default currencyInfos;
