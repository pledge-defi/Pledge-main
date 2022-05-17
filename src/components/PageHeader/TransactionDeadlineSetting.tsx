import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex, Text, Box } from '_components/lib';
import QuestionHelper from '../QuestionHelper';
import { Input } from 'antd';
import { useRecoilState } from 'recoil';
import { userDeadline } from '_src/model/global';

const Field = styled.div`
  align-items: center;
  display: inline-flex;
`;

const DeadlineInput = styled(Input)`
  max-width: 100px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(234, 237, 245);
  box-sizing: border-box;
  border-radius: 14px;
  width: 90px;
  height: 28px;
  font-size: 14px;
`;

type TransactionDeadlineSettingModalProps = {};

const TransactionDeadlineSetting = ({}: TransactionDeadlineSettingModalProps) => {
  const [deadline, setDeadline] = useRecoilState(userDeadline);

  const [value, setValue] = useState(deadline / 60); // deadline in minutes
  const [error, setError] = useState<string | null>(null);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target;
    setValue(parseInt(inputValue, 10));
  };

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      const rawValue = value * 60;
      if (!Number.isNaN(rawValue) && rawValue > 0) {
        setDeadline(rawValue);
        setError(null);
      } else {
        setError('Enter a valid deadline');
      }
    } catch {
      setError('Enter a valid deadline');
    }
  }, [value, setError, setDeadline]);

  return (
    <Box marginBottom={16}>
      <Flex marginBottom={8}>
        <Text bold>{'Transaction deadline'}</Text>
        <QuestionHelper title={'Your transaction will revert if it is pending for more than this long.'} />
      </Flex>
      <Field>
        <DeadlineInput type="number" step="1" min="1" value={value} onChange={handleChange} />
        <Text fontSize={14} marginLeft={8}>
          Minutes
        </Text>
      </Field>
      {error && (
        <Text marginBottom={8} color="red">
          {error}
        </Text>
      )}
    </Box>
  );
};

export default TransactionDeadlineSetting;
