import React from 'react';
import classnames from 'classnames';

import './index.less';

export interface IButtonProps {
  rightAngleDirection?: 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom' | 'null';
  type?: 'paramy' | 'default';
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({
  children,
  disabled,
  className,
  rightAngleDirection,
  style,
  type,
  onClick,
  ...props
}) => {
  function handleOnClick() {
    if (!disabled) {
      onClick();
    }
  }
  return (
    <div
      className={classnames(
        'components_button',
        className,
        { [`rad_${rightAngleDirection}`]: rightAngleDirection },
        { [`type_${type}`]: type },
        { btn_disabled: disabled },
      )}
      style={style}
      onClick={handleOnClick}
      {...props}
    >
      {children}
    </div>
  );
};

Button.defaultProps = {
  rightAngleDirection: 'null',
  className: '',
  type: 'paramy',
  style: null,
  disabled: false,
  onClick: () => {},
};

export default Button;
