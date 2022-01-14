import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import services from '_src/services';
import Button from '_components/Button';
import BUSD from '_src/assets/images/order_BUSD.png';
import BTCB from '_src/assets/images/order_BTCB.png';
import USDT from '_src/assets/images/order_USDT.png';
import DAI from '_src/assets/images/order_DAI.png';
import BNB from '_src/assets/images/order_BNB.png';
import BigNumber from 'bignumber.js';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { Progress, notification, Divider, Space } from 'antd';
import Success from '_src/assets/images/Success.png';
import Error from '_src/assets/images/Error.png';
import icon3 from '_src/assets/images/icon (3).png';
import icon4 from '_src/assets/images/icon (4).png';
import Union from '_src/assets/images/union.png';

import './index.less';

export interface IAccessTab {
  className?: string;
  style?: React.CSSProperties;
  mode: string;
  props: any;
  stateinfo: any;
}
const imglist = {
  BUSD: BUSD,
  BTCB: BTCB,
  USDT: USDT,
  DAI: DAI,
  BNB: BNB,
};
const AccessTab: React.FC<IAccessTab> = ({ className, style, mode, props, stateinfo }) => {
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();

  const [hasNoClaim, sethasNoClaim] = useState(false);
  const [loadings, setloadings] = useState(false);
  const [stakeAmount, setstakeAmount] = useState('');
  const [stakeAmountborrow, setstakeAmountborrow] = useState('');
  const [BUSDprice, setBUSD] = useState('');
  const [BTCBprice, setBTCB] = useState('');
  const [DAIprice, setDAI] = useState('');
  const [BNBprice, setBNB] = useState('');
  const openNotificationlend = (placement) => {
    notification.config({
      closeIcon: <img src={Union} alt="" style={{ width: '10px', height: '10px', margin: '14px' }} />,
    });
    notification.open({
      style: { width: '340px', height: '90px', padding: '0' },

      message: (
        <div
          style={{
            border: '1px solid #2DE0E0',
            width: '340px',
            height: '90px',
            background: ' #fff',
            borderRadius: '4px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '21px',
          }}
        >
          <div
            className="messagetab"
            style={{
              display: 'flex',
            }}
          >
            <img src={Success} alt="" style={{ width: '22px', height: '22px', marginRight: '11px' }} />
            <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, margin: '0' }}>{placement}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: '0 9.4px 0 33px' }}>{'Claim SP-Token success'}</p>{' '}
            <img src={icon3} alt="" style={{ width: '11.2px', height: '11.2px' }} />
          </div>
        </div>
      ),
    });
  };
  const openNotificationborrow = (placement) => {
    notification.config({
      closeIcon: <img src={Union} alt="" style={{ width: '10px', height: '10px', margin: '14px' }} />,
    });
    notification.open({
      style: { width: '340px', height: '90px', padding: '0' },

      message: (
        <div
          style={{
            border: '1px solid #2DE0E0',
            width: '340px',
            height: '90px',
            background: ' #fff',
            borderRadius: '4px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '21px',
          }}
        >
          <div
            className="messagetab"
            style={{
              display: 'flex',
            }}
          >
            <img src={Success} alt="" style={{ width: '22px', height: '22px', marginRight: '11px' }} />
            <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, margin: '0' }}>{placement}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: '0 9.4px 0 33px' }}>{'Claim JP-Token success'}</p>{' '}
            <img src={icon3} alt="" style={{ width: '11.2px', height: '11.2px' }} />
          </div>
        </div>
      ),
    });
  };
  const openNotificationerrorlend = (placement) => {
    notification.config({
      closeIcon: <img src={Union} alt="" style={{ width: '10px', height: '10px', margin: '14px' }} />,
    });
    notification.open({
      style: { width: '340px', height: '90px', padding: '0' },

      message: (
        <div
          style={{
            border: '1px solid #ff3369',
            width: '340px',
            height: '90px',
            background: ' #fff',
            borderRadius: '4px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '21px',
          }}
        >
          <div
            className="messagetaberror"
            style={{
              display: 'flex',
            }}
          >
            <img src={Error} alt="" style={{ width: '22px', height: '22px', marginRight: '11px' }} />
            <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, margin: '0' }}>{placement}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: '0 9.4px 0 33px' }}>{'Claim SP-Token error'}</p>{' '}
            <img src={icon4} alt="" style={{ width: '11.2px', height: '11.2px' }} />
          </div>
        </div>
      ),
    });
  };
  const openNotificationerrorborrow = (placement) => {
    notification.config({
      closeIcon: <img src={Union} alt="" style={{ width: '10px', height: '10px', margin: '14px' }} />,
    });
    notification.open({
      style: { width: '340px', height: '90px', padding: '0' },
      message: (
        <div
          style={{
            border: '1px solid #ff3369',
            background: ' #fff',
            borderRadius: '4px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            width: '340px',
            padding: '21px',
            height: '90px',
          }}
        >
          <div
            className="messagetaberror"
            style={{
              display: 'flex',
            }}
          >
            <img src={Error} alt="" style={{ width: '22px', height: '22px', marginRight: '11px' }} />
            <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, margin: '0' }}>{placement}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: '0 9.4px 0 33px' }}>{'Claim JP-Token error'}</p>{' '}
            <img src={icon4} alt="" style={{ width: '11.2px', height: '11.2px' }} />
          </div>
        </div>
      ),
    });
  };
  const pricelist = {
    '0xDc6dF65b2fA0322394a8af628Ad25Be7D7F413c2': BUSDprice,
    '0xF592aa48875a5FDE73Ba64B527477849C73787ad': BTCBprice,
    '0xf2bDB4ba16b7862A1bf0BE03CD5eE25147d7F096': DAIprice,
    '0x0000000000000000000000000000000000000000': BNBprice,
  };
  const dealNumber_18 = (num) => {
    if (num) {
      let x = new BigNumber(num);
      let y = new BigNumber(1e18);
      return x.dividedBy(y).toFixed();
    }
  };
  const accessClaim = async () => {
    if (props.state == '1' || props.state == '2') {
      mode == 'Lend'
        ? await services.PoolServer.getclaimLend((Number(props.key) - 1).toString())
            .then(() => {
              openNotificationlend('Success');
              setloadings(false);
            })
            .catch(() => {
              openNotificationerrorlend('Error'), setloadings(false);
            })
        : await services.PoolServer.getclaimBorrow((Number(props.key) - 1).toString())
            .then(() => {
              openNotificationborrow('Success');
              setloadings(false);
            })
            .catch(() => {
              openNotificationerrorborrow('Error'), setloadings(false);
            });
    }
  };

  useEffect(() => {
    if (chainId !== undefined) {
      {
        mode == 'Lend'
          ? services.PoolServer.getuserLendInfo((Number(props.key) - 1).toString()).then((data) => {
              sethasNoClaim(data.hasNoClaim);
              setstakeAmount(data.stakeAmount);
            })
          : services.PoolServer.getuserBorrowInfo((Number(props.key) - 1).toString()).then((data) => {
              sethasNoClaim(data.hasNoClaim);
              setstakeAmountborrow(data.stakeAmount);
            });
      }
    }
  });
  const dealNumber_Price = (num) => {
    if (num) {
      let x = new BigNumber(num);
      let y = new BigNumber(1e8);
      return x.dividedBy(y).toString();
    }
  };
  useEffect(() => {
    services.BscPledgeOracleServer.getPrices([
      '0xDc6dF65b2fA0322394a8af628Ad25Be7D7F413c2',
      '0xF592aa48875a5FDE73Ba64B527477849C73787ad',
      '0xf2bDB4ba16b7862A1bf0BE03CD5eE25147d7F096',
      '0x0000000000000000000000000000000000000000',
    ]).then((res) => {
      setBUSD(dealNumber_Price(res[0]));
      setBTCB(dealNumber_Price(res[1]));
      setDAI(dealNumber_Price(res[2]));
      setBNB(dealNumber_Price(res[3]));
    });
  }, []);
  const claimAmount =
    Number(dealNumber_18(props.lendSupply)) !== 0
      ? Number(dealNumber_18(stateinfo.settleAmountLend)) *
        (Number(dealNumber_18(stakeAmount)) / Number(dealNumber_18(props.lendSupply)))
      : 0;
  const claimAmountborrow =
    Number(dealNumber_18(props.borrowSupply)) !== 0
      ? Math.floor(
          Number(dealNumber_18(stateinfo.settleAmountBorrow)) *
            (Number(dealNumber_18(stakeAmountborrow)) / Number(dealNumber_18(props.borrowSupply))) *
            1000000,
        ) / 1000000
      : 0;

  return (
    <div className={classnames('access_tab')} style={style}>
      <div className="access_title">
        <img src={imglist[props.poolname]} alt="" style={{ width: '40px' }} />
        <h2>{props.poolname}</h2>
      </div>

      {props.state == '0' ? (
        <div className="statemask">
          Waiting for the final matching {mode == 'Lend' ? 'deposit' : 'loan'} limit on the settlement date
        </div>
      ) : (
        <div>
          {mode == 'Lend' ? (
            <>
              <p className="access_token">{'SP-Token'}</p>

              {props.state == '4' ? (
                <p className="access_num">{0}</p>
              ) : (
                <p className="access_num">{hasNoClaim == false ? claimAmount : 0}</p>
              )}
            </>
          ) : (
            <>
              <div style={{ display: 'inline-block' }}>
                <p className="access_token">Loan amount</p>
                <p className="access_num">
                  {Math.floor(
                    ((Number(dealNumber_18(props.borrowSupply)) * Number(pricelist[props.Jp])) /
                      Number(pricelist[props.Sp]) /
                      props.collateralization_ratio) *
                      10000,
                  ) / 100}{' '}
                  {props.poolname}
                </p>
              </div>
              <div style={{ display: 'inline-block', float: 'right' }}>
                <p className="access_token">{'JP-Token'}</p>
                {props.state == '4' ? (
                  <p className="access_num">{0}</p>
                ) : (
                  <p className="access_num">
                    {hasNoClaim == false ? Math.floor(claimAmountborrow * pricelist[props.Jp] * 100) / 100 : 0}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}
      <p className="access_list">
        <span className="access_key">Underlying Asset</span>
        <span className="access_value">{props.underlying_asset}</span>
      </p>
      <p className="access_list">
        <span className="access_key">settlement Date</span>
        <span className="access_value">{props.settlement_date}</span>
      </p>
      <Button
        style={{ marginTop: '40px' }}
        loading={loadings}
        onClick={() => {
          setloadings(true), accessClaim();
        }}
        disabled={
          props.state == '0' || props.state == '4'
            ? true
            : claimAmount == 0
            ? true
            : claimAmountborrow == 0
            ? true
            : hasNoClaim == true
            ? true
            : false
        }
      >
        Claim
      </Button>
    </div>
  );
};

AccessTab.defaultProps = {
  className: '',
  style: null,
};

export default AccessTab;
