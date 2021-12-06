import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import { Collapse, Statistic, Row, Col, Table, Steps, message } from 'antd';

import Button from '_components/Button';

import './index.less';

export interface IClaimTime {
  className?: string;

  style?: React.CSSProperties;
}

const ClaimTime: React.FC<IClaimTime> = ({ className, style }) => {
  const [timerID, setTimerID] = useState(null);

  const [counter, setCounter] = useState(5);

  const [current, setCurrent] = React.useState(0);

  const { Step } = Steps;
  const steps = [
    {
      title: '1',
      content: 'First-content',
    },
    {
      title: '2',
      content: 'Second-content',
    },
  ];

  useEffect(() => {
    if (counter > 0) {
      let timer = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
      setTimerID(timer);
    }

    return () => {
      setTimerID(null);
    };
  }, [counter]);
  return (
    <div className={classnames('claim_time', className)} style={style}>
      <div className="component_time">
        <span className="component_time_span"></span>
        <p className="claim_time_title">Matures in</p>
        <p className="claim_time_time">
          <span>{'00d'}</span>:<span>{'00'}</span>:<span>{'00'}</span>:<span>{counter}</span>
        </p>
        <span className="component_time_span"></span>
      </div>

      <div className="claim_button">
        <Button disabled={counter == 0 ? false : true}>Claim</Button>
      </div>
    </div>
  );
};

ClaimTime.defaultProps = {
  className: '',

  style: null,
};

export default ClaimTime;
