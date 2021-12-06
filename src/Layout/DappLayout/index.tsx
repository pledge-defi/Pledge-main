import React from 'react';
import classnames from 'classnames';

import './index.less';

export interface IDappLayout {
  title?: string;
  info?: JSX.Element | string | number;
  className?: string;
  style?: React.CSSProperties;
}

const DappLayout: React.FC<IDappLayout> = ({ title, info, children, className, ...props }) => {
  return (
    <section className={classnames('dapp-layout', className)} {...props}>
      <h2 className="landingbox_title">{title}</h2>
      <div className="landingbox_info">{info}</div>
      {children}
    </section>
  );
};

DappLayout.defaultProps = {
  title: '',
  info: null,
  className: '',
  style: null,
};

export default DappLayout;
