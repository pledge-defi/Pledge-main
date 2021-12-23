import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { Collapse, Statistic, Row, Col, Table, Steps, message } from 'antd';
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
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();

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
    try {
      mode == 'Lend'
        ? services.PoolServer.getwithdrawLend(pid, Spnum)
        : services.PoolServer.getwithdrawBorrow(pid, Jpnum, timestamp);
    } catch (error) {
      console.log(error);
    }
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
          <Button disabled={days + hours + minutes + second == 0 ? false : true} onClick={getclaim}>
            Claim
          </Button>
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
