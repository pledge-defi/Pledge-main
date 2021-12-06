import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import pageURL from '_constants/pageURL';
import Landing from '_src/pages/Dapp';

const routeMap = [
  {
    path: pageURL.Dapp,
    component: Landing,
    exact: true,
    dynamic: false,
  },
  {
    path: pageURL.Market,
    component: Landing,
    exact: true,
    dynamic: false,
  },
  {
    path: pageURL.Market_Pool,
    component: Landing,
    exact: true,
    dynamic: false,
  },
  {
    path: pageURL.Lend_Borrow,
    component: Landing,
    exact: true,
    dynamic: false,
  },
  {
    path: '*',
    component: () => <div>404</div>,
    exact: true,
    dynamic: false,
  },
];

const Routes = () => {
  return (
    <Suspense fallback={null}>
      <Switch>
        {routeMap.map((item, index) => (
          <Route key={index} path={item.path} exact={item.exact} component={item.component} />
        ))}
      </Switch>
    </Suspense>
  );
};

export default Routes;
