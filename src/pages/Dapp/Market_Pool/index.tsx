import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { Tabs } from 'antd';
import { DappLayout } from '_src/Layout';
import pageURL from '_constants/pageURL';
import Coin_pool from '_components/Coin_pool';

import './index.less';

type Iparams = {
  coin: 'BTCB' | 'ETH' | 'BNB' | 'BTCB' | 'BNB';
  pool: 'BUSD' | 'USDC' | 'DAI';
  mode: 'Borrower' | 'Lender';
};
function MarketPage() {
  const history = useHistory();
  const { url: routeUrl, params } = useRouteMatch<Iparams>();
  console.log(params);
  const { coin, pool, mode } = params;
  const { TabPane } = Tabs;
  const callback = (key) => {
    history.push(key);
  };
  useEffect(() => {}, []);
  console.log(params);
  return (
    ['BTCB', 'ETH', 'BNB', 'BTCB', 'BNB'].includes(coin) && (
      <DappLayout className="dapp_coin_page">
        <Tabs defaultActiveKey="1" onChange={callback} activeKey={mode}>
          <TabPane tab="Lender" key="Lender">
            <Coin_pool mode="Lend" pool={pool} coin={coin} />
          </TabPane>
          <TabPane tab="Borrower" key="Borrower">
            <Coin_pool mode="Borrow" pool={pool} coin={coin} />
          </TabPane>
        </Tabs>
      </DappLayout>
    )
  );
}

export default MarketPage;
