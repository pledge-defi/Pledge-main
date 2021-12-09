import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import Button from '_components/Button';
import OrderImg from '_components/OrderImg';

import './index.less';

export interface IRefund {
  className?: string;
  mode: string;
  style?: React.CSSProperties;
}

const Refund: React.FC<IRefund> = ({ className, style, mode }) => {
  const LendTitle = [
    'Pool / Underlying Asset',
    'Total Lend Amount',
    'Total Borrow Amount',
    'Quantity Deposit',
    'Refund Deposit',
    'Extract The Refund',
  ];
  const BorrowTitle = [
    'Pool / Underlying Asset',
    'Total Lend Amount',
    'Total Borrow Amount',
    'Quantity Borrow',
    'Refund Borrow',
    'Extract The Refund',
  ];
  const Lendinfo = [
    {
      Asset: 'BUSD-BTCB',
      TotalLendAmount: '2,000 BUSD',
      TotalBorrowAmount: '1,000 BUSD',
      QuantityDeposit: '1,000 BUSD',
      RefundDeposit: '200 BUSD',
      logo1: 'BUSD',
      logo2: 'BTCB',
    },
    {
      Asset: 'BUSD-BTCB',
      TotalLendAmount: '2,000 BUSD',
      TotalBorrowAmount: '1,000 BUSD',
      QuantityDeposit: '1,000 BUSD',
      RefundDeposit: '200 BUSD',
      logo1: 'BUSD',
      logo2: 'USDT',
    },
    {
      Asset: 'BUSD-BTCB',
      TotalLendAmount: '2,000 BUSD',
      TotalBorrowAmount: '1,000 BUSD',
      QuantityDeposit: '1,000 BUSD',
      RefundDeposit: '200 BUSD',
      logo1: 'BUSD',
      logo2: 'BTCB',
    },
    {
      Asset: 'BUSD-BTCB',
      TotalLendAmount: '2,000 BUSD',
      TotalBorrowAmount: '1,000 BUSD',
      QuantityDeposit: '1,000 BUSD',
      RefundDeposit: '200 BUSD',
      logo1: 'BUSD',
      logo2: 'USDT',
    },
  ];
  const Borrowinfo = [
    {
      Asset: 'BUSD-BTCB',
      TotalLendAmount: '2,000 BUSD',
      TotalBorrowAmount: '1,000 BUSD',
      QuantityBorrow: '1,000 BUSD',
      RefundBorrow: '200 BUSD',
      logo1: 'BUSD',
      logo2: 'BTCB',
    },
    {
      Asset: 'BUSD-BTCB',
      TotalLendAmount: '2,000 BUSD',
      TotalBorrowAmount: '1,000 BUSD',
      QuantityBorrow: '1,000 BUSD',
      RefundBorrow: '200 BUSD',
      logo1: 'BUSD',
      logo2: 'USDT',
    },
    {
      Asset: 'BUSD-BTCB',
      TotalLendAmount: '2,000 BUSD',
      TotalBorrowAmount: '1,000 BUSD',
      QuantityBorrow: '1,000 BUSD',
      RefundBorrow: '200 BUSD',
      logo1: 'BUSD',
      logo2: 'BTCB',
    },
    {
      Asset: 'BUSD-BTCB',
      TotalLendAmount: '2,000 BUSD',
      TotalBorrowAmount: '1,000 BUSD',
      QuantityBorrow: '1,000 BUSD',
      RefundBorrow: '200 BUSD',
      logo1: 'BUSD',
      logo2: 'USDT',
    },
  ];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '64px' }}>
        <h3>{mode == 'Lend' ? 'Refund Deposit' : 'Refund Borrow'}</h3>
        <Tooltip placement="top" title={mode == 'Lend' ? 'Refund Deposit' : 'Refund Borrow'}>
          <QuestionCircleOutlined style={{ color: '#0A0B11' }} />
        </Tooltip>
      </div>
      <p className="prtfolioList_title">
        {mode == 'Lend'
          ? LendTitle.map((item, index) => {
              return (
                <span className="all_tab" key={index}>
                  {item}
                </span>
              );
            })
          : BorrowTitle.map((item, index) => {
              return (
                <span className="all_tab" key={index}>
                  {item}
                </span>
              );
            })}
      </p>
      <p>
        {mode == 'Lend'
          ? Lendinfo.map((item, index) => {
              return (
                <li className="claim_list" key={index}>
                  <p style={{ justifyContent: 'start' }}>
                    <OrderImg img1={item.logo1} img2={item.logo2} />
                    {item.Asset}
                  </p>
                  <p>
                    <span className="claim_list_title">Total Lend Amount</span> <span>{item.TotalLendAmount}</span>
                  </p>
                  <p>
                    <span className="claim_list_title">Total Borrow Amount</span> <span>{item.TotalBorrowAmount}</span>
                  </p>
                  <p>
                    <span className="claim_list_title">Quantity Deposit</span>
                    <span>{item.QuantityDeposit}</span>
                  </p>
                  <p>
                    <span className="claim_list_title">Refund Deposit</span> <span>{item.RefundDeposit}</span>
                  </p>
                  <Button>Claim</Button>
                </li>
              );
            })
          : Borrowinfo.map((item, index) => {
              return (
                <li className="claim_list" key={index}>
                  <p style={{ justifyContent: 'start' }}>
                    <OrderImg img1={item.logo1} img2={item.logo2} />
                    {item.Asset}
                  </p>
                  <p>
                    <span className="claim_list_title">Total Lend Amount</span> <span>{item.TotalLendAmount}</span>
                  </p>
                  <p>
                    <span className="claim_list_title">Total Borrow Amount</span> <span>{item.TotalBorrowAmount}</span>
                  </p>
                  <p>
                    <span className="claim_list_title">Quantity Borrow</span>
                    <span>{item.QuantityBorrow}</span>
                  </p>
                  <p>
                    <span className="claim_list_title">Refund Borrow</span> <span>{item.RefundBorrow}</span>
                  </p>
                  <Button>Claim</Button>
                </li>
              );
            })}
      </p>
    </div>
  );
};

Refund.defaultProps = {
  className: '',
  style: null,
};

export default Refund;
