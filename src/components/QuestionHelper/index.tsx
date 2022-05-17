import React, { useCallback, useState } from 'react';
import { HelpCircle as Question } from 'react-feather';
import styled from 'styled-components';
import { Tooltip } from 'antd';

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  background-color: #fff;
  color: rgb(79, 78, 102);

  :hover,
  :focus {
    opacity: 0.7;
  }
`;

export default function QuestionHelper({ title }: { title: string }) {
  return (
    <span style={{ marginLeft: 4 }}>
      <Tooltip title={title}>
        <QuestionWrapper>
          <Question size={16} />
        </QuestionWrapper>
      </Tooltip>
    </span>
  );
}
