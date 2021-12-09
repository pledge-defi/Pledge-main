import React from 'react';
import classnames from 'classnames';

import USDT from '_src/assets/images/order_USDT.png';
import Button from '_components/Button';

import './index.less';

export interface IAccessTab {
  className?: string;
  style?: React.CSSProperties;
  mode: string;
}

const AccessTab: React.FC<IAccessTab> = ({ className, style, mode }) => {
  console.log(mode);
  return (
    <div className={classnames('access_tab')} style={style}>
      <div className="access_title">
        <img src={USDT} alt="" style={{ width: '40px' }} />
        <h2>USDT</h2>
      </div>

      <p className="access_token">{mode == 'Lend' ? 'LP-Token' : 'SP-Token'}</p>
      <p className="access_num">100,000 USDT</p>
      <p className="access_list">
        <span className="access_key">Underlying Asset</span>
        <span className="access_value">BTCB</span>
      </p>
      <p className="access_list">
        <span className="access_key">settlement Date</span>
        <span className="access_value">2021/11/01 12:00</span>
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
