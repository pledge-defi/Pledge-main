import { gasOptions, getERC20Contract } from './web3';
import type { ERC20 } from '_src/contracts/ERC20';
type GetbalanceOf = Parameters<ERC20['balanceOf']>;
const ERC20Server = {
  async balanceOf(address: string, ...arg: GetbalanceOf) {
    const contract = getERC20Contract(address);
    const rates = await contract.methods.balanceOf(...arg).call();
    return rates;
  },
};

export default ERC20Server;
