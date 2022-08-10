import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductPositionTakeover = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path fill={color} stroke="#FFF" strokeWidth={0.023} strokeMiterlimit={10} d="M6.9 26.7H93v60.1H6.9z" />
      <path d="M96.5 6.3h-93C1.6 6.3 0 7.9 0 9.8v80.4c0 1.9 1.6 3.5 3.5 3.5h93.1c1.9 0 3.5-1.6 3.5-3.5V9.8c-.1-1.9-1.7-3.5-3.6-3.5zm-3.4 80.5H6.9V26.7H93v60.1z" />
      <path
        fill="none"
        stroke="#E7E7E7"
        strokeMiterlimit={10}
        d="M65.3 32H34.7c-1.1 0-2.1.9-2.1 2.1v45.4c0 1.1.9 2.1 2.1 2.1h30.6c1.1 0 2.1-.9 2.1-2.1V34c0-1.1-1-2-2.1-2zm17.2 0H75c-1.1 0-2.1.9-2.1 2.1v45.4c0 1.1.9 2.1 2.1 2.1h7.5c1.1 0 2.1-.9 2.1-2.1V34c0-1.1-1-2-2.1-2zM25 32h-7.5c-1.1 0-2.1.9-2.1 2.1v45.4c0 1.1.9 2.1 2.1 2.1H25c1.1 0 2.1-.9 2.1-2.1V34c0-1.1-.9-2-2.1-2z"
      />
    </svg>
  );
};

SvgProductPositionTakeover.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductPositionTakeover.displayName = 'ProductPositionTakeover';
export default SvgProductPositionTakeover;
