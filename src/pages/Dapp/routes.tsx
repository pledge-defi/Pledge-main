import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import pageURL from '_constants/pageURL';

import DappHome from './Home';
import Loading from '_components/Loading';
import Market_Pool from '_src/pages/Dapp/Market_Pool';
import Market_Mode from '_src/pages/Dapp/Market_Mode';
import Dex from '_src/pages/Dapp/Dex';
const routeMap = [
  {
    path: pageURL.Dapp,
    component: DappHome,
    exact: true,
    dynamic: false,
  },
  {
    path: pageURL.Market,
    component: DappHome,
    exact: true,
    dynamic: false,
  },
  {
    path: pageURL.Market_Pool,
    component: Market_Pool,
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.Lend_Borrow,
    component: Market_Mode,
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.DEX,
    component: Dex,
    exact: true,
    dynamic: true,
  },
  {
    path: '*',
    component: DappHome,
    exact: true,
    dynamic: false,
  },
];

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {routeMap.map((item, index) => (
          <Route key={index} path={item.path} exact={item.exact} component={item.component} />
        ))}
      </Switch>
    </Suspense>
  );
};

export default Routes;
