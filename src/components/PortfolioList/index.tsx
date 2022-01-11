import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import { Collapse, Statistic, Row, Col, Table, Steps, message } from 'antd';
import BigNumber from 'bignumber.js';
import Button from '_components/Button';
import OrderImg from '_components/OrderImg';
import ClaimTime from '_components/ClaimTime';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

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
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();

  const { Panel } = Collapse;
  const [stakeAmount, setstakeAmount] = useState('');
  const [stakeAmountborrow, setstakeAmountborrow] = useState('');
  const [BUSDprice, setBUSD] = useState('');
  const [BTCBprice, setBTCB] = useState('');

  const [DAIprice, setDAI] = useState('');

  const [BNBprice, setBNB] = useState('');

  const PoolState = { 0: 'match', 1: 'running', 2: 'expired', 3: 'liquidation', 4: 'undone' };

  const pricelist = {
    '0xDc6dF65b2fA0322394a8af628Ad25Be7D7F413c2': BUSDprice,
    '0xF592aa48875a5FDE73Ba64B527477849C73787ad': BTCBprice,
    '0xf2bDB4ba16b7862A1bf0BE03CD5eE25147d7F096': DAIprice,
    '0x0000000000000000000000000000000000000000': BNBprice,
  };
  const dealNumber_7 = (num) => {
    if (num) {
      let x = new BigNumber(num);
      let y = new BigNumber(1e18);
      return Math.floor(Number(x.dividedBy(y)) * Math.pow(10, 7)) / Math.pow(10, 7);
    }
  };
  const dealNumber_18 = (num) => {
    if (num) {
      let x = new BigNumber(num);
      let y = new BigNumber(1e18);
      return x.dividedBy(y).toFixed();
    }
  };
  const getBalance = () => {
    {
      services.PoolServer.getuserLendInfo((props.props.key - 1).toString()).then((data) => {
        setstakeAmount(data.stakeAmount);
      });
      services.PoolServer.getuserBorrowInfo((props.props.key - 1).toString()).then((data) => {
        setstakeAmountborrow(data.stakeAmount);
      });
    }
  };
  const dealNumber_Price = (num) => {
    if (num) {
      let x = new BigNumber(num);
      let y = new BigNumber(1e8);
      return x.dividedBy(y).toString();
    }
  };
  useEffect(() => {
    getBalance();
  });
  useEffect(() => {
    services.BscPledgeOracleServer.getPrices([
      '0xDc6dF65b2fA0322394a8af628Ad25Be7D7F413c2',
      '0xF592aa48875a5FDE73Ba64B527477849C73787ad',
      '0xf2bDB4ba16b7862A1bf0BE03CD5eE25147d7F096',
      '0x0000000000000000000000000000000000000000',
    ]).then((res) => {
      setBUSD(dealNumber_Price(res[0]));
      setBTCB(dealNumber_Price(res[1]));
      setDAI(dealNumber_Price(res[2]));
      setBNB(dealNumber_Price(res[3]));
    });
  }, []);
  const claimAmount =
    Number(dealNumber_18(props.props.lendSupply)) !== 0
      ? Number(dealNumber_18(datainfo.settleAmountLend)) *
        (Number(dealNumber_18(stakeAmount)) / Number(dealNumber_18(props.props.lendSupply)))
      : 0;
  const claimAmountborrow =
    Number(dealNumber_18(props.props.borrowSupply)) !== 0
      ? Number(dealNumber_18(datainfo.settleAmountBorrow)) *
        (Number(dealNumber_18(stakeAmountborrow)) / Number(dealNumber_18(props.props.borrowSupply)))
      : 0;
  const expectedInterest =
    mode == 'Lend'
      ? ((Number(dealNumber_7(props.props.state < '2' ? datainfo.settleAmountLend : datainfo.finishAmountLend)) *
          Number(props.props.fixed_rate)) /
          100 /
          365) *
        props.props.length
      : ((Number(dealNumber_7(props.props.state < '2' ? datainfo.settleAmountBorrow : datainfo.finishAmountBorrow)) *
          Number(props.props.fixed_rate)) /
          100 /
          365) *
        props.props.length;

  const DetailList = [
    {
      //利息 = 本金*fixed rate/365 * length（天数）
      title: 'Detail',
      Total_financing: `${
        mode == 'Lend'
          ? dealNumber_7(props.props.lendSupply)
          : dealNumber_7(
              ((props.props.borrowSupply * pricelist[props.props.Jp]) /
                pricelist[props.props.Sp] /
                props.props.collateralization_ratio) *
                100,
            )
      }
${props.props.poolname} `,
      Pledge: `${dealNumber_7(props.props.borrowSupply)}${props.props.underlying_asset}`,
      Time: `${props.props.settlement_date}`,
      Collateral_Amount: `${dealNumber_7(Number(stakeAmountborrow))} ${props.props.underlying_asset}`,
      Deposit_Amount: `${dealNumber_7(Number(stakeAmount))} ${props.props.poolname}`,
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
                <Statistic title={`${props.props.poolname}/${props.props.underlying_asset}`} />
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
                <Statistic title={`${Number(props.props.margin_ratio) + 100}%`} />
              </Col>
              <Col span={4} className="media_tab">
                <Statistic title={`${props.props.collateralization_ratio}%`} />
              </Col>
            </Row>
          }
          key="1"
        >
          <div className="order_box">
            {DetailList.map((item, index) => {
              return (
                <>
                  <ul className="order_list" key={index}>
                    <p>{item.title}</p>
                    <ul className="medialist">
                      <li>
                        <span>Margin Ratio</span>
                        <span>{`${Number(props.props.margin_ratio) + 100}%`}</span>
                      </li>
                      <li>
                        <span>Collateralization Ratio</span>
                        <span>{`${props.props.collateralization_ratio}%`}</span>
                      </li>
                      <li>
                        <span>Settlement Date</span>
                        <span>{props.props.settlement_date}</span>
                      </li>
                    </ul>
                    <li>
                      <span>Total Lend</span> <span>{item.Total_financing}</span>
                    </li>

                    {mode == 'Lend' ? (
                      <li>
                        <span>Deposit Amount</span>
                        <span>{item.Deposit_Amount}</span>
                      </li>
                    ) : (
                      <li>
                        <span>Collateral Amount</span>
                        <span>{item.Collateral_Amount}</span>
                      </li>
                    )}
                    <li>
                      <span>Order Time</span> <span>{item.Time}</span>
                    </li>
                  </ul>

                  {props.props.state != 0 && props.props.state != 4 && (
                    <div className="Reward">
                      <p>Reward</p>
                      <div className="rewardinfo">
                        <div className="rewardtab">
                          <p className="rewardkey">
                            {mode == 'Lend' ? 'The principal+interest' : 'Remaining Collateral'}
                          </p>
                          <p className="rewardvalue">
                            {mode == 'Lend'
                              ? `${
                                  Math.floor(Number(dealNumber_18(datainfo.finishAmountLend)) * 10000000) / 10000000
                                }  ${props.props.poolname}`
                              : `${
                                  Math.floor(Number(dealNumber_18(datainfo.finishAmountBorrow)) * 10000000) / 10000000
                                }  ${props.props.underlying_asset}`}
                          </p>
                        </div>
                        <ClaimTime
                          endtime={props.props.endtime}
                          state={props.props.state}
                          pid={props.props.key - 1}
                          value={datainfo.finishAmountLend}
                          mode={mode}
                          settlementAmountLend={datainfo.settleAmountLend}
                          spToken={props.props.Sptoken}
                          jpToken={props.props.Jptoken}
                        />
                      </div>
                    </div>
                  )}
                </>
              );
            })}
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
