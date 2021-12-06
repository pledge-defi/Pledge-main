import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import 'firebase/firestore';

import Header from '_components/Header';
import { WebLayout } from '_src/Layout';
import Routes from './routes';

import './index.less';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 5000;
  return library;
}

const PortfolioPage: React.FC = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WebLayout className="dapp-page">
        <Header />
        <div className="dapp-router-page">
          <Routes />
        </div>
      </WebLayout>
    </Web3ReactProvider>
  );
};
export default PortfolioPage;
