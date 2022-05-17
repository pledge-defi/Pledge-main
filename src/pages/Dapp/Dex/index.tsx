import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { Tabs, InputNumber, Popover, Space, Tooltip, Select, Cascader, Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { DappLayout } from '_src/Layout';
import pageURL from '_constants/pageURL';
import Coin_pool from '_components/Coin_pool';
import Button from '_components/Button';
import styled, { css } from 'styled-components';
import './index.less';
import { color } from 'echarts';
import PageHeader from '_components/PageHeader';
const { Option } = Select;
type Iparams = {
  mode: 'Swap' | 'Liquidity';
};
const InputCurrency = styled.div`
  display: flex;
  width: 154px;
  justify-content: space-between;
`;
const CurrencySelect = styled(Select)`
  background: #f5f5fa;
  border-radius: 10px;
  overflow: hidden;
`;
const CurrencyRow = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  justify-content: space-between;
`;
const Blance = styled.div`
  text-align: right;
  color: #8b89a3;
  line-height: 22px;
  font-size: 14px;
`;
const ContentTitle = styled.div`
  line-height: 20px;
  font-weight: 600;
  color: #262533;
`;
const ContentTab = styled.div`
  color: #4f4e66;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const SlippageWrap = styled.div`
  background: #ffffff;
  padding: 0 10px;
  border: 1px solid #bcc0cc;
  border-radius: 14px;
  display: flex;
  align-items: center;
  & :hover {
    color: #fff;
    background: #5d52ff;
  }
  input {
    text-align: right;
    height: 24px;
    padding: 0;
    & :hover {
      color: #fff;
    }
  }
`;
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
      <ContentTitle>Transaction Settings</ContentTitle>
      <ContentTab>
        Slippage tolerance{' '}
        <Tooltip title="Slippage tolerance">
          <QuestionCircleOutlined style={{ color: '#0A0B11' }} />
        </Tooltip>
      </ContentTab>
      <Row>
        <SlippageWrap
          className={`${slippagevalue == 0.1 ? 'onchange' : ''}`}
          onClick={() => {
            setslippagevalue(0.1);
          }}
        >
          0.1%
        </SlippageWrap>
        <SlippageWrap
          className={`${slippagevalue == 0.5 ? 'onchange' : ''}`}
          onClick={() => {
            setslippagevalue(0.5);
          }}
        >
          0.5%
        </SlippageWrap>
        <SlippageWrap
          className={`${slippagevalue == 1 ? 'onchange' : ''}`}
          onClick={() => {
            setslippagevalue(1);
          }}
        >
          1%
        </SlippageWrap>
        <SlippageWrap>
          <InputNumber
            style={{ width: '60px' }}
            value={slippagevalue}
            onChange={handleOnChange}
            bordered={false}
            type="number"
          />
          %
        </SlippageWrap>
      </Row>
      <p className="content_tab">
        Slippage tolerance{' '}
        <Tooltip title="Slippage tolerance">
          <QuestionCircleOutlined style={{ color: '#0A0B11' }} />
        </Tooltip>
      </p>
      <div className="slippage_time">
        <InputNumber
          style={{
            background: '#FFFFFF',
            border: '1px solid #EAEDF5',
            borderRadius: '14px',
          }}
          value={slippagetime}
          onChange={handleOnChange2}
          bordered={false}
          type="number"
        />
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
  function onMax() {
    console.log('max');
  }
  const selectAfter = (
    <InputCurrency>
      <Button
        onClick={onMax}
        style={{
          background: 'rgba(93, 82, 255, 0.1)',
          border: ' 1px solid rgba(93, 82, 255, 0.5)',
          borderRadius: '8px',
          color: '#5D52FF',
          width: '44px',
          height: '24px',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '22px',
          padding: '0',
        }}
      >
        max
      </Button>
      <CurrencySelect defaultValue="USD" style={{ width: 108 }} className={'swap-currency-select'}>
        <Option value="USD">$BTC</Option>
        <Option value="EUR">€BTC</Option>
        <Option value="GBP">£BTC</Option>
        <Option value="CNY">¥BTC</Option>
      </CurrencySelect>
    </InputCurrency>
  );

  return (
    <DappLayout title={`${mode} Dex`} className="dapp_Dex">
      <Tabs defaultActiveKey="Swap" activeKey={mode} onChange={callback}>
        <TabPane tab="Swap" key="Swap">
          <div className="swap_tab">
            {/* <p className="swap_title">
              <span>Swap</span>
              <SettingOutlined
                onClick={() => {
                  setIsModalVisible(true);
                }}
              />
              <Modal
                width={303}
                bodyStyle={{
                  background: '#f5f5fa',
                  borderRadius: '16px',
                  boxShadow: '0 0 20px rgba(168, 168, 197, 0.14)',
                }}
                footer={null}
                closable={false}
                className={'seting_modal'}
                visible={isModalVisible}
                onCancel={() => {
                  setIsModalVisible(false);
                }}
              >
                {content}
              </Modal>
            </p> */}
            <PageHeader title={'Swap'} />

            <div className="swap_input" style={{ width: '100%', marginBottom: '44px' }}>
              <CurrencyRow>
                <span>From</span>
                <Blance>Blance：123.06</Blance>
              </CurrencyRow>
              <InputNumber
                type="number"
                // value={}
                name="input1"
                // onChange={}
                bordered={false}
                style={{ width: '100%' }}
                placeholder="0.0"
                addonAfter={selectAfter}
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
