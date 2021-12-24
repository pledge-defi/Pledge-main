import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import services from '_src/services';
import Button from '_components/Button';
import BUSD from '_src/assets/images/order_BUSD.png';
import BTCB from '_src/assets/images/order_BTCB.png';
import USDT from '_src/assets/images/order_USDT.png';
import DAI from '_src/assets/images/order_DAI.png';
import BNB from '_src/assets/images/order_BNB.png';
import BigNumber from 'bignumber.js';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

import './index.less';
import { has } from 'immer/dist/internal';

export interface IAccessTab {
  className?: string;
  style?: React.CSSProperties;
  mode: string;
  props?: any;
  stateinfo?: any;
}
const imglist = {
  BUSD: BUSD,
  BTCB: BTCB,
  USDT: USDT,
  DAI: DAI,
  BNB: BNB,
};
const AccessTab: React.FC<IAccessTab> = ({ className, style, mode, props, stateinfo }) => {
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();

  console.log('access状态' + props.state);
  const [hasNoClaim, sethasNoClaim] = useState(false);
  const [balance, setbalance] = useState('0');
  const dealNumber_18 = (num) => {
    if (num) {
      let x = new BigNumber(num);
      let y = new BigNumber(1e18);
      return Math.floor(Number(x.dividedBy(y)) * Math.pow(10, 7)) / Math.pow(10, 7);
    }
  };

  const accessClaim = async () => {
    if (props.state == '1' || props.state == '2') {
      try {
        mode == 'Lend'
          ? await services.PoolServer.getclaimLend(props.key - 1).then((data) => {
              console.log(data);
            })
          : await services.PoolServer.getclaimBorrow(props.key - 1).then((data) => {
              console.log(data);
            });
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (chainId !== undefined) {
      {
        mode == 'Lend'
          ? services.PoolServer.getuserLendInfo((props.key - 1).toString()).then((data) => {
              sethasNoClaim(data.hasNoClaim);
            })
          : services.PoolServer.getuserBorrowInfo((props.key - 1).toString()).then((data) => {
              sethasNoClaim(data.hasNoClaim);
            });
      }
      mode == 'Lend'
        ? services.ERC20Server.balanceOf(props.Sptoken).then((data) => {
            console.log('余额', data), setbalance(data);
          })
        : services.ERC20Server.balanceOf(props.Jptoken).then((data) => {
            console.log('余额', data), setbalance(data);
          });
    } else {
      setbalance('0');
    }
  });
  return (
    <div className={classnames('access_tab')} style={style}>
      <div className="access_title">
        <img src={imglist[props.poolname]} alt="" style={{ width: '40px' }} />
        <h2>{props.poolname}</h2>
      </div>

      {props.state == '0' ? (
        <div className="statemask">
          Waiting for the final matching {mode == 'Lend' ? 'deposit' : 'loan'} limit on the settlement date
        </div>
      ) : (
        <div>
          {mode == 'Lend' ? (
            <>
              <p className="access_token">{mode == 'Lend' ? 'SP-Token' : 'JP-Token'}</p>
              <p className="access_num">{balance}</p>
            </>
          ) : (
            <>
              {console.log(33, stateinfo.settleAmountBorrow)}
              <div style={{ display: 'inline-block' }}>
                <p className="access_token">Loan amount</p>
                <p className="access_num">
                  {dealNumber_18(props.borrowSupply)} {props.poolname}
                </p>
              </div>
              <div style={{ display: 'inline-block', float: 'right' }}>
                <p className="access_token">{mode == 'Lend' ? 'SP-Token' : 'JP-Token'}</p>
                <p className="access_num">{balance}</p>
              </div>
            </>
          )}
        </div>
      )}
      <p className="access_list">
        <span className="access_key">Underlying Asset</span>
        <span className="access_value">{props.underlying_asset}</span>
      </p>
      <p className="access_list">
        <span className="access_key">settlement Date</span>
        <span className="access_value">{props.settlement_date}</span>
      </p>
      <Button
        style={{ marginTop: '40px' }}
        onClick={accessClaim}
        disabled={props.state == '0' || props.state == '4' ? true : balance == '0' ? true : false}
      >
        Claim
      </Button>
    </div>
  );
};

AccessTab.defaultProps = {
  className: '',
  style: null,
};

export default AccessTab;
