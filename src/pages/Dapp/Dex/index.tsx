import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { Tabs, InputNumber, Popover, Space, Tooltip, Select, Cascader } from 'antd';
import { SettingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { DappLayout } from '_src/Layout';
import pageURL from '_constants/pageURL';
import Coin_pool from '_components/Coin_pool';
import Button from '_components/Button';
import './index.less';
import { color } from 'echarts';
const { Option } = Select;
type Iparams = {
  mode: 'Swap' | 'Liquidity';
};
function Dex() {
  const history = useHistory();
  const { url: routeUrl, params } = useRouteMatch<Iparams>();
  const { mode } = params;
  const { TabPane } = Tabs;
  const [slippagevalue, setslippagevalue] = useState(0.5);
  const [slippagetime, setslippagetime] = useState(20);

  function callback(key) {
    history.replace(pageURL.DEX.replace(':mode', `${key}`));
  }
  function handleOnChange(value) {
    setslippagevalue(value);
  }
  function handleOnChange2(value) {
    setslippagetime(value);
  }
  const content = (
    <div>
      <p className="content_title">Transaction Settings</p>
      <p className="content_tab">
        Slippage tolerance{' '}
        <Tooltip title="Slippage tolerance">
          <QuestionCircleOutlined style={{ color: '#0A0B11' }} />
        </Tooltip>
      </p>
      <p className="slippage_value">
        <span
          className={`${slippagevalue == 0.1 ? 'onchange' : ''}`}
          onClick={() => {
            setslippagevalue(0.1);
          }}
        >
          0.1%
        </span>
        <span
          className={`${slippagevalue == 0.5 ? 'onchange' : ''}`}
          onClick={() => {
            setslippagevalue(0.5);
          }}
        >
          0.5%
        </span>
        <span
          className={`${slippagevalue == 1 ? 'onchange' : ''}`}
          onClick={() => {
            setslippagevalue(1);
          }}
        >
          1%
        </span>
        <div>
          <InputNumber value={slippagevalue} onChange={handleOnChange} type="number" />%
        </div>
      </p>
      <p className="content_tab">
        Slippage tolerance{' '}
        <Tooltip title="Slippage tolerance">
          <QuestionCircleOutlined style={{ color: '#0A0B11' }} />
        </Tooltip>
      </p>
      <div className="slippage_time">
        <InputNumber value={slippagetime} onChange={handleOnChange2} type="number" />
        minutes
      </div>
    </div>
  );
  const selectBefore = (
    <Select defaultValue="add" style={{ width: 60 }}>
      <Option value="add">+</Option>
      <Option value="minus">-</Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue="USD" style={{ width: 60 }}>
      <Option value="USD">$</Option>
      <Option value="EUR">€</Option>
      <Option value="GBP">£</Option>
      <Option value="CNY">¥</Option>
    </Select>
  );

  return (
    <DappLayout title={`${mode} Dex`} className="dapp_Dex">
      <Tabs defaultActiveKey="Swap" activeKey={mode} onChange={callback}>
        <TabPane tab="Swap" key="Swap">
          <div className="swap_tab">
            <p className="swap_title">
              <span>Swap</span>
              <Popover trigger="click" placement="right" content={content}>
                <SettingOutlined />
              </Popover>
            </p>
            <div className="swap_input" style={{ width: '100%', marginBottom: '44px' }}>
              <p>From</p>
              <InputNumber
                type="number"
                // value={}
                name="input1"
                // onChange={}
                bordered={false}
                style={{ width: '100%' }}
                placeholder="0.0"
              />
            </div>
            <div className="swap_input" style={{ width: '100%', marginBottom: '30px' }}>
              <p>To</p>
              <InputNumber
                type="number"
                // value={}
                name="input2"
                // onChange={}
                bordered={false}
                style={{ width: '100%' }}
                placeholder="0.0"
              />
            </div>

            <Button>Connect Wallet</Button>
          </div>
        </TabPane>
        <TabPane tab="Liquidity" key="Liquidity">
          <div className="liquidity_tab">
            <div className="liquidity_title">
              <p> Your liquidity</p>
              <p>
                <span>Create a pair</span>
                <span>Add liquidity</span>
              </p>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </DappLayout>
  );
}

export default Dex;
