import userServer from './userServer';
import { web3 } from './web3';
// ... 依次导入其他的 server module

import AddressServer from './AdderssServer';
import ERC20Server from './ERC20Server';
import PoolServer from './PoolServer';
export default {
  userServer,
  PoolServer,
  AddressServer,
  ERC20Server,
};
