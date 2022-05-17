import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import QuestionHelper from '../QuestionHelper';
import { Col, Row, Button, Input } from 'antd';
import { Flex, Text } from '_components/lib';
import { useRecoilState } from 'recoil';
import { userSlippageTolerance } from '_src/model/global';

const MAX_SLIPPAGE = 5000;
const RISKY_SLIPPAGE_LOW = 50;
const RISKY_SLIPPAGE_HIGH = 500;

const Option = styled.div`
  padding: 0 4px;
`;

const Options = styled.div`
  align-items: center;
  display: flex;

  ${Option}:first-child {
    padding-left: 0;
  }

  ${Option}:last-child {
    padding-right: 0;
  }
`;
const SlippageButton = styled(Button)`
  background: #ffffff;
  border: 1px solid #bcc0cc;
  font-weight: 700;
  box-sizing: border-box;
  border-radius: 14px;
  width: 49px;
  height: 28px;
  text-align: center;
  padding: 0;
  color: rgb(17, 23, 41);
`;

const SlippageInput = styled(Input)`
  background: rgb(255, 255, 255);
  border: 1px solid rgb(234, 237, 245);
  box-sizing: border-box;
  border-radius: 14px;
  width: 90px;
  height: 28px;
  font-size: 14px;
`;
const predefinedValues = [
  { label: '0.1%', value: 0.1 },
  { label: '0.5%', value: 0.5 },
  { label: '1%', value: 1 },
];

type SlippageToleranceSettingsModalProps = {
  // translateString: (translationId: number, fallback: string) => string
};

const SlippageToleranceSettings = ({}: SlippageToleranceSettingsModalProps) => {
  const [slippageTolerance, setSlippageTolerance] = useRecoilState(userSlippageTolerance);
  const [value, setValue] = useState(slippageTolerance / 100);
  const [error, setError] = useState<string | null>('');
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target;
    setValue(parseFloat(inputValue));
  };

  useEffect(() => {
    try {
      const rawValue = value * 100;
      if (!Number.isNaN(rawValue) && rawValue > 0 && rawValue < MAX_SLIPPAGE) {
        console.log(rawValue);
        setSlippageTolerance(rawValue);
        setError(null);
      } else {
        setError('Enter a valid slippage percentage');
      }
    } catch {
      setError('Enter a valid slippage percentage');
    }
  }, [value, setError, setSlippageTolerance]);

  useEffect(() => {
    if (slippageTolerance < RISKY_SLIPPAGE_LOW) {
      setError('Your transaction may fail');
    } else if (slippageTolerance > RISKY_SLIPPAGE_HIGH) {
      setError('Your transaction may be frontrun');
    }
  }, [slippageTolerance, setError]);

  return (
    <Row style={{ marginBottom: '16px' }}>
      <Flex style={{ marginBottom: '8px' }}>
        <Text>{'Slippage tolerance'}</Text>
        <QuestionHelper
          title={'Your transaction will revert if the price changes unfavorably by more than this percentage.'}
        />
      </Flex>
      <Options>
        <Flex style={{ marginRight: '5px' }}>
          {predefinedValues.map(({ label, value: predefinedValue }) => {
            const handleClick = () => setValue(predefinedValue);
            return (
              <Option key={predefinedValue}>
                <SlippageButton type={'primary'} className={'tertiary'} onClick={handleClick}>
                  {label}
                </SlippageButton>
              </Option>
            );
          })}
        </Flex>
        <Flex>
          <Option>
            <SlippageInput
              type="number"
              status={error ? 'error' : ''}
              step={0.1}
              min={0.1}
              placeholder="5%"
              value={value}
              onChange={handleChange}
            />
          </Option>
          <Option>
            <Text fontSize={14}>%</Text>
          </Option>
        </Flex>
      </Options>
      {error && (
        <Text marginTop={8} color="rgb(237, 75, 158)">
          {error}
        </Text>
      )}
    </Row>
  );
};

export default SlippageToleranceSettings;
