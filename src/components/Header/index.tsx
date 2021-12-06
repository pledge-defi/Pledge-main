import React, { useEffect, useState } from 'react';
import { NavLink, Link, useHistory, useRouteMatch } from 'react-router-dom';
import classnames from 'classnames';

import { Select, message, Drawer } from 'antd';
import Button from '_components/Button';
import ConnectWallet from '_components/ConnectWallet';
import PageUrl from '_constants/pageURL';
import logo from '_assets/images/vector.png';
import list from '_assets/images/Icon (1).png';
import close from '_assets/images/Icon (2).png';

import './index.less';

export interface IHeaderProps {}

type Iparams = {};
const Header: React.FC<IHeaderProps> = () => {
  console.log(location.pathname);
  const [isOpacity, setIsOpacity] = useState(true);
  const [visable, setVisable] = useState(false);
  const { url: routeUrl, params } = useRouteMatch<Iparams>();
  console.log(routeUrl);
  return (
    <div className={classnames('components_header_landing', { no_opacity: isOpacity })}>
      <div className="continer">
        <a className="findora-logo" href={PageUrl.Dapp} target="_self">
          <img src={logo} alt="" width="32.59px" height="32.59px" />
          <span className="logo_name">Pledge</span>
        </a>
        <div className="home_menu_list">
          <NavLink
            to={PageUrl.Dapp}
            activeClassName="active"
            activeStyle={{ color: '##5d52ff' }}
            className={
              location.pathname == '/BUSD'
                ? 'menu-item'
                : location.pathname == '/USDT'
                ? 'menu-item'
                : location.pathname == '/DAI'
                ? 'menu-item'
                : ''
            }
          >
            Market
          </NavLink>
          <NavLink
            to={PageUrl.Lend_Borrow.replace(':mode', 'Lend')}
            activeStyle={{ color: '#5d52ff' }}
            activeClassName="active"
            className={location.pathname == '/Market/Lend' ? 'menu-item' : ''}
          >
            Lend
          </NavLink>
          <NavLink
            to={PageUrl.Lend_Borrow.replace(':mode', 'Borrow')}
            activeStyle={{ color: '#5d52ff' }}
            activeClassName="active"
            className={location.pathname == '/Market/Borrow' ? 'menu-item' : ''}
          >
            Borrow
          </NavLink>
          <NavLink
            to={PageUrl.Lend_Borrow.replace(':mode', 'Provide')}
            className={location.pathname == '/Market/Provide' ? 'menu-item' : ''}
            activeStyle={{ color: '#5d52ff' }}
            activeClassName="active"
          >
            Provide Liquidity
          </NavLink>
          <ConnectWallet />
        </div>
        <div className="modile_list">
          <ConnectWallet />
          <div className="mobile_select">
            <img src={list} onClick={() => setVisable(true)} />
          </div>
          <Drawer placement={'top'} closable={false} onClose={() => setVisable(false)} visible={visable} key={'top'}>
            <div className="drawer_header">
              <img src={close} onClick={() => setVisable(false)} />
            </div>
            <div className="home_menu_list2">
              <NavLink to={PageUrl.Dapp} className="menu-item">
                Market
              </NavLink>
              <NavLink to={PageUrl.Lend_Borrow.replace(':mode', 'Lend')} className="menu-item">
                Lend
              </NavLink>
              <NavLink to={PageUrl.Lend_Borrow.replace(':mode', 'Borrow')} className="menu-item">
                Borrow
              </NavLink>
              <NavLink to={PageUrl.Lend_Borrow.replace(':mode', 'Provide')} className="menu-item">
                Provide Liquidity
              </NavLink>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

Header.defaultProps = {};

export default Header;
