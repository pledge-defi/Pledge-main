import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import { Collapse, Statistic, Row, Col, Table, Steps, message } from 'antd';
import BigNumber from 'bignumber.js';
import Button from '_components/Button';
import OrderImg from '_components/OrderImg';
import ClaimTime from '_components/ClaimTime';

import './index.less';
import services from '_src/services';

export interface IPortfolioList {
  props?: any;
  datainfo?: any;
  className?: string;
  style?: React.CSSProperties;
  mode: string;
}

const PortfolioList: React.FC<IPortfolioList> = ({ className, mode, datainfo, ...props }) => {
  const { Panel } = Collapse;
  const [balance, setbalance] = useState('initialState');
  const PoolState = { 0: 'Match', 1: 'Execution', 2: 'Finish', 3: 'Liquidation', 4: 'Undone' };
  const poolAsset = {
    '0xDc6dF65b2fA0322394a8af628Ad25Be7D7F413c2': 'BUSD',
    '0xF592aa48875a5FDE73Ba64B527477849C73787ad': 'BTCB',
    '0xf2bDB4ba16b7862A1bf0BE03CD5eE25147d7F096': 'DAI',
    '0x0000000000000000000000000000000000000000': 'BNB',
  };
  const dealNumber_18 = (num) => {
    if (num) {
      let x = new BigNumber(num);
      let y = new BigNumber(1e18);
      return x.dividedBy(y).toString();
    }
  };

  console.log(new Date().getTime());

  const getBalance = async () => {
    (await props) &&
      services.ERC20Server.balanceOf(props.props.Sp).then((res) => {
        setbalance(res);
      });
  };

  useEffect(() => {
    getBalance();
  }, []);
  const DetailList = [
    {
      title: 'Detail',
      Total_financing: `${datainfo.settleAmountLend}  ${props.props.poolname}`,
      Balance:
        mode == 'Borrow'
          ? `${parseInt(dealNumber_18(balance))} JP-Token`
          : `${parseInt(dealNumber_18(balance))} SP-Token`,
      Pledge: '10 BTCB',
      Time: `${props.props.settlement_date}`,
    },
    {
      title: 'Reward',
      The_principal: '100.00 BUSD',
      Expected_interest: '10.0000 BUSD',
    },
  ];

  return (
    <div className={classNames('portfolio_list', className)} {...props}>
      <Collapse bordered={false} expandIconPosition="right" ghost={true}>
        <Panel
          header={
            <Row gutter={16}>
              <Col span={4}>
                <OrderImg img1={props.props.poolname} img2={props.props.underlying_asset} />
                <Statistic title={`${props.props.poolname} / ${props.props.underlying_asset}`} />
              </Col>
              <Col span={4}>
                <Statistic title={`${props.props.fixed_rate} %`} />
              </Col>
              <Col span={4}>
                <Statistic title={PoolState[props.props.state]} />
              </Col>
              <Col span={4} className="media_tab">
                <Statistic title={props.props.settlement_date} />
              </Col>
              <Col span={4} className="media_tab">
                <Statistic title={props.props.margin_ratio} />
              </Col>
              <Col span={4} className="media_tab">
                <Statistic title={props.props.collateralization_ratio} />
              </Col>
            </Row>
          }
          key="1"
        >
          <div className="order_box">
            {DetailList.map((item, index) => {
              console.log(item);
              return item.title == 'Detail' ? (
                <ul className="order_list" key={index}>
                  <p>{item.title}</p>
                  <li>
                    <span>Total_financing</span> <span>{item.Total_financing}</span>
                  </li>
                  <li>
                    <span>Balance</span> <span>{item.Balance}</span>
                  </li>
                  {mode == 'Borrow' ? (
                    <li>
                      <span>Pledge</span> <span>{item.Pledge}</span>
                    </li>
                  ) : (
                    ''
                  )}
                  <li>
                    <span>Time</span> <span>{item.Time}</span>
                  </li>
                </ul>
              ) : (
                props.props.state != 0 && props.props.state != 4 && (
                  <ul className="order_list" key={index}>
                    <p>{item.title}</p>
                    <li>
                      <span>The Principal</span>
                      <span>{item.The_principal}</span>
                    </li>
                    <li>
                      <span>Expected Interest</span>
                      <span>{item.Expected_interest}</span>
                    </li>
                  </ul>
                )
              );
            })}
            <ClaimTime endtime={props.props.endtime} state={props.props.state} />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

PortfolioList.defaultProps = {
  className: '',
  style: null,
};
export default PortfolioList;
