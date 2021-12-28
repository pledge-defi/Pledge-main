import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { Progress, notification, Divider, Space } from 'antd';
import Success from '_src/assets/images/Success.png';
import Error from '_src/assets/images/Error.png';
import icon3 from '_src/assets/images/icon (3).png';
import icon4 from '_src/assets/images/icon (4).png';
import Union from '_src/assets/images/union.png';

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
  const [loadings, setloadings] = useState(false);
  const [stakeAmount, setstakeAmount] = useState('');
  const [stakeAmountborrow, setstakeAmountborrow] = useState('');

  const openNotificationlend = (placement) => {
    notification.config({
      closeIcon: <img src={Union} alt="" style={{ width: '10px', height: '10px', margin: '14px' }} />,
    });
    notification.open({
      message: (
        <div
          style={{
            border: '1px solid #2DE0E0',
            width: '340px',
            height: '90px',
            background: ' #fff',
            borderRadius: '4px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '21px',
          }}
        >
          <div
            className="messagetab"
            style={{
              display: 'flex',
            }}
          >
            <img src={Success} alt="" style={{ width: '22px', height: '22px', marginRight: '11px' }} />
            <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, margin: '0' }}>{placement}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: '0 9.4px 0 33px' }}>{'Claim refund success'}</p>{' '}
            <img src={icon3} alt="" style={{ width: '11.2px', height: '11.2px' }} />
          </div>
        </div>
      ),
    });
  };
  const openNotificationborrow = (placement) => {
    notification.config({
      closeIcon: <img src={Union} alt="" style={{ width: '10px', height: '10px', margin: '14px' }} />,
    });
    notification.open({
      message: (
        <div
          style={{
            border: '1px solid #2DE0E0',
            width: '340px',
            height: '90px',
            background: ' #fff',
            borderRadius: '4px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '21px',
          }}
        >
          <div
            className="messagetab"
            style={{
              display: 'flex',
            }}
          >
            <img src={Success} alt="" style={{ width: '22px', height: '22px', marginRight: '11px' }} />
            <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, margin: '0' }}>{placement}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: '0 9.4px 0 33px' }}>{'Claim refund success'}</p>{' '}
            <img src={icon3} alt="" style={{ width: '11.2px', height: '11.2px' }} />
          </div>
        </div>
      ),
    });
  };
  const openNotificationerrorlend = (placement) => {
    notification.config({
      closeIcon: <img src={Union} alt="" style={{ width: '10px', height: '10px', margin: '14px' }} />,
    });
    notification.open({
      message: (
        <div
          style={{
            border: '1px solid #ff3369',
            width: '340px',
            height: '90px',
            background: ' #fff',
            borderRadius: '4px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '21px',
          }}
        >
          <div
            className="messagetaberror"
            style={{
              display: 'flex',
            }}
          >
            <img src={Error} alt="" style={{ width: '22px', height: '22px', marginRight: '11px' }} />
            <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, margin: '0' }}>{placement}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: '0 9.4px 0 33px' }}>{'laim refund error'}</p>{' '}
            <img src={icon4} alt="" style={{ width: '11.2px', height: '11.2px' }} />
          </div>
        </div>
      ),
    });
  };
  const openNotificationerrorborrow = (placement) => {
    notification.config({
      closeIcon: <img src={Union} alt="" style={{ width: '10px', height: '10px', margin: '14px' }} />,
    });
    notification.open({
      message: (
        <div
          style={{
            border: '1px solid #ff3369',
            width: '340px',
            height: '90px',
            background: ' #fff',
            borderRadius: '4px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '21px',
          }}
        >
          <div
            className="messagetaberror"
            style={{
              display: 'flex',
            }}
          >
            <img src={Error} alt="" style={{ width: '22px', height: '22px', marginRight: '11px' }} />
            <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, margin: '0' }}>{placement}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: '0 9.4px 0 33px' }}>{'Claim refund error'}</p>{' '}
            <img src={icon4} alt="" style={{ width: '11.2px', height: '11.2px' }} />
          </div>
        </div>
      ),
    });
  };
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
              sethasNoClaim(data.hasNoRefund);
              setstakeAmount(data.stakeAmount);
            })
          : services.PoolServer.getuserBorrowInfo((props.key - 1).toString()).then((data) => {
              sethasNoClaim(data.hasNoRefund);
              setstakeAmountborrow(data.stakeAmount);
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
  const refundLend =
    Number(dealNumber_18(props.lendSupply)) !== 0
      ? (Number(dealNumber_18(props.lendSupply)) - Number(dealNumber_18(stateinfo.settleAmountLend))) *
        (Number(dealNumber_18(stakeAmount)) / Number(dealNumber_18(props.lendSupply)))
      : 0;
  const refundBorrow =
    Number(dealNumber_18(props.borrowSupply)) !== 0
      ? (Number(dealNumber_18(props.borrowSupply)) - Number(dealNumber_18(stateinfo.settleAmountBorrow))) *
        (Number(dealNumber_18(stakeAmountborrow)) / Number(dealNumber_18(props.borrowSupply)))
      : 0;
  console.log('refundLend', stakeAmountborrow);
  const getRefund = () => {
    console.log('getRefund');
    if (props.state == '4') {
      mode == 'Lend'
        ? services.PoolServer.getemergencyLendWithdrawal(props.key - 1)
            .then(() => {
              openNotificationlend('Success');
              setloadings(false);
            })
            .catch(() => {
              openNotificationerrorlend('Error'), setloadings(false);
            })
        : services.PoolServer.getemergencyBorrowWithdrawal(props.key - 1)
            .then(() => {
              openNotificationborrow('Success');
              setloadings(false);
            })
            .catch(() => {
              openNotificationerrorborrow('Error'), setloadings(false);
            });
    } else {
      mode == 'Lend'
        ? services.PoolServer.getrefundLend(props.key - 1)
            .then(() => {
              openNotificationlend('Success');
              setloadings(false);
            })
            .catch(() => {
              openNotificationerrorlend('Error'), setloadings(false);
            })
        : services.PoolServer.getrefundBorrow(props.key - 1)
            .then(() => {
              openNotificationborrow('Success');
              setloadings(false);
            })
            .catch(() => {
              openNotificationerrorborrow('Error'), setloadings(false);
            });
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
                  <span>{hasNoClaim == false ? refundLend : 0}</span>
                </p>
                <Button onClick={getRefund} disabled={refundLend !== 0 ? (hasNoClaim == false ? false : true) : true}>
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
                  <span>{hasNoClaim == false ? refundBorrow : 0}</span>
                </p>
                <Button
                  onClick={() => {
                    setloadings(true), getRefund();
                  }}
                  disabled={refundBorrow !== 0 ? (hasNoClaim == false ? false : true) : true}
                  loading={loadings}
                >
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
