import classNames from 'classnames';
import React from 'react';

import { Collapse, Statistic, Row, Col, Table, Steps, message } from 'antd';

import Button from '_components/Button';
import OrderImg from '_components/OrderImg';
import ClaimTime from '_components/ClaimTime';

import './index.less';

export interface IPortfolioList {
  className?: string;
  style?: React.CSSProperties;
  mode: string;
}

const PortfolioList: React.FC<IPortfolioList> = ({ className, mode, ...props }) => {
  const { Panel } = Collapse;

  const DetailList = [
    {
      title: 'Detail',
      Total_financing: '388,000,000 BUSD',
      Balance: mode == 'Borrow' ? '100.00 JP-Token' : '100.00 SP-Token',
      Pledge: '10 BTCB',
      Time: '2021.12.12 12:22',
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
                <OrderImg img1="BUSD" img2="BTCB" />
                <Statistic title="BUSD-BTCB" />
              </Col>
              <Col span={4}>
                <Statistic title="5%" />
              </Col>
              <Col span={4}>
                <Statistic title="Expired" />
              </Col>
              <Col span={4} className="media_tab">
                <Statistic title="2021/11/01 12:00" />
              </Col>
              <Col span={4} className="media_tab">
                <Statistic title="150%" />
              </Col>
              <Col span={4} className="media_tab">
                <Statistic title="200% " />
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
                <ul className="order_list" key={index}>
                  <p>{item.title}</p>
                  <li>
                    <span>The_principal</span>
                    <span>{item.The_principal}</span>
                  </li>
                  <li>
                    <span>Expected_interest</span>
                    <span>{item.Expected_interest}</span>
                  </li>
                </ul>
              );
            })}
            <ClaimTime />
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
