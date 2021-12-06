import React, { useEffect, useState } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { notification } from 'antd';

import Button from '_components/Button';
import { injected } from './connector';
import { useEagerConnect, useInactiveListener } from '_components/ConnectWallet/WalletHooks';

import metamaskLogo from '_assets/images/metamask_logo.png';

import './index.less';

const ConnectWallet = () => {
  const triedEager = useEagerConnect();
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = useState<InjectedConnector>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    } else {
      if (error instanceof UnsupportedChainIdError) {
        notification.warning({
          message: error?.name,
          description: error?.message,
          top: 80,
        });
      }
    }
  }, [activatingConnector, connector]);

  const activating = injected === activatingConnector;
  const connected = injected === connector;
  const disabled = !triedEager || !!activatingConnector || !!error;
  const isDisconnect = !error && chainId;

  useInactiveListener(!triedEager || !!activatingConnector);

  function handleOnCLickConnectWallet() {
    if (!isDisconnect) {
      setActivatingConnector(injected);
      activate(injected);
    } else {
      deactivate();
    }
  }

  function ButtonSwitchComponent() {
    if (connected && isDisconnect) {
      return (
        <div className="wallet_connected">
          <img src={metamaskLogo} />
          <span>{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
        </div>
      );
    } else {
      if (activating) {
        return <Button rightAngleDirection="leftBottom">Connectting</Button>;
      } else {
        return (
          <Button rightAngleDirection="leftBottom" onClick={handleOnCLickConnectWallet}>
            Connect Wallet
          </Button>
        );
      }
    }
  }
  return <div className="components_connect_wallet">{ButtonSwitchComponent()}</div>;
};

export default ConnectWallet;
