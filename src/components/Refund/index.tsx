import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

import Button from '_components/Button';
import OrderImg from '_components/OrderImg';
import BigNumber from 'bignumber.js';
import services from '_src/services';

import './index.less';

export interface IRefund {
  className?: string;
  mode: string;
  style?: React.CSSProperties;
  stateinfo?: any;
  props?: any;
}

const Refund: React.FC<IRefund> = ({ className, style, mode, stateinfo, props }) => {
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();

  const [hasNoClaim, sethasNoClaim] = useState(false);
  const [balance, setbalance] = useState('0');
  const dealNumber_18 = (num) => {
    if (num) {
      let x = new BigNumber(num);
      let y = new BigNumber(1e18);
      return Math.floor(Number(x.dividedBy(y)) * Math.pow(10, 7)) / Math.pow(10, 7);
    }
  };
  console.log(props.key - 1);

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

  const getRefund = () => {
    console.log('getRefund');
    if (props.state == '4') {
      mode == 'Lend'
        ? services.PoolServer.getemergencyLendWithdrawal(props.key - 1)
        : services.PoolServer.getemergencyBorrowWithdrawal(props.key - 1);
    } else {
      mode == 'Lend'
        ? services.PoolServer.getrefundLend(props.key - 1)
        : services.PoolServer.getrefundBorrow(props.key - 1);
    }
  };
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
                  <span>
                    {dealNumber_18(
                      props.state == '2'
                        ? stateinfo.finishAmountLend
                        : props.state == '1'
                        ? stateinfo.settleAmountLend
                        : props.state == '3'
                        ? stateinfo.liquidationAmounLend
                        : '0',
                    )}
                  </span>
                </p>
                <p>
                  <span>
                    {dealNumber_18(
                      props.state == '2'
                        ? stateinfo.finishAmountBorrow
                        : props.state == '1'
                        ? stateinfo.settleAmountBorrow
                        : props.state == '3'
                        ? stateinfo.liquidationAmounBorrow
                        : '0',
                    )}
                  </span>
                </p>
                <p>
                  <span>{dealNumber_18(props.lendSupply)}</span>
                </p>
                <p>
                  <span>{balance}</span>
                </p>
                <Button onClick={getRefund} disabled={balance !== '0' ? false : true}>
                  Claim
                </Button>
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
                  <span>
                    {dealNumber_18(
                      props.state == '2'
                        ? stateinfo.finishAmountLend
                        : props.state == '1'
                        ? stateinfo.settleAmountLend
                        : props.state == '3'
                        ? stateinfo.liquidationAmounLend
                        : '0',
                    )}
                  </span>
                </p>
                <p>
                  <span>{dealNumber_18(props.borrowSupply)}</span>
                </p>
                <p>
                  <span>
                    {dealNumber_18(
                      props.state == '2'
                        ? stateinfo.finishAmountBorrow
                        : props.state == '1'
                        ? stateinfo.settleAmountBorrow
                        : props.state == '3'
                        ? stateinfo.liquidationAmounBorrow
                        : '0',
                    )}
                  </span>
                </p>
                <p>
                  <span>{balance}</span>
                </p>
                <Button onClick={getRefund} disabled={balance !== '0' ? false : true}>
                  Claim
                </Button>
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
