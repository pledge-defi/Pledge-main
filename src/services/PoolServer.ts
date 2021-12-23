import BigNumber from 'bignumber.js';
import { gasOptions, getPledgePoolContract, web3, getDefaultAccount } from './web3';
import { AddEthereumChainParameter, BridgeConfigSimple } from '_constants/ChainBridge.d';
import { pledge_address, ORACLE_address } from '_src/utils/constants';

import type { PledgePool } from '_src/contracts/PledgePool';
import { pid, send } from 'process';

const PoolServer = {
  async poolLength() {
    const contract = getPledgePoolContract(pledge_address);
    const rates = await contract.methods.poolLength().call();
    return rates;
  },
  async getPoolBaseData() {
    const contract = getPledgePoolContract(pledge_address);
    const length = await contract.methods.poolLength().call();
    const poolbaseData = [];
    for (let i = 0; i < +length; i++) {
      const data = await contract.methods.poolBaseInfo(i.toString()).call();
      poolbaseData.push(data);
    }
    return poolbaseData;
  },
  async getPoolDataInfo() {
    const contract = getPledgePoolContract(pledge_address);
    const length = await contract.methods.poolLength().call();
    const poolDataData = [];
    for (let i = 0; i < +length; i++) {
      const data = await contract.methods.poolDataInfo(i.toString()).call();
      poolDataData.push(data);
    }
    return poolDataData;
  },

  async getuserLendInfo(pid) {
    const contract = getPledgePoolContract(pledge_address);
    const owner = await getDefaultAccount();
    const data = await contract.methods.userLendInfo(owner, pid).call();
    return await data;
  },
  async getuserBorrowInfo(pid) {
    const contract = getPledgePoolContract(pledge_address);
    const owner = await getDefaultAccount();
    const data = await contract.methods.userBorrowInfo(owner, pid).call();
    return await data;
  },
  async depositLend(pid, value, coinAddress) {
    const contract = getPledgePoolContract(pledge_address);
    let options = await gasOptions();
    if (coinAddress === '0x0000000000000000000000000000000000000000') {
      options = { ...options, value };
    }
    return await contract.methods.depositLend(pid, value).send(options);
  },
  async depositBorrow(pid, value, time, coinAddress) {
    const contract = getPledgePoolContract(pledge_address);
    let options = await gasOptions();
    if (coinAddress === '0x0000000000000000000000000000000000000000') {
      options = { ...options, value };
    }
    const data = await contract.methods.depositBorrow(pid, value, time).send(options);
    return data;
  },
  async getclaimLend(pid) {
    const contract = getPledgePoolContract(pledge_address);
    let options = await gasOptions();
    const data = await contract.methods.claimLend(pid).send(options);
    return data;
  },
  async getemergencyLendWithdrawal(pid) {
    const contract = getPledgePoolContract(pledge_address);
    let options = await gasOptions();
    const data = await contract.methods.emergencyLendWithdrawal(pid).send(options);
    return data;
  },
  async getwithdrawLend(pid, value) {
    const contract = getPledgePoolContract(pledge_address);
    let options = await gasOptions();
    const data = await contract.methods.withdrawLend(pid, value).send(options);
    return data;
  },
  async getrefundLend(pid) {
    const contract = getPledgePoolContract(pledge_address);
    let options = await gasOptions();
    const data = await contract.methods.refundLend(pid).send(options);
    return data;
  },
  async getclaimBorrow(pid) {
    const contract = getPledgePoolContract(pledge_address);
    let options = await gasOptions();
    const data = await contract.methods.claimBorrow(pid).send(options);
    return data;
  },
  async getemergencyBorrowWithdrawal(pid) {
    const contract = getPledgePoolContract(pledge_address);
    let options = await gasOptions();
    const data = await contract.methods.emergencyBorrowWithdrawal(pid).send(options);
    return data;
  },
  async getwithdrawBorrow(pid, value, time) {
    const contract = getPledgePoolContract(pledge_address);
    let options = await gasOptions();
    const data = await contract.methods.withdrawBorrow(pid, value, time).send(options);
    return data;
  },
  async getrefundBorrow(pid) {
    const contract = getPledgePoolContract(pledge_address);
    let options = await gasOptions();
    const data = await contract.methods.refundBorrow(pid).send(options);
    return data;
  },

  async switchNetwork(value: BridgeConfigSimple) {
    return await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: web3.utils.toHex(value.networkId),
          chainName: value.name,
          nativeCurrency: {
            name: value.nativeTokenSymbol,
            symbol: value.nativeTokenSymbol,
            decimals: value.decimals,
          },
          rpcUrls: [value.rpcUrl],
          blockExplorerUrls: [value.explorerUrl],
        } as AddEthereumChainParameter,
      ],
    });
  },
};
export default PoolServer;
