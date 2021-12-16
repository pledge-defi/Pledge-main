import Web3 from 'web3';
import { PledgePool } from '_src/contracts/PledgePool';
import { DebtToken } from '_src/contracts/DebtToken';
import { BscPledgeOracle } from '_src/contracts/BscPledgeOracle';
import { AddressPrivileges } from '_src/contracts/AddressPrivileges';
import { ERC20 } from '_src/contracts/ERC20';

const PledgePoolAbi = require('_abis/PledgePool.json');
const DebtTokenAbi = require('_abis/DebtToken.json');
const BscPledgeOracleAbi = require('_abis/BscPledgeOracle.json');
const AddressPrivilegesAbi = require('_abis/AddressPrivileges.json');
const ERC20Abi = require('_abis/ERC20.json');

import { ethers } from 'ethers';

const web3 = new Web3(Web3.givenProvider);

const getAddressPrivilegesContract = () => {
  return (new web3.eth.Contract(AddressPrivilegesAbi) as unknown) as {
    methods: AddressPrivileges;
  };
};

const getBscPledgeOracleAbiContract = (address: string) => {
  return (new web3.eth.Contract(BscPledgeOracleAbi, address) as unknown) as {
    methods: BscPledgeOracle;
  };
};

const getDebtTokenContract = (address: string) => {
  return (new web3.eth.Contract(DebtTokenAbi, address) as unknown) as {
    methods: DebtToken;
  };
};

const getPledgePoolContract = (address: string) => {
  return (new web3.eth.Contract(PledgePoolAbi, address) as unknown) as {
    methods: PledgePool;
  };
};
const getERC20Contract = (address: string) => {
  return (new web3.eth.Contract(ERC20Abi, address) as unknown) as {
    methods: ERC20;
  };
};
const getDefaultAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  if (accounts.length > 0) {
    return accounts[0];
  }
  return '';
};
const gasOptions = async (params = {}) => {
  const gasLimit = Web3.utils.toHex(500000);
  const from = await getDefaultAccount();
  return {
    from,
    gasLimit,
    ...params,
  };
};
export {
  web3,
  getERC20Contract,
  gasOptions,
  getAddressPrivilegesContract,
  getBscPledgeOracleAbiContract,
  getDebtTokenContract,
  getPledgePoolContract,
};
