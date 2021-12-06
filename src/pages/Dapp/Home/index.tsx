import React, { useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Tabs, Table, Progress, Popover } from 'antd';

import { DappLayout } from '_src/Layout';
import { Link } from 'react-router-dom';
import PageUrl from '_constants/pageURL';

import img1 from '_src/assets/images/4023 1.png';
import img2 from '_src/assets/images/4023 2.png';
import img3 from '_src/assets/images/4023 3.png';
import img4 from '_src/assets/images/4023 4.png';
import img5 from '_src/assets/images/4023 5.png';
import Lender1 from '_src/assets/images/Group 1843.png';
import Borrower from '_src/assets/images/Group 1842.png';
import Close from '_assets/images/Close Square.png';

import './index.less';
import Button from '_components/Button';
import { number } from 'echarts';

function HomePage() {
  const history = useHistory();
  const { TabPane } = Tabs;
  const [pool, setpool] = useState('BUSD');
  const [coin, setcoin] = useState('');
  const [visible, setvisible] = useState(false);
  const [show, setshow] = useState('0');

  const callback = (key) => {
    history.push(key);
    setpool(key);
  };
  const handleVisibleChange = (visable, num) => {
    console.log(1111111111, visable, num);
    if (visable) {
      setshow(num);
      setvisible(visable);
    }
  };
  //每三位加一个小数点
  function toThousands(num) {
    var num = (num || 0).toString(),
      result = '';
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return result;
  }

  useEffect(() => {
    callback('BUSD');
  }, []);
  const columns = [
    {
      title: 'Underlying Asset',
      dataIndex: 'underlying_asset',
      render: (val, record) => {
        console.log(record);
        return (
          <div className="underlyingAsset">
            <img src={record.logo} alt="" />
            <p>{val}</p>
          </div>
        );
      },
    },

    {
      title: 'Fixed Rate',
      dataIndex: 'fixed_rate',
      sorter: {
        compare: (a, b) => a.fixed_rate - b.fixed_rate,
        multiple: 3,
      },
      render: (val, record) => {
        return <div>{`${val}%`}</div>;
      },
    },
    {
      title: 'Available To Lend',
      dataIndex: 'available_to_lend',
      render: (val, record) => {
        var totalFinancing = (val[1] / 500000000) * 100;
        return (
          <div className="totalFinancing">
            <Progress percent={totalFinancing} showInfo={false} strokeColor="#5D52FF" success={{ percent: 30 }} />
            <p style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <span style={{ color: '#FFA011', fontSize: '12px' }}>{`${toThousands(val[0])}`}</span>/
                <span style={{ color: '#5D52FF', fontSize: '12px' }}>{`${toThousands(val[1])}`}</span>
              </span>
              <span style={{ width: '10px' }}></span>
              <span style={{ fontSize: '12px' }}>{toThousands(500000000)}</span>
            </p>
          </div>
        );
      },
      sorter: {
        compare: (a, b) => a.total_financing - b.total_financing,
        multiple: 2,
      },
    },
    {
      title: 'Settlement Date',
      dataIndex: 'settlement_date',
      sorter: {
        compare: (a, b) => a.settlement_date - b.settlement_date,
        multiple: 1,
      },
    },
    {
      title: 'Length',
      dataIndex: 'length',
      sorter: {
        compare: (a, b) => a.length - b.length,
        multiple: 5,
      },
    },
    {
      title: 'Margin Ratio',
      dataIndex: 'margin_ratio',
      sorter: {
        compare: (a, b) => a.margin_ratio - b.margin_ratio,
        multiple: 6,
      },
    },
    {
      title: 'Collateralization Ratio',
      dataIndex: 'collateralization_ratio',
      render: (val, record) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {val}
            <Popover
              content={content}
              title="Choose a Role"
              trigger="click"
              visible={show === record.key && visible}
              onVisibleChange={(e) => handleVisibleChange(e, record.key)}
            >
              <Button
                style={{ width: '107px', height: '40px', borderRadius: '15px', lineHeight: '40px', color: '#FFF' }}
                onClick={() => {
                  setcoin(record.underlying_asset);
                  setshow(record.key);
                }}
              >
                Detail
              </Button>
            </Popover>
          </div>
        );
      },
      sorter: {
        compare: (a, b) => a.collateralization_ratio - b.collateralization_ratio,
        multiple: 7,
      },
    },
  ];
  const columns1 = [
    {
      title: 'Underlying Asset',
      dataIndex: 'underlying_asset',
      render: (val, record) => {
        console.log(record);
        return (
          <Popover content={content} title="Choose a Role" trigger="click">
            <div className="underlyingAsset" onClick={() => Changecoin(val)}>
              <img src={record.logo} alt="" />
              <p>{val}</p>
            </div>
          </Popover>
        );
      },
    },

    {
      title: 'Fixed Rate',
      dataIndex: 'fixed_rate',
      sorter: {
        compare: (a, b) => a.fixed_rate - b.fixed_rate,
        multiple: 3,
      },
      render: (val, record) => {
        return <div>{`${val}%`}</div>;
      },
    },

    {
      title: 'Settlement Date',
      dataIndex: 'settlement_date',
      sorter: {
        compare: (a, b) => a.settlement_date - b.settlement_date,
        multiple: 1,
      },
    },
  ];
  const data = [
    {
      key: '1',
      underlying_asset: 'BTCB',
      fixed_rate: `${5} `,
      available_to_lend: [230000000, 388000000],
      settlement_date: '2021/11/01 12:00',
      length: `${1} year`,
      margin_ratio: `${150}%`,
      collateralization_ratio: `${200}%`,
      logo: img1,
    },
    {
      key: '2',
      underlying_asset: 'ETH',
      fixed_rate: `${5} `,
      available_to_lend: [230000000, 388000000],
      settlement_date: '2021/11/01 12:00',
      length: `${1} year`,
      margin_ratio: `${150}%`,
      collateralization_ratio: `${200}%`,
      logo: img2,
    },
    {
      key: '3',
      underlying_asset: 'BNB',
      fixed_rate: `${5} `,
      available_to_lend: [230000000, 388000000],
      settlement_date: '2021/11/01 12:00',
      length: `${1} year`,
      margin_ratio: `${150}%`,
      collateralization_ratio: `${200}%`,
      logo: img3,
    },
    {
      key: '4',
      underlying_asset: 'BTCB',
      fixed_rate: `${5} `,
      available_to_lend: [230000000, 388000000],
      settlement_date: '2021/11/01 12:00',
      length: `${1} year`,
      margin_ratio: `${150}%`,
      collateralization_ratio: `${200}%`,
      logo: img4,
    },
    {
      key: '5',
      underlying_asset: 'BNB',
      fixed_rate: `${5} `,
      available_to_lend: [230000000, 388000000],
      settlement_date: '2021/11/01 12:00',
      length: `${1} year`,
      margin_ratio: `${150}%`,
      collateralization_ratio: `${200}%`,
      logo: img5,
    },
  ];
  const data1 = [
    {
      key: '1',
      underlying_asset: 'BTCB',
      fixed_rate: `${5} `,

      settlement_date: '2021/11/01 12:00',

      logo: img1,
    },
    {
      key: '2',
      underlying_asset: 'ETH',
      fixed_rate: `${5} `,

      settlement_date: '2021/11/01 12:00',

      logo: img2,
    },
    {
      key: '3',
      underlying_asset: 'BNB',
      fixed_rate: `${5} `,
      settlement_date: '2021/11/01 12:00',
      logo: img3,
    },
    {
      key: '4',
      underlying_asset: 'BTCB',
      fixed_rate: `${5} `,
      settlement_date: '2021/11/01 12:00',
      logo: img4,
    },
    {
      key: '5',
      underlying_asset: 'BNB',
      fixed_rate: `${5} `,
      settlement_date: '2021/11/01 12:00',
      logo: img5,
    },
  ];
  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
  const Changecoin = (val) => {
    setcoin(val);
  };
  const content = (
    <div className="choose">
      <div className="choose_lender">
        <img src={Lender1} alt="" />
        <Link to={PageUrl.Market_Pool.replace(':pool/:coin/:mode', `${pool}/${coin}/Lender`)} style={{ color: '#FFF' }}>
          <span>Lender</span> <span> Lock in a fixed interest rate today. Fixed rates guarantee your APY.</span>
        </Link>
      </div>
      <div className="choose_borrow">
        <img src={Borrower} alt="" />
        <Link
          to={PageUrl.Market_Pool.replace(':pool/:coin/:mode', `${pool}/${coin}/Borrower`)}
          style={{ color: '#FFF' }}
        >
          <span>Borrower</span> <span>Borrow with certainty. Fixed rates lock in what you pay.</span>
        </Link>
      </div>
      <img
        src={Close}
        alt=""
        className="close"
        onClick={() => {
          setvisible(false);
          setshow('0');
        }}
      />
    </div>
  );
  // ant-popover ant-popover-placement-top  ant-popover-hidden
  return (
    <div className="dapp_home_page">
      <DappLayout title="Market Pool" className="trust_code">
        <Tabs defaultActiveKey="1" onChange={callback} className="all_tab">
          <TabPane tab="BUSD" key="BUSD">
            <Table
              columns={columns}
              dataSource={data}
              onChange={onChange}
              rowClassName={(record, index) => {
                return record;
              }}
            />
          </TabPane>
          <TabPane tab="USDT" key="USDT">
            <Table
              columns={columns}
              dataSource={data}
              onChange={onChange}
              rowClassName={(record, index) => {
                return record;
              }}
            />
          </TabPane>
          <TabPane tab="DAI" key="DAI">
            <Table
              columns={columns}
              dataSource={data}
              onChange={onChange}
              rowClassName={(record, index) => {
                return record;
              }}
            />
          </TabPane>
        </Tabs>
        <Tabs defaultActiveKey="1" onChange={callback} className="media_tab">
          <TabPane tab="BUSD" key="BUSD">
            <Table
              columns={columns1}
              dataSource={data1}
              onChange={onChange}
              rowClassName={(record, index) => {
                return record;
              }}
            />
          </TabPane>
          <TabPane tab="USDT" key="USDT">
            <Table
              columns={columns1}
              dataSource={data1}
              onChange={onChange}
              rowClassName={(record, index) => {
                return record;
              }}
            />
          </TabPane>
          <TabPane tab="DAI" key="DAI">
            <Table
              columns={columns1}
              dataSource={data1}
              onChange={onChange}
              rowClassName={(record, index) => {
                return record;
              }}
            />
          </TabPane>
        </Tabs>
      </DappLayout>
    </div>
  );
}
export default HomePage;
