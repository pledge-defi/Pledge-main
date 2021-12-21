import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import { Collapse, Statistic, Row, Col, Table, Steps, message } from 'antd';

import Button from '_components/Button';

import './index.less';

export interface IClaimTime {
  className?: string;
  endtime: any;
  style?: React.CSSProperties;
  state: any;
}

const ClaimTime: React.FC<IClaimTime> = ({ className, style, endtime, state }) => {
  const [days, setdays] = useState(1);
  const [hours, sethours] = useState(1);
  const [minutes, setminutes] = useState(1);
  const [second, setsecond] = useState(1);
  console.log(state);
  let timer = null;
  function interval() {
    timer = setInterval(() => {
      let a = Number(endtime - new Date().getTime() / 1000);
      let days = parseInt((a / (3600 * 24)).toString());
      let hours =
        parseInt(((a - days * 24 * 3600) / 3600).toString()) < 10
          ? '0' + parseInt(((a - days * 24 * 3600) / 3600).toString())
          : parseInt(((a - days * 24 * 3600) / 3600).toString());
      let minutes =
        parseInt(((a - days * 24 * 3600 - Number(hours) * 3600) / 60).toString()) < 10
          ? '0' + parseInt(((a - days * 24 * 3600 - Number(hours) * 3600) / 60).toString())
          : parseInt(((a - days * 24 * 3600 - Number(hours) * 3600) / 60).toString());
      let second =
        parseInt((a - days * 24 * 3600 - Number(hours) * 3600 - Number(minutes) * 60).toString()) < 10
          ? '0' + parseInt((a - days * 24 * 3600 - Number(hours) * 3600 - Number(minutes) * 60).toString())
          : parseInt((a - days * 24 * 3600 - Number(hours) * 3600 - Number(minutes) * 60).toString());
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

  useEffect(() => {
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
        <Button disabled={days + hours + minutes + second == 0 ? false : true}>Claim</Button>
      </div>
    </div>
  );
};

ClaimTime.defaultProps = {
  className: '',

  style: null,
};

export default ClaimTime;
