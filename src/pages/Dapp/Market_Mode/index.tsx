import React, { useEffect } from 'react';
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
  console.log(mode);
  useEffect(() => {
    if (!['Lend', 'Borrow', 'Provide'].includes(mode)) {
      history.push(pageURL.Dapp);
    }
  }, []);

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
          <PortfolioList mode={mode} />
          <PortfolioList mode={mode} />
          <PortfolioList mode={mode} />

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '64px' }}>
            <h3>Access to {mode == 'Borrow' ? 'Borrowing' : 'Lending'}</h3>
            <Tooltip placement="top" title={'Access to Borrowing'}>
              <QuestionCircleOutlined style={{ color: '#0A0B11' }} />
            </Tooltip>
          </div>
          <div className="access" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <AccessTab mode={mode} />
            <AccessTab mode={mode} />
            <AccessTab mode={mode} />
          </div>
          <Refund mode={mode} />
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
