import React, { useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { Tooltip, Button, Empty } from 'antd';
import Button1 from '_components/Button';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { DappLayout } from '_src/Layout';
import PortfolioList from '_components/PortfolioList';
import ClaimList from '_components/ClaimList';
import AccessTab from '_components/AccessTab';
import Emptyimg from '_assets/images/empty.png';
import Refund from '_components/Refund';
import services from '_src/services';
import { FORMAT_TIME_STANDARD } from '_src/utils/constants';
import moment from 'moment';

import pageURL from '_constants/pageURL';

import './index.less';
import OrderImg from '_components/OrderImg';
import { hexlify } from '@ethersproject/bytes';

type Iparams = {
  mode: 'Lend' | 'Borrow' | 'Provide';
};
function Market_Mode() {
  const history = useHistory();
  const { url: routeUrl, params } = useRouteMatch<Iparams>();
  const { mode } = params;

  const [data, setdata] = useState([]);
  const [datastate, setdatastate] = useState([]);
  const [datainfo, setdatainfo] = useState([]);

  const poolAsset = {
    '0xDc6dF65b2fA0322394a8af628Ad25Be7D7F413c2': 'BUSD',
    '0xF592aa48875a5FDE73Ba64B527477849C73787ad': 'BTCB',
    '0xf2bDB4ba16b7862A1bf0BE03CD5eE25147d7F096': 'DAI',
    '0x0000000000000000000000000000000000000000': 'BNB',
  };
  const getPoolInfo = async () => {
    const datainfo = await services.PoolServer.getPoolBaseData();
    const datainfo1 = await services.PoolServer.getPoolDataInfo();

    setdatainfo(datainfo1);
    const res = datainfo.map((item, index) => {
      let maxSupply = (item.maxSupply / 1000000000000000000).toFixed(0);
      let borrowSupply = (item.borrowSupply / 1000000000000000000).toFixed(0);
      let lendSupply = (item.lendSupply / 1000000000000000000).toFixed(0);
      console.log(maxSupply);

      const times = moment.unix(item.settleTime).format(FORMAT_TIME_STANDARD);

      var difftime = item.endTime - item.settleTime;

      var days = parseInt(difftime / 86400 + '');
      console.log('state', item.state);
      return {
        key: index + 1,
        state: item.state,
        underlying_asset: poolAsset[item.borrowToken],
        fixed_rate: item.interestRate / 1000000,
        maxSupply: maxSupply,
        available_to_lend: [borrowSupply, lendSupply],
        settlement_date: times,
        length: `${days} day`,
        margin_ratio: `${item.autoLiquidateThreshold / 1000000}%`,
        collateralization_ratio: `${item.martgageRate / 1000000}%`,
        poolname: poolAsset[item.lendToken],
      };
    });
    console.log(res);
    setdata(res);
    setdatastate(res);
    console.log(data);
  };
  useEffect(() => {
    getPoolInfo();
  }, []);
  console.log(mode);
  useEffect(() => {
    if (!['Lend', 'Borrow', 'Provide'].includes(mode)) {
      history.push(pageURL.Dapp);
    }
  }, []);
  const LendTitle = [
    'Pool / Underlying Asset',
    'Total Lend Amount',
    'Total Borrow Amount',
    'Quantity Deposit',
    'Refund Deposit',
    'Extract The Refund',
  ];
  const BorrowTitle = [
    'Pool / Underlying Asset',
    'Total Lend Amount',
    'Total Borrow Amount',
    'Quantity Borrow',
    'Refund Borrow',
    'Extract The Refund',
  ];
  const PortfolioListTitle1 = ['Pool / Underlying Asset', 'Fixed Rate', 'State'];
  const PortfolioListTitle = [
    'Pool / Underlying Asset',
    'Fixed Rate',
    'State',
    'Settlement Date',
    'Margin Ratio',
    'Collateralization Ratio',
  ];

  return (
    <>
      {mode !== 'Provide' ? (
        <DappLayout title={`${mode} Order`} className="dapp_mode_page">
          <p className="prtfolioList_title">
            {PortfolioListTitle.map((item, index) => {
              return (
                <span className="all_tab" key={index}>
                  {item}
                </span>
              );
            })}
            {PortfolioListTitle1.map((item, index) => {
              return (
                <span className="media_tab" key={index}>
                  {item}
                </span>
              );
            })}
          </p>
          {console.log(data)}
          {data.map((item, index) => {
            return <PortfolioList mode={mode} props={item} key={index} />;
          })}

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '64px' }}>
            <h3>Access to {mode == 'Borrow' ? 'Borrowing' : 'Lending'}</h3>
            <Tooltip placement="top" title={'Access to Borrowing'}>
              <QuestionCircleOutlined style={{ color: '#0A0B11' }} />
            </Tooltip>
          </div>
          <div className="access">
            {data.map((item, index) => {
              return <AccessTab mode={mode} props={item} key={index} stateinfo={datainfo[index]} />;
            })}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '64px' }}>
              <h3>{mode == 'Lend' ? 'Refund Deposit' : 'Refund Borrow'}</h3>
              <Tooltip placement="top" title={mode == 'Lend' ? 'Refund Deposit' : 'Refund Borrow'}>
                <QuestionCircleOutlined style={{ color: '#0A0B11' }} />
              </Tooltip>
            </div>
            <p className="prtfolioList_title">
              {mode == 'Lend'
                ? LendTitle.map((item, index) => {
                    return (
                      <span className="all_tab" key={index}>
                        {item}
                      </span>
                    );
                  })
                : BorrowTitle.map((item, index) => {
                    return (
                      <span className="all_tab" key={index}>
                        {item}
                      </span>
                    );
                  })}
            </p>
            {data.map((item, index) => {
              return <Refund mode={mode} props={item} key={index} stateinfo={datainfo[index]} />;
            })}
          </div>
        </DappLayout>
      ) : (
        <DappLayout title={`${mode} Order`} className="dapp_mode_page">
          <div className="order_empty">
            <p style={{ color: 'blue' }}>(用来展示Borrow页空页效果)</p>
            <p className="prtfolioList_title">
              {PortfolioListTitle.map((item, index) => {
                return (
                  <span className="all_tab" key={index}>
                    {item}
                  </span>
                );
              })}
              {PortfolioListTitle1.map((item, index) => {
                return <span className="media_tab" key={index}></span>;
              })}
            </p>
            <Empty
              image={Emptyimg}
              imageStyle={{
                height: 60,
              }}
              description={<span>No {mode} order</span>}
            >
              <Button type="primary" className="emptybutton">
                <a href="/">Go to maket pool</a>
              </Button>
            </Empty>
          </div>
        </DappLayout>
      )}
    </>
  );
}

export default Market_Mode;
