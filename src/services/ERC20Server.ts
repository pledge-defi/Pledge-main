import { gasOptions, getERC20Contract, getDefaultAccount } from './web3';
import type { ERC20 } from '_src/contracts/ERC20';
import { pledge_address, ORACLE_address } from '_src/utils/constants';

const ERC20Server = {
  //获取余额
  async balanceOf(contractAddress) {
    const contract = getERC20Contract(contractAddress);
    const account = await getDefaultAccount();
    const rates = await contract.methods.balanceOf(account).call();
    return rates;
  },

  //授权
  async Approve(contractAddress, amount) {
    const contract = getERC20Contract(contractAddress);
    const options = await gasOptions();
    const rates = await contract.methods.approve(pledge_address, amount).send(options);
    return rates;
  },
  //
  async allowance(contractAddress) {
    // sp_token \ jp_token
    const contract = getERC20Contract(contractAddress);
    const owner = await getDefaultAccount();
    return await contract.methods.allowance(owner, pledge_address).call();
  },
};

export default ERC20Server;
