import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPlaceholderInbox = (props) => {
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
      <path
        fill="#896AAD"
        d="M30 67.6c0 2.8 2.2 5 5 5h30l15 15V72.5h5c2.8 0 5-2.2 5-5v-40c0-2.8-2.2-5-5-5H34.9c-2.8 0-5 2.2-5 5v40.1z"
      />
      <path
        fill="#E2DBED"
        d="M70 57.5c0 2.8-2.2 5-5 5H34.9L20 77.5v-15h-5c-2.8 0-5-2.2-5-5v-40c0-2.8 2.2-5 5-5h50.1c2.8 0 5 2.2 5 5v40z"
      />
      <circle fill="#896AAD" cx={26.9} cy={37.5} r={5} />
      <circle fill="#896AAD" cx={41.8} cy={37.5} r={5} />
      <circle fill="#896AAD" cx={56.9} cy={37.5} r={5} />
    </svg>
  );
};

SvgPlaceholderInbox.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPlaceholderInbox.displayName = 'PlaceholderInbox';
export default SvgPlaceholderInbox;
