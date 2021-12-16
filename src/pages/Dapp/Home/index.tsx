import React, { useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Tabs, Table, Progress, Popover, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

import moment from 'moment';
import { FORMAT_TIME_STANDARD } from '_src/utils/constants';
import { DappLayout } from '_src/Layout';
import { Link } from 'react-router-dom';
import PageUrl from '_constants/pageURL';
import Web3 from 'web3';
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
import services from '_src/services';
import { errors } from 'ethers';
import BigNumber from 'bignumber.js';
import { poll } from 'ethers/lib/utils';

function HomePage() {
  const history = useHistory();
  const { connector, library, chainId, account } = useWeb3React();
  console.log(connector, library, chainId, account);

  const { TabPane } = Tabs;
  const [pool, setpool] = useState('BUSD');
  const [coin, setcoin] = useState('');
  const [visible, setvisible] = useState(false);
  const [show, setshow] = useState('100');
  const [data, setdata] = useState([]);
  const [datastate, setdatastate] = useState([]);
  const poolAsset = {
    '0xDc6dF65b2fA0322394a8af628Ad25Be7D7F413c2': 'BUSD',
    '0xF592aa48875a5FDE73Ba64B527477849C73787ad': 'BTCB',
    '0xf2bDB4ba16b7862A1bf0BE03CD5eE25147d7F096': 'DAI',
    '0x0000000000000000000000000000000000000000': 'BNB',
  };

  const getPoolInfo = async () => {
    const datainfo = await services.PoolServer.getPoolBaseData();
    const datainfo1 = await services.PoolServer.getPoolDataInfo();

    console.log(datainfo);
    const res = datainfo.map((item, index) => {
      let maxSupply = (item.maxSupply / 1000000000000000000).toFixed(0);
      let borrowSupply = (item.borrowSupply / 1000000000000000000).toFixed(0);
      let lendSupply = (item.lendSupply / 1000000000000000000).toFixed(0);
      console.log(maxSupply);

      const times = moment.unix(item.settleTime).format(FORMAT_TIME_STANDARD);

      var difftime = item.endTime - item.settleTime;

      var days = parseInt(difftime / 86400 + '');
      console.log('state', item.state);
      return {
        key: index + 1,
        state: item.state,
        underlying_asset: poolAsset[item.borrowToken],
        fixed_rate: item.interestRate / 1000000,
        maxSupply: maxSupply,
        available_to_lend: [borrowSupply, lendSupply],
        settlement_date: times,
        length: `${days} day`,
        margin_ratio: `${item.autoLiquidateThreshold / 1000000}%`,
        collateralization_ratio: `${item.martgageRate / 1000000}%`,
        poolname: poolAsset[item.lendToken],
        logo: img1,
      };
    });
    console.log(res);
    setdata(res);
    setdatastate(res);
    console.log(data);
  };
  useEffect(() => {
    callback('BUSD');
    getPoolInfo();
  }, []);

  const callback = (key) => {
    history.push(key);
    setpool(key);
  };
  const handleVisibleChange = (visable, num) => {
    if (visable) {
      setshow(num);
      setvisible(visable);
    }
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <p
          className="menutab"
          onClick={() => {
            const livelist = data.filter((item) => {
              console.log(item);
              return item.state < 3;
            });
            setdatastate(data);
            setdatastate(livelist);
            console.log(livelist);
          }}
        >
          live
        </p>
      </Menu.Item>

      <Menu.Item>
        <p
          className="menutab"
          onClick={() => {
            const livelist = data.filter((item) => {
              console.log(item);
              return item.state >= 3;
            });
            setdatastate(data);
            setdatastate(livelist);
            console.log(livelist);
          }}
        >
          Finished
        </p>
      </Menu.Item>
    </Menu>
  );
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

  const columns = [
    {
      title: 'Underlying Asset',
      dataIndex: 'underlying_asset',
      render: (val, record) => {
        // console.log(record);
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
        var totalFinancing = (val[1] / record.maxSupply) * 100;
        return (
          <div className="totalFinancing">
            <Progress
              percent={totalFinancing}
              showInfo={false}
              strokeColor="#5D52FF"
              success={{ percent: val[0] / record.maxSupply }}
            />
            <p style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <span style={{ color: '#FFA011', fontSize: '12px' }}>{`${toThousands(val[0])}`}</span>/
                <span style={{ color: '#5D52FF', fontSize: '12px' }}>{`${toThousands(val[1])}`}</span>
              </span>
              <span style={{ width: '10px' }}></span>
              <span style={{ fontSize: '12px' }}>{toThousands(record.maxSupply)}</span>
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
        // console.log(record);
        return (
          <Popover
            content={content}
            title="Choose a Role"
            trigger="click"
            visible={show === record.key && visible}
            onVisibleChange={(e) => handleVisibleChange(e, record.key)}
          >
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
          setshow('100');
        }}
      />
    </div>
  );
  return (
    <div className="dapp_home_page">
      <DappLayout title="Market Pool" className="trust_code">
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Live
            <DownOutlined />
          </a>
        </Dropdown>
        <Tabs defaultActiveKey="1" onChange={callback} className="all_tab">
          <TabPane tab="BUSD" key="BUSD">
            <Table
              columns={columns}
              dataSource={datastate}
              onChange={onChange}
              rowClassName={(record, index) => {
                return record;
              }}
            />
          </TabPane>
          <TabPane tab="USDT" key="USDT">
            <Table
              columns={columns}
              dataSource={datastate}
              onChange={onChange}
              rowClassName={(record, index) => {
                return record;
              }}
            />
          </TabPane>
          <TabPane tab="DAI" key="DAI">
            <Table
              columns={columns}
              dataSource={datastate}
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
