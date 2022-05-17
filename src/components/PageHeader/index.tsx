import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Row } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import SettingsModal from '_components/PageHeader/SettingsModal';

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

const StyledPageHeader = styled.div`
  padding: 20px 20px 0 20px;
`;
const Details = styled.div`
  flex: 1;
`;

const Heading = styled.div`
  color: #262533;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
`;
const Description = styled.div`
  font-size: 14px;
`;
const ChindredNode = styled.div`
  margin-bottom: 16px;
`;

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <StyledPageHeader>
      <Row>
        <Details>
          <Heading>{title}</Heading>
          {description && <Description>{description}</Description>}
        </Details>
        <SettingOutlined
          onClick={() => {
            setIsModalVisible(!isModalVisible);
          }}
        />
      </Row>
      {children && <ChindredNode>{children}</ChindredNode>}
      <SettingsModal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(() => false);
        }}
        title={'Transaction Settings'}
      />
    </StyledPageHeader>
  );
};

export default PageHeader;
