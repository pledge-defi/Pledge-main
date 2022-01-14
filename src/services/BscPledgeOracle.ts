import { gasOptions, getBscPledgeOracleAbiContract } from './web3';
import type { BscPledgeOracle } from '_src/contracts/BscPledgeOracle';
import { pledge_address, ORACLE_address } from '_src/utils/constants';

const BscPledgeOracleServer = {
  async getPrice(asset: string) {
    const contract = getBscPledgeOracleAbiContract(ORACLE_address);
    const options = await gasOptions();
    const rates = await contract.methods.getPrice(asset).call();
    return rates;
  },
  async getPrices(asset: string[]) {
    const contract = getBscPledgeOracleAbiContract(ORACLE_address);
    const options = await gasOptions();
    const rates = await contract.methods.getPrices(asset).call();
    return rates;
  },
};

export default BscPledgeOracleServer;
