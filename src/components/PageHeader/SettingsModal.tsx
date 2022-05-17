import React, { useState } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import SlippageToleranceSetting from './SlippageToleranceSetting';
import TransactionDeadlineSetting from './TransactionDeadlineSetting';

const Settingtab = styled.div`
  border-radius: 16px;
  background: #f5f5fa;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #262533;
  padding: 16px 16px 0px;
`;
const ModalWrap = styled.div`
  padding: 16px;
`;

type ModalProps = React.ComponentProps<typeof Modal>;
interface SettingsModalProps extends Omit<ModalProps, 'title'> {
  title?: string;
}

const SettingsModal = ({ title, ...props }: SettingsModalProps) => {
  return (
    <Settingtab className="Settingtab">
      <Modal
        width={320}
        bodyStyle={{
          background: '#f5f5fa',
          borderRadius: '16px',
          boxShadow: '0 0 20px rgba(168, 168, 197, 0.14)',
          padding: '0',
        }}
        footer={null}
        closable={false}
        className={'seting_modal'}
        {...props}
      >
        <Title>{title}</Title>
        <ModalWrap>
          <SlippageToleranceSetting />
          <TransactionDeadlineSetting />
        </ModalWrap>
      </Modal>
    </Settingtab>
  );
};

export default SettingsModal;
