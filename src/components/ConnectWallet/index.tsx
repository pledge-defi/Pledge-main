import React, { useEffect, useState, useCallback } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { notification } from 'antd';
import classNames from 'classnames';

import { injected } from './connector';
import { useEagerConnect, useInactiveListener } from '_components/ConnectWallet/WalletHooks';
import ChainBridge from '_constants/ChainBridge';
import Button from '_components/Button';

import metamaskLogo from '_assets/images/metamask_logo.png';

import './index.less';
import services from '_src/services';
export interface IConnectWallet {
  className?: string;
  style?: React.CSSProperties;
}

const ConnectWallet: React.FC<IConnectWallet> = ({ className, style, children }) => {
  const triedEager = useEagerConnect();
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();

  const [activatingConnector, setActivatingConnector] = useState<InjectedConnector>();
  console.log('====chainId', chainId);

  async function activatingConnectorFn() {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    } else {
      if (error instanceof UnsupportedChainIdError) {
        const fraNetworkDefault = ChainBridge.chains
          .filter((item) => item.type === 'Ethereum')
          .find((item) => item.networkId === 97);
        try {
          await services.PoolServer.switchNetwork(fraNetworkDefault);
        } catch {
          notification.warning({
            message: error?.name,
            description: error?.message,
            top: 80,
          });
        }
      }
    }
  }

  useEffect(() => {
    activatingConnectorFn();
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
    }

    if (activating) {
      return <Button rightAngleDirection="leftBottom">Connectting</Button>;
    }
    return (
      <Button rightAngleDirection="leftBottom" onClick={handleOnCLickConnectWallet}>
        Connect Wallet
      </Button>
    );
  }
  return <div className="components_connect_wallet">{ButtonSwitchComponent()}</div>;
};

export default ConnectWallet;
