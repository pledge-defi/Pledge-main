import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import Button from '_components/Button';
import OrderImg from '_components/OrderImg';

import './index.less';

export interface IRefund {
  className?: string;
  mode: string;
  style?: React.CSSProperties;
  stateinfo?: any;
  props?: any;
}

const Refund: React.FC<IRefund> = ({ className, style, mode, stateinfo, props }) => {
  return (
    <div>
      <p>
        {mode == 'Lend' ? (
          <li className="claim_list">
            <p style={{ justifyContent: 'start' }}>
              <OrderImg img1={props.poolname} img2={props.underlying_asset} />
              {props.poolname} / {props.underlying_asset}
            </p>
            {props.state != 0 ? (
              <>
                <p>
                  <span>{stateinfo.settleAmountLend / 100000000}</span>
                </p>
                <p>
                  <span>{stateinfo.settleAmountBorrow / 100000000}</span>
                </p>
                <p>
                  <span>{stateinfo.liquidationAmounLend / 100000000}</span>
                </p>
                <p>
                  <span>{stateinfo.finishAmountLend / 100000000}</span>
                </p>
                <Button>Claim</Button>
              </>
            ) : (
              <div className="statemask">
                <p>
                  <span> Wait for the settlement date to get back the unmatched quota</span>
                </p>
                <Button disabled={true}>Claim</Button>
              </div>
            )}
          </li>
        ) : (
          <li className="claim_list">
            <p style={{ justifyContent: 'start' }}>
              <OrderImg img1={props.poolname} img2={props.underlying_asset} />
              {props.poolname} / {props.underlying_asset}
            </p>
            {props.state != 0 ? (
              <>
                <p>
                  <span>{stateinfo.settleAmountLend / 100000000}</span>
                </p>
                <p>
                  <span>{stateinfo.settleAmountBorrow / 100000000}</span>
                </p>
                <p>
                  <span>{stateinfo.liquidationAmounBorrow / 100000000}</span>
                </p>
                <p>
                  <span>{stateinfo.finishAmountBorrow / 100000000}</span>
                </p>
                <Button>Claim</Button>
              </>
            ) : (
              <div className="statemask">
                <p>
                  <span> Wait for the settlement date to get back the unmatched quota</span>
                </p>
                <Button disabled={true}>Claim</Button>
              </div>
            )}
          </li>
        )}
      </p>
    </div>
  );
};

Refund.defaultProps = {
  className: '',
  style: null,
};

export default Refund;
