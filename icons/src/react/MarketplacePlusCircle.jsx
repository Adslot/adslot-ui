import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMarketplacePlusCircle = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <circle fill="#C1E9DF" cx={25} cy={25} r={12.92} />
      <path fill="#DEF4EE" d="M12.08 25A12.92 12.92 0 0 0 25 37.92V12.08A12.92 12.92 0 0 0 12.08 25Z" />
      <path
        fill="#74CEB7"
        d="M25 16.86a.83.83 0 0 0-.83.83v6.49h-6.49a.83.83 0 1 0 0 1.65h6.49v6.49a.83.83 0 1 0 1.65 0v-6.49h6.49a.83.83 0 1 0 0-1.65h-6.48v-6.5a.83.83 0 0 0-.83-.82Z"
      />
      <path
        fill="#74CEB7"
        d="M25 10a15 15 0 1 0 15 15 15 15 0 0 0-15-15Zm0 27.69A12.69 12.69 0 1 1 37.69 25 12.7 12.7 0 0 1 25 37.69Z"
      />
    </svg>
  );
};

SvgMarketplacePlusCircle.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMarketplacePlusCircle.displayName = 'MarketplacePlusCircle';
export default SvgMarketplacePlusCircle;
