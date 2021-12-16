import { gasOptions, getAddressPrivilegesContract } from './web3';
import type { AddressPrivileges } from '_src/contracts/AddressPrivileges';
type GetaddMinter = Parameters<AddressPrivileges['addMinter']>;
const AddressServer = {
  async addMinter(address: string, ...arg: GetaddMinter) {
    const contract = getAddressPrivilegesContract();
    const options = await gasOptions();
    const rates = await contract.methods.addMinter(...arg).send(options);
    return rates;
  },
};

export default AddressServer;
