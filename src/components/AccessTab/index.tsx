import React, { useEffect } from 'react';
import classnames from 'classnames';

import services from '_src/services';
import Button from '_components/Button';
import BUSD from '_src/assets/images/order_BUSD.png';
import BTCB from '_src/assets/images/order_BTCB.png';
import USDT from '_src/assets/images/order_USDT.png';
import DAI from '_src/assets/images/order_DAI.png';
import BNB from '_src/assets/images/order_BNB.png';

import './index.less';

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
  console.log(props.state);

  useEffect(() => {}, []);
  return (
    <div className={classnames('access_tab')} style={style}>
      <div className="access_title">
        <img src={imglist[props.poolname]} alt="" style={{ width: '40px' }} />
        <h2>{props.poolname}</h2>
      </div>

      {props.state == 0 ? (
        <div className="statemask">
          Waiting for the final matching {mode == 'Lend' ? 'deposit' : 'loan'} limit on the settlement date
        </div>
      ) : (
        <div>
          <p className="access_token">{mode == 'Lend' ? 'LP-Token' : 'SP-Token'}</p>
          <p className="access_num">
            {mode == 'Lend'
              ? `${stateinfo.settleAmountLend / 100000000} ${props.underlying_asset}`
              : `${stateinfo.settleAmountBorrow / 100000000} ${props.underlying_asset}`}
          </p>
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
      <Button style={{ marginTop: '40px' }}>Claim</Button>
    </div>
  );
};

AccessTab.defaultProps = {
  className: '',
  style: null,
};

export default AccessTab;
