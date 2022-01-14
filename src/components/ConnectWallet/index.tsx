import React, { useEffect, useState } from 'react';
import ChainBridge from '_constants/ChainBridge';
import services from '_src/services';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import type { InjectedConnector } from '@web3-react/injected-connector';
import { Dropdown, Menu, notification } from 'antd';
import styled from 'styled-components';
import { injected } from './connector';
import { useEagerConnect, useInactiveListener } from './WalletHooks';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '_components/Button';

const WalletInfo = styled.div`
  width: 160px;
  padding: 3px 8px;
  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 5px 0;
    > div {
      font-weight: 600;
      font-size: 16px;
    }
    *:first-child {
      padding-right: 10px;
    }
  }
`;
const WalletConnected = styled.div``;
const WalletConnecting = styled.div``;
const WalletNoConnected = styled.div``;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IConnectWallet {
  className?: string;
}

const ConnectWallet: React.FC<IConnectWallet> = ({ className }) => {
  const triedEager = useEagerConnect();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { connector, chainId, account, activate, deactivate, error } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = useState<InjectedConnector>();

  async function activatingConnectorFn() {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    } else {
      if (error instanceof UnsupportedChainIdError) {
        console.log(error);
        const fraNetworkDefault = ChainBridge.chains
          .filter((item) => item.type === 'Ethereum')
          .find((item) => item.networkId === 525);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activatingConnector, connector]);

  const activating = injected === activatingConnector;
  const connected = injected === connector;
  // const disabled = !triedEager || !!activatingConnector || !!error;
  const isDisconnect = !error && chainId;

  useInactiveListener(!triedEager || !!activatingConnector);

  function handleOnCLickConnectWallet() {
    if (!isDisconnect) {
      setActivatingConnector(injected);
      activate(injected);
    } else {
      // deactivate();
    }
  }

  function ButtonSwitchComponent() {
    if (connected && isDisconnect) {
      return (
        <Dropdown
          overlay={
            <Menu>
              <WalletInfo>
                <div>
                  <img src={require('_assets/images/meta-mask-border.svg')} alt="" />
                  <span>MetaMask</span>
                </div>
                <div>
                  <div>{`${account?.slice(0, 6)}···${account?.slice(-4)}`}</div>
                  <CopyToClipboard text={account!}>
                    <img src={require('_assets/images/copy-icon.svg')} alt="" style={{ cursor: 'pointer' }} />
                  </CopyToClipboard>
                </div>
              </WalletInfo>
            </Menu>
          }
        >
          <WalletConnected onClick={handleOnCLickConnectWallet}>
            <img src={require('_assets/images/meta-mask.svg')} alt="" />
            <span className="address">{`${account?.slice(0, 6)}···${account?.slice(-4)}`}</span>
          </WalletConnected>
        </Dropdown>
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
