import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductPositionInterstitial = (props) => {
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
        fill={color}
        stroke="#FFF"
        strokeWidth={0.023}
        strokeMiterlimit={10}
        d="M16.8 77.4h67c1.1 0 2-.9 2-2V39.8c0-1.1-.9-2-2-2h-67c-1.1 0-2 .9-2 2v35.6c0 1.1.9 2 2 2z"
      />
      <path
        fill="#FFF"
        d="m81.3 41.8-1.1 1.1-1.1-1.1-.7.7 1.1 1.1-1.1 1.1.7.7 1.1-1.1 1.1 1.1.7-.7-1.1-1.1 1.1-1.1-.7-.7z"
      />
    </svg>
  );
};

SvgProductPositionInterstitial.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductPositionInterstitial.displayName = 'ProductPositionInterstitial';
export default SvgProductPositionInterstitial;
