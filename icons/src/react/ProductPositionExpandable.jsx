import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductPositionExpandable = (props) => {
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
      <path d="M96.5 6.3h-93C1.6 6.3 0 7.9 0 9.8v80.4c0 1.9 1.6 3.5 3.5 3.5h93.1c1.9 0 3.5-1.6 3.5-3.5V9.8c-.1-1.9-1.7-3.5-3.6-3.5zm-3.4 80.5H6.9V26.7H93v60.1z" />
      <path
        fill="none"
        stroke="#E7E7E7"
        strokeMiterlimit={10}
        d="M65.3 32H34.7c-1.1 0-2.1.9-2.1 2.1v45.4c0 1.1.9 2.1 2.1 2.1h30.6c1.1 0 2.1-.9 2.1-2.1V34c0-1.1-1-2-2.1-2zm17.2 0H75c-1.1 0-2.1.9-2.1 2.1v45.4c0 1.1.9 2.1 2.1 2.1h7.5c1.1 0 2.1-.9 2.1-2.1V34c0-1.1-1-2-2.1-2zM25 59.2h-7.5c-1.1 0-2.1.8-2.1 1.7v18.8c0 1 .9 1.7 2.1 1.7H25c1.1 0 2.1-.8 2.1-1.7V60.9c0-.9-.9-1.7-2.1-1.7z"
      />
      <path
        fill={color}
        stroke={color}
        strokeMiterlimit={10}
        d="M25 32h-7.5c-1.1 0-2.1.9-2.1 2.1V53c0 1.1.9 2.1 2.1 2.1H25c1.1 0 2.1-.9 2.1-2.1V34c0-1.1-.9-2-2.1-2z"
      />
      <path
        fill="none"
        stroke={color}
        strokeWidth={0.45}
        strokeMiterlimit={5}
        strokeDasharray="1.0137,1.0137,1.0137,1.0137,1.0137,1.0137"
        d="M82.9 32H17.1c-.9 0-1.6.7-1.6 1.6v35.5c0 .9.7 1.6 1.6 1.6H83c.9 0 1.6-.7 1.6-1.6V33.6c0-.9-.8-1.6-1.7-1.6z"
      />
      <path
        opacity={0.3}
        fill={color}
        d="M82.9 32H17.1c-.9 0-1.6.7-1.6 1.6v35.5c0 .9.7 1.6 1.6 1.6H83c.9 0 1.6-.7 1.6-1.6V33.6c0-.9-.8-1.6-1.7-1.6z"
      />
      <path
        opacity={0.3}
        fill={color}
        d="m80.9 34.7-1.1 1.1-1.1-1.1-.7.7 1.1 1.1-1.1 1.1.7.7 1.1-1.1 1.1 1.1.7-.7-1.1-1.1 1.1-1.1-.7-.7z"
      />
    </svg>
  );
};

SvgProductPositionExpandable.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductPositionExpandable.displayName = 'ProductPositionExpandable';
export default SvgProductPositionExpandable;
