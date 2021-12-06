import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import { Progress } from 'antd';
import ConnectWallet from '_components/ConnectWallet';
import BUSD from '_src/assets/images/busd.png';
import BTCB from '_src/assets/images/btcb.png';
import USDT from '_assets/images/order_USDT.png';
import DAI from '_assets/images/order_DAI.png';
import ETH from '_assets/images/4023 2.png';
import BNB from '_assets/images/4023 3.png';
import { InputNumber, Steps, message, Button } from 'antd';

import './index.less';
import Button1 from '_components/Button';
import { collectStoredAnnotations } from 'mobx/dist/internal';
import pageURL from '_constants/pageURL';
import { number } from 'prop-types';

export interface ICoin_pool {
  mode: string;
  pool: string;
  coin: string;
}
const Coin_pool: React.FC<ICoin_pool> = ({ mode, pool, coin }) => {
  console.log(coin);
  const [data, setData] = useState(0);
  const [borrowvalue, setborrowvalue] = useState(0);
  const [lendvalue, setlendvalue] = useState(0);
  //每三位加一个小数点
  function toThousands(num) {
    var num = (num || 0).toString(),
      result = '';
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return result;
  }
  const imglist = {
    BUSD: BUSD,
    USDT: USDT,
    DAI: DAI,
    ETH: ETH,
    BNB: BNB,
    BTCB: BTCB,
  };
  const coinlist = {
    BTCB: 60000,
    ETH: 4000,
    BNB: 600,
  };
  function handleOnChange(value) {
    setlendvalue(value);
  }
  function handleOnChange2(value) {
    setData(value);
    setborrowvalue((value * coinlist[coin]) / 2);
  }
  function handleOnChange3(value) {
    setborrowvalue(value);
    setData((value / coinlist[coin]) * 2);
  }
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

  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  console.log(lendvalue);
  return (
    <div className="coin_pool">
      <div className="coin_pool_box">
        <div className="coin_pool_box_title">
          <img src={imglist[pool]} alt="" style={{ width: '40px', height: '40px' }} /> <h3>{pool} Pool</h3>
        </div>
        <div className="coin_pool_box_info">
          <p className="info_title">
            <span>
              <span style={{ backgroundColor: '#FFA011' }}></span>
              Lending Amount
            </span>
            <span>
              <span style={{ backgroundColor: '#5D52FF' }}></span>Available To Lend
            </span>
            <span className="total_lend">
              <span style={{ backgroundColor: '#F5F5FA' }}></span>Total Lend
            </span>
          </p>
          <Progress
            percent={(388000000 / 500000000) * 100}
            showInfo={false}
            strokeColor="#5D52FF"
            success={{ percent: 30 }}
          />
          <p style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>
              <span style={{ color: '#ffa011' }}> {`${toThousands(230000000)}`}</span>/
              <span style={{ color: '#5D52FF' }}>{`${toThousands(388000000)}`}</span>
            </span>
            <span>{toThousands(500000000)}</span>
          </p>
        </div>
        <div className="fixed">
          <p>
            <span className="info_title1_num">5%</span>
            <span className="info_title1">Fixed Rate</span>
          </p>
          <p>
            <span className="info_title1_num">150%</span>
            <span className="info_title1">Margin Ratio</span>
          </p>
          <p>
            <span className="info_title1_num">200%</span>
            <span className="info_title1">Collateralization Ratio</span>
          </p>
        </div>
        <p className="info_key">
          <span className="info_title">Underlying Asset</span>
          <span className="info_key_info">{coin}</span>
        </p>
        <p className="info_key">
          <span className="info_title">Collaterial In Escrow</span>
          <span className="info_key_info">380 {coin}</span>
        </p>
        <p className="info_key">
          <span className="info_title">Settlement date</span>
          <span className="info_key_info">2021/11/01 12:00</span>
        </p>
      </div>

      <div className="coin_pool_box2">
        <div className="coin_pool_box2_title">
          <p className="info_title2">How much do you want to {mode == 'Lender' ? 'lend' : 'borrow'}?</p>
          {mode == 'Lend' ? (
            <>
              <div className="balance_input">
                <p style={{ fontWeight: 400 }}>Balance: 100 {pool}</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <InputNumber
                    name="input1"
                    type="number"
                    onChange={handleOnChange}
                    bordered={false}
                    style={{ width: '100%', fontSize: '24px' }}
                    placeholder="0.000....."
                  />
                  <button
                    style={{
                      color: '#5D52FF',
                      fontSize: '20px',
                      background: 'none',
                      border: 'none',
                      borderRight: '2px solid #E6E6EB',
                      paddingRight: '8px',
                      marginRight: '8px',
                    }}
                  >
                    Max
                  </button>
                  <div className="coin_pool_box_title" style={{ margin: '0' }}>
                    <img src={imglist[pool]} alt="" style={{ width: '28px', height: '28px' }} /> <h3>{pool}</h3>
                  </div>
                </div>
              </div>
              <p style={{ paddingBottom: '28px', marginBottom: '28px', borderBottom: '1px dashed #E6E6EB' }}>
                Minimum deposit quantity{' '}
                <span style={{ color: '#5D52FF' }}>
                  {100} {pool}
                </span>
              </p>
            </>
          ) : (
            <>
              <div className="borrow_input">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <InputNumber
                    type="number"
                    name="input3"
                    value={borrowvalue ? borrowvalue : ''}
                    onChange={handleOnChange3}
                    bordered={false}
                    style={{ width: '100%', fontSize: '24px', paddingLeft: '18px' }}
                    placeholder="0.000....."
                  />

                  <div className="coin_pool_box_title">
                    <img src={imglist[pool]} alt="" style={{ width: '28px', height: '28px' }} /> <h3>{pool}</h3>
                  </div>
                </div>
              </div>
              <p style={{ padding: '10px 0 32px' }}>
                Minimum deposit quantity{' '}
                <span style={{ color: '#5D52FF' }}>
                  {100} {pool}
                </span>
              </p>
              <p className="info_title2">How much collateral do you want to pledge?</p>
              <div style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px dashed #E6E6EB' }}>
                <div className="balance_input">
                  <p style={{ fontWeight: 400 }}>Balance: 100 {coin}</p>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <InputNumber
                      type="number"
                      value={data ? data : ''}
                      name="input2"
                      onChange={handleOnChange2}
                      bordered={false}
                      style={{ width: '100%', fontSize: '24px' }}
                      placeholder="0.000....."
                    />
                    <button
                      style={{
                        color: '#5D52FF',
                        fontSize: '20px',
                        background: 'none',
                        border: 'none',
                        borderRight: '2px solid #E6E6EB',
                        paddingRight: '8px',
                        marginRight: '8px',
                      }}
                    >
                      Max
                    </button>
                    <div className="coin_pool_box_title" style={{ margin: '0' }}>
                      <img src={imglist[coin]} alt="" style={{ width: '28px', height: '28px' }} /> <h3>{coin}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <p className="info_key">
          <span className="info_title">Fee</span> <span className="info_key_info">0.1%</span>
        </p>
        <p className="info_key">
          <span className="info_title">Receive</span>{' '}
          <span className="info_key_info">
            {borrowvalue ? borrowvalue.toFixed(2) : lendvalue ? lendvalue.toFixed(2) : '0.00'}
            {'  '}
            {mode === 'Lend' ? 'SP-Token' : 'JP-Token'}
          </span>
        </p>
        <p className="info_key">
          <span className="info_title">Expected Interest</span>{' '}
          <span className="info_key_info">
            {borrowvalue ? (0.05 * borrowvalue).toFixed(2) : lendvalue ? 0.05 * lendvalue : '0.00'} {pool}
          </span>
        </p>
        <p className="info_key">
          <span className="info_title">Maturity Date</span> <span className="info_key_info">2021/12/01 12:00</span>
        </p>
        {mode == 'Lend' ? (
          <div>
            <Button1 style={{ marginTop: '60px' }} disabled={lendvalue == 0 || lendvalue == null ? true : false}>
              Connect Wallet
            </Button1>
            {/* <ConnectWallet /> */}
          </div>
        ) : (
          <div>
            <div
              className="steps-action"
              style={{ display: 'flex', justifyContent: 'space-between', margin: '42px 0 10px' }}
            >
              {current < steps.length - 1 && (
                <>
                  <Button1
                    style={{ width: '48%', borderRadius: '15px' }}
                    onClick={() => next()}
                    disabled={data == 0 || data == null ? true : false}
                  >
                    Approve
                  </Button1>
                  <Button1
                    style={{ width: '48%' }}
                    disabled={true}
                    onClick={() => message.success('Processing complete!')}
                  >
                    Borrow
                  </Button1>
                </>
              )}
              {current === steps.length - 1 && (
                <>
                  <Button1 style={{ width: '48%', borderRadius: '15px' }} disabled={true} onClick={() => next()}>
                    Approve
                  </Button1>
                  <Button1
                    style={{ width: '48%', borderRadius: '15px' }}
                    onClick={() => {
                      prev(), window.open(pageURL.Lend_Borrow.replace(':mode', `${mode}`));
                    }}
                  >
                    Borrow
                  </Button1>
                </>
              )}
            </div>
            <Steps current={current} style={{ width: '60%', margin: '0 auto' }}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
          </div>
        )}
      </div>
    </div>
  );
};

Coin_pool.defaultProps = {};

export default Coin_pool;
