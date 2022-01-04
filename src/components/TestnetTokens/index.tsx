import React from 'react';
import classnames from 'classnames';
import { DappLayout } from '_src/Layout';
import Button from '_components/Button';
import BUSD from '_src/assets/images/BUSDcoin.png';
import BTCB from '_src/assets/images/order_BTCB.png';
import USDT from '_src/assets/images/order_USDT.png';
import DAI from '_src/assets/images/order_DAI.png';
import BNB from '_src/assets/images/order_BNB.png';

import './index.less';

export interface ITestnetTokens {
  className?: string;
  style?: React.CSSProperties;
}

const TestnetTokens: React.FC<ITestnetTokens> = ({ className, style }) => {
  return (
    <div style={style}>
      <DappLayout title={'Get Testnet Tokens'} className="testnetpages">
        <ul>
          <li>
            <img src={BNB} alt="" />
            <p className="tokenname">Testnet BNB</p>
            <p className="tokenaddress">Please use faucet link to get BNB in testnet</p>
            <Button>Go to Faucet</Button>
          </li>
          <li>
            <img src={BTCB} alt="" />
            <p className="tokenname">Testnet BTCB</p>
            <p className="tokenaddress">0xF592aa48875a5FDE73Ba64B527477849C73787ad</p>
            <Button>Claim</Button>
          </li>
          <li>
            <img src={BUSD} alt="" />
            <p className="tokenname">Testnet BUSD</p>
            <p className="tokenaddress">0xF592aa48875a5FDE73Ba64B527477849C73787ad</p>
            <Button>Claim</Button>
          </li>
          <li>
            <img src={DAI} alt="" />
            <p className="tokenname">Testnet DAI</p>
            <p className="tokenaddress">0xF592aa48875a5FDE73Ba64B527477849C73787ad</p>
            <Button>Claim</Button>
          </li>
        </ul>
      </DappLayout>
    </div>
  );
};

TestnetTokens.defaultProps = {
  className: '',
  style: null,
};

export default TestnetTokens;
