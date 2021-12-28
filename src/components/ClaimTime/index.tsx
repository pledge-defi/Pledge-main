import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { Collapse, Statistic, Row, Col, Table, Steps, message } from 'antd';
import { Progress, notification, Divider, Space } from 'antd';
import Success from '_src/assets/images/Success.png';
import Error from '_src/assets/images/Error.png';
import icon3 from '_src/assets/images/icon (3).png';
import icon4 from '_src/assets/images/icon (4).png';
import Union from '_src/assets/images/union.png';

import BigNumber from 'bignumber.js';
import Button from '_components/Button';

import './index.less';
import services from '_src/services';

export interface IClaimTime {
  className?: string;
  endtime: any;
  style?: React.CSSProperties;
  state: any;
  pid: any;
  value: any;
  mode: any;
  settlementAmountLend: any;
  spToken: any;
  jpToken: any;
}

const ClaimTime: React.FC<IClaimTime> = ({
  className,
  style,
  endtime,
  state,
  pid,
  value,
  mode,
  settlementAmountLend,
  spToken,
  jpToken,
}) => {
  const [days, setdays] = useState(1);
  const [hours, sethours] = useState(1);
  const [minutes, setminutes] = useState(1);
  const [second, setsecond] = useState(1);
  const [Spnum, setSpnum] = useState('');
  const [Jpnum, setJpnum] = useState('');
  const [hasNoClaim, sethasNoClaim] = useState(false);
  const [loadings, setloadings] = useState(false);

  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();
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
            <p style={{ margin: '0 9.4px 0 33px' }}>{'Claim reward success'}</p>{' '}
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
            <p style={{ margin: '0 9.4px 0 33px' }}>{'Claim reward success'}</p>{' '}
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
            <p style={{ margin: '0 9.4px 0 33px' }}>{'Claim reward error'}</p>{' '}
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
            <p style={{ margin: '0 9.4px 0 33px' }}>{'Claim reward error'}</p>{' '}
            <img src={icon4} alt="" style={{ width: '11.2px', height: '11.2px' }} />
          </div>
        </div>
      ),
    });
  };

  let timer = null;
  function interval() {
    timer = setInterval(() => {
      let a = Number(endtime - new Date().getTime() / 1000);
      let days = parseInt((a / (3600 * 24)).toString()) > 0 ? parseInt((a / (3600 * 24)).toString()) : 0;
      let hours =
        parseInt(((a - days * 24 * 3600) / 3600).toString()) > 0
          ? parseInt(((a - days * 24 * 3600) / 3600).toString())
          : '0';
      let minutes =
        parseInt(((a - days * 24 * 3600 - Number(hours) * 3600) / 60).toString()) > 0
          ? parseInt(((a - days * 24 * 3600 - Number(hours) * 3600) / 60).toString())
          : '0';
      let second =
        parseInt((a - days * 24 * 3600 - Number(hours) * 3600 - Number(minutes) * 60).toString()) > 0
          ? parseInt((a - days * 24 * 3600 - Number(hours) * 3600 - Number(minutes) * 60).toString())
          : '0';
      const times = days + ':' + hours + ':' + minutes + ':' + second;
      console.log(times);

      setdays(days);
      sethours(Number(hours));
      setminutes(Number(minutes));
      setsecond(Number(second));
      if (days + Number(minutes) + Number(minutes) + Number(second) == 0) {
        clearInterval(timer);
        return;
      }
      a--;
    }, 1000);
  }

  const getclaim = () => {
    var timestamp = Math.round(new Date().getTime() / 1000 + 300).toString();
    console.log(timestamp);

    mode == 'Lend'
      ? services.PoolServer.getwithdrawLend(pid, Spnum)
          .then(() => {
            openNotificationlend('Success');
            setloadings(false);
          })
          .catch(() => {
            openNotificationerrorlend('Error'), setloadings(false);
          })
      : services.PoolServer.getwithdrawBorrow(pid, Jpnum, timestamp)
          .then(() => {
            openNotificationborrow('Success');
            setloadings(false);
          })
          .catch(() => {
            openNotificationerrorborrow('Error'), setloadings(false);
          });
  };
  useEffect(() => {
    if (chainId !== undefined) {
      {
        mode == 'Lend'
          ? services.ERC20Server.balanceOf(spToken).then((res) => {
              setSpnum(res);
              console.log(res);
            })
          : services.ERC20Server.balanceOf(jpToken).then((res) => {
              setJpnum(res);
              console.log(res);
            });
      }
      {
        mode == 'Lend'
          ? services.PoolServer.getuserLendInfo(pid.toString()).then((data) => {
              sethasNoClaim(data.hasNoRefund && data.hasNoClaim);
            })
          : services.PoolServer.getuserBorrowInfo(pid.toString()).then((data) => {
              sethasNoClaim(data.hasNoRefund && data.hasNoClaim);
            });
      }
    }

    if (state !== '4') {
      interval();
    } else {
      setdays(0);
      sethours(0);
      setminutes(0);
      setsecond(0);
    }
    return () => clearInterval(timer);
  });
  return (
    <div className={classnames('claim_time', className)} style={style}>
      <div className="component_time">
        <span className="component_time_span"></span>
        <p className="claim_time_title">Matures in</p>
        <p className="claim_time_time">
          <span>{`${days}d`}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{second}</span>
        </p>
        <span className="component_time_span"></span>
      </div>

      <div className="claim_button">
        {state !== '4' ? (
          hasNoClaim == false ? (
            <Button
              disabled={days + hours + minutes + second == 0 ? false : true}
              loading={loadings}
              onClick={() => {
                setloadings(true), getclaim();
              }}
            >
              Claim
            </Button>
          ) : (
            <Button disabled={true}>Claim</Button>
          )
        ) : (
          <Button disabled={true}>Claim</Button>
        )}
      </div>
    </div>
  );
};

ClaimTime.defaultProps = {
  className: '',

  style: null,
};

export default ClaimTime;
