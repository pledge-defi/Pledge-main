import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { Progress, notification, Divider, Space } from 'antd';
import ConnectWallet from '_components/ConnectWallet';
import BUSD from '_src/assets/images/busd.png';
import BTCB from '_src/assets/images/btcb.png';
import USDT from '_assets/images/order_USDT.png';
import DAI from '_assets/images/order_DAI.png';
import ETH from '_assets/images/4023 2.png';
import BNB from '_assets/images/4023 3.png';
import { InputNumber, Steps, message, Button } from 'antd';
import services from '_src/services';
import { useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
import { FORMAT_TIME_STANDARD } from '_src/utils/constants';
import img1 from '_src/assets/images/4023 1.png';
import JP from '_src/assets/images/Jp.png';
import SP from '_src/assets/images/Sp.png';
import Success from '_src/assets/images/Success.png';
import Error from '_src/assets/images/Error.png';
import LoadingSVG from '_src/assets/images/loading.svg';
import { HomeOutlined, SettingFilled, SmileOutlined, SyncOutlined, LoadingOutlined } from '@ant-design/icons';

import './index.less';
import Button1 from '_components/Button';
import { collectStoredAnnotations } from 'mobx/dist/internal';
import pageURL from '_constants/pageURL';
import { number } from 'prop-types';
import BigNumber from 'bignumber.js';
import { render } from 'react-dom';

export interface ICoin_pool {
  mode: string;
  pool: string;
  coin: string;
}
type Iparams = {
  pid: string;
};
const Context = React.createContext({ name: 'Default' });
const Coin_pool: React.FC<ICoin_pool> = ({ mode, pool, coin }) => {
  const [data, setData] = useState(0);
  const [balance, setbalance] = useState('');
  const [poolinfo, setpoolinfo] = useState({});
  const [borrowvalue, setborrowvalue] = useState(0);
  const [lendvalue, setlendvalue] = useState(0);
  const { connector, library, chainId, account } = useWeb3React();
  const [loadings, setloadings] = useState(false);
  const { url: routeUrl, params } = useRouteMatch<Iparams>();
  const { pid } = params;
  // const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
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
          <p style={{ marginLeft: '33px' }}>{'Approve success'}</p>
        </div>
      ),
    });
  };
  const openNotificationerror = (placement) => {
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
          <p style={{ marginLeft: '33px' }}>{'Approve error'}</p>
        </div>
      ),
    });
  };
  const openNotificationlend = (placement) => {
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
          <p style={{ marginLeft: '33px' }}>{'Lend success'}</p>
        </div>
      ),
    });
  };
  const openNotificationborrow = (placement) => {
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
          <p style={{ marginLeft: '33px' }}>{'Borrow success'}</p>
        </div>
      ),
    });
  };
  const openNotificationerrorlend = (placement) => {
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
          <p style={{ marginLeft: '33px' }}>{'Lend error'}</p>
        </div>
      ),
    });
  };
  const openNotificationerrorborrow = (placement) => {
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
          <p style={{ marginLeft: '33px' }}>{'Borrow error'}</p>
        </div>
      ),
    });
  };
  const poolAsset = {
    '0xDc6dF65b2fA0322394a8af628Ad25Be7D7F413c2': 'BUSD',
    '0xF592aa48875a5FDE73Ba64B527477849C73787ad': 'BTCB',
    '0xf2bDB4ba16b7862A1bf0BE03CD5eE25147d7F096': 'DAI',
    '0x0000000000000000000000000000000000000000': 'BNB',
  };
  const dealNumber = (num) => {
    if (num) {
      let x = new BigNumber(num);
      let y = new BigNumber(1e18);
      return x.multipliedBy(y).toFixed();
    }
  };
  const dealNumber_18 = (num) => {
    if (num) {
      let x = new BigNumber(num);
      let y = new BigNumber(1e18);
      return Math.floor(Number(x.dividedBy(y)) * Math.pow(10, 7)) / Math.pow(10, 7);
    }
  };
  const dealNumber_7 = (num) => {
    if (num) {
      return Math.floor(num * Math.pow(10, 7)) / Math.pow(10, 7);
    }
  };
  const dealNumber_8 = (num) => {
    if (num) {
      let x = new BigNumber(num);
      let y = new BigNumber(1e6);
      return x.dividedBy(y).toString();
    }
  };

  const getPoolInfo = async () => {
    const datainfo = await services.PoolServer.getPoolBaseData();
    // 获取余额;

    console.log(datainfo);
    const res = datainfo.map((item, index) => {
      let maxSupply = dealNumber_18(item.maxSupply);
      let borrowSupply = dealNumber_18(item.borrowSupply);
      let lendSupply = dealNumber_18(item.lendSupply);
      console.log(maxSupply);
      const settlementdate = moment.unix(item.settleTime).format(FORMAT_TIME_STANDARD);
      const maturitydate = moment.unix(item.endTime).format(FORMAT_TIME_STANDARD);
      var difftime = item.endTime - item.settleTime;

      var days = parseInt(difftime / 86400 + '');
      console.log('state', item.state);
      return {
        key: index + 1,
        state: item.state,
        underlying_asset: poolAsset[item.borrowToken],
        fixed_rate: dealNumber_8(item.interestRate),
        maxSupply: maxSupply,
        available_to_lend: [borrowSupply, lendSupply],
        settlement_date: settlementdate,
        length: `${days} day`,
        margin_ratio: `${dealNumber_8(item.autoLiquidateThreshold)}%`,
        collateralization_ratio: `${dealNumber_8(item.martgageRate)}%`,
        poolname: poolAsset[item.lendToken],
        endTime: item.endTime,
        settleTime: item.settleTime,
        maturity_date: maturitydate,
        logo: img1,
        Sp: item.lendToken,
        Jp: item.borrowToken,
      };
    });
    setpoolinfo(res);
  };
  console.log(poolinfo[pid]);
  useEffect(() => {
    getPoolInfo();
  }, []);

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

  return (
    <div className="coin_pool">
      <div className="coin_pool_box">
        <div className="coin_pool_box_title">
          <img src={imglist[pool]} /> <h3>{pool} Pool</h3>
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
            percent={((poolinfo[pid]?.available_to_lend[1] ?? 0) / poolinfo[pid]?.maxSupply ?? 0) * 100}
            showInfo={false}
            strokeColor="#5D52FF"
            success={{
              percent: (poolinfo[pid]?.available_to_lend[0] ?? 0) / poolinfo[pid]?.maxSupply ?? 0,
            }}
          />
          <p style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>
              <span style={{ color: '#ffa011' }}>{`${toThousands(poolinfo[pid]?.available_to_lend[0] ?? 0)}`}</span>/
              <span style={{ color: '#5D52FF' }}>{`${toThousands(poolinfo[pid]?.available_to_lend[1] ?? 0)}`}</span>
            </span>
            <span>{toThousands(poolinfo[pid]?.maxSupply ?? 0)}</span>
          </p>
        </div>
        <div className="fixed">
          <p>
            <span className="info_title1_num">{`${poolinfo[pid]?.fixed_rate ?? 0} %`}</span>
            <span className="info_title1">Fixed Rate</span>
          </p>
          <p>
            <span className="info_title1_num">{poolinfo[pid]?.margin_ratio ?? 0}</span>
            <span className="info_title1">Margin Ratio</span>
          </p>
          <p>
            <span className="info_title1_num">{poolinfo[pid]?.collateralization_ratio ?? 0}</span>
            <span className="info_title1">Collateralization Ratio</span>
          </p>
        </div>
        <p className="info_key">
          <span className="info_title">Underlying Asset</span>
          <span className="info_key_info">{coin}</span>
        </p>
        <p className="info_key">
          <span className="info_title">Collaterial In Escrow</span>
          <span className="info_key_info">
            {poolinfo[pid]?.available_to_lend[0] ?? 0} {coin}
          </span>
        </p>
        <p className="info_key">
          <span className="info_title">Settlement date</span>
          <span className="info_key_info">{poolinfo[pid]?.settlement_date ?? 0}</span>
        </p>
      </div>

      <div className="coin_pool_box2">
        <div className="coin_pool_box2_title">
          <p className="info_title2">How much do you want to {mode == 'Lend' ? 'Lend' : 'Borrow'}?</p>
          {mode == 'Lend' ? (
            <>
              <div className="balance_input">
                <p style={{ fontWeight: 400 }}>
                  Balance: {balance && parseInt(dealNumber_18(balance).toString())} {pool}
                </p>
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
                    value={dealNumber_7(borrowvalue) ? dealNumber_7(borrowvalue) : ''}
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
                  <p style={{ fontWeight: 400 }}>
                    Balance: {(balance && parseInt(dealNumber_18(balance).toString())) || 0} {coin}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <InputNumber
                      type="number"
                      value={dealNumber_7(data) ? dealNumber_7(data) : ''}
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
          <span className="info_title">Fee</span>{' '}
          <span className="info_key_info">{poolinfo[pid]?.fixed_rate ?? 0}%</span>
        </p>
        <p className="info_key">
          <span className="info_title">Receive</span>{' '}
          <span className="info_key_info">
            {mode === 'Lend' ? (
              <img src={SP} alt="" style={{ width: '24px', marginRight: '8px' }} />
            ) : (
              <img src={JP} alt="" style={{ width: '24px', marginRight: '8px' }} />
            )}
            {borrowvalue ? borrowvalue.toFixed(2) : lendvalue ? lendvalue.toFixed(2) : '0.00'}
            {'  '}
            {mode === 'Lend' ? 'SP-Token' : 'JP-Token'}
          </span>
        </p>
        <p className="info_key">
          <span className="info_title">Expected Interest</span>{' '}
          <span className="info_key_info">
            {borrowvalue
              ? (poolinfo[pid]?.fixed_rate / 100 ?? 0) * borrowvalue
              : lendvalue
              ? (poolinfo[pid]?.fixed_rate / 100 ?? 0) * lendvalue
              : '0.00'}{' '}
            {pool}
          </span>
        </p>
        <p className="info_key">
          <span className="info_title">Maturity Date</span>{' '}
          <span className="info_key_info">{poolinfo[pid]?.maturity_date ?? 0}</span>
        </p>
        {mode == 'Lend' ? (
          <div>
            <div
              className="steps-action"
              style={{ display: 'flex', justifyContent: 'space-between', margin: '42px 0 10px' }}
            >
              {current < steps.length - 1 && (
                <>
                  {chainId == undefined ? (
                    <ConnectWallet className="borrowwallet" />
                  ) : (
                    <Context.Provider value={{ name: 'Ant Design' }}>
                      <Button1
                        style={{ width: '48%', borderRadius: '15px' }}
                        loading={loadings}
                        onClick={async () => {
                          if (lendvalue < 100) {
                            return alert('Minimum deposit quantity 100 BUSD');
                          }
                          setloadings(true);
                          services.ERC20Server.balanceOf(poolinfo[pid]?.Sp ?? 0).then((res) => {
                            setbalance(res);
                          });
                          let num = dealNumber(lendvalue);
                          await services.ERC20Server.Approve(poolinfo[pid]?.Sp ?? 0, num)
                            .then(() => {
                              openNotification('Success');
                              setloadings(false);
                              next();
                            })
                            .catch(() => {
                              openNotificationerror('Error'), setloadings(false);
                            });

                          //授权的SPtoken
                          await services.ERC20Server.allowance(poolinfo[pid]?.Sp ?? 0).catch(() => console.error());
                        }}
                        disabled={lendvalue == 0 || lendvalue == null ? true : false}
                      >
                        Approve
                      </Button1>
                    </Context.Provider>
                  )}
                  <Button1
                    style={{ width: '48%' }}
                    disabled={true}
                    onClick={() => message.success('Processing complete!')}
                  >
                    Lend
                  </Button1>
                </>
              )}
              {current === steps.length - 1 && (
                <>
                  <Button1 style={{ width: '48%', borderRadius: '15px' }} disabled={true} onClick={() => next()}>
                    Approve
                  </Button1>
                  <Button1
                    loading={loadings}
                    style={{ width: '48%', borderRadius: '15px' }}
                    onClick={async () => {
                      let num = dealNumber(lendvalue);
                      console.log(num, lendvalue);
                      setloadings(true);
                      // //lend方法
                      console.log(poolinfo[pid]?.Jp ?? 0);
                      services.PoolServer.depositLend(pid, num, poolinfo[pid]?.Jp ?? 0)
                        .then(() => {
                          setloadings(false);
                          openNotificationlend('Success');
                          prev();
                        })
                        .catch(() => {
                          openNotificationerrorlend('Error'), setloadings(false);
                        });
                    }}
                  >
                    Lend
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
        ) : (
          <div>
            <div
              className="steps-action"
              style={{ display: 'flex', justifyContent: 'space-between', margin: '42px 0 10px' }}
            >
              {current < steps.length - 1 && (
                <>
                  {chainId == undefined ? (
                    <ConnectWallet className="borrowwallet" />
                  ) : (
                    <Button1
                      style={{ width: '48%', borderRadius: '15px' }}
                      loading={loadings}
                      onClick={async () => {
                        if (borrowvalue < 100) {
                          return alert('Minimum deposit quantity 100 BUSD');
                        }
                        setloadings(true);
                        services.ERC20Server.balanceOf(poolinfo[pid]?.Sp ?? 0).then((res) => {
                          setbalance(res);
                        });
                        let borrownum = dealNumber(borrowvalue);
                        await services.ERC20Server.Approve(poolinfo[pid]?.Jp ?? 0, borrownum)
                          .then(() => {
                            openNotification('Success');
                            setloadings(false);
                            next();
                          })
                          .catch(() => {
                            openNotificationerror('Error'), setloadings(false);
                          });

                        // // // //授权的JPtoken
                        await services.ERC20Server.allowance(poolinfo[pid]?.Jp ?? 0)
                          .then((data) => {
                            console.log('授权' + data);
                          })
                          .catch(() => console.error());
                      }}
                      disabled={data == 0 || data == null ? true : false}
                    >
                      Approve
                    </Button1>
                  )}
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
                    loading={loadings}
                    onClick={async () => {
                      //  window.open(pageURL.Lend_Borrow.replace(':mode', `${mode}`));
                      setloadings(true);
                      var timestamp = Math.round(new Date().getTime() / 1000 + 300).toString();
                      console.log(timestamp);
                      services.ERC20Server.balanceOf(poolinfo[pid]?.Sp ?? 0).then((res) => {
                        setbalance(res);
                      });
                      // // 授权
                      console.log(poolinfo[pid]?.Sp ?? 0, borrowvalue);
                      let borrownum = dealNumber(borrowvalue);
                      // // //borrow方法
                      services.PoolServer.depositBorrow(pid, borrownum, timestamp, poolinfo[pid]?.Jp ?? 0)
                        .then(() => {
                          openNotificationborrow('Success');
                          setloadings(false);
                          prev();
                        })
                        .catch(() => {
                          openNotificationerrorborrow('Error'), setloadings(false);
                        });
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
