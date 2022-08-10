import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDiscovery = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <g fill="#5a5a5a">
        <path d="M8.1.7C4 .7.7 4 .7 8c0 4.1 3.3 7.4 7.4 7.4 4.1 0 7.4-3.3 7.4-7.4C15.4 4 12.1.7 8.1.7zm0 14.1a6.7 6.7 0 1 1 6.7-6.7c0 3.6-3 6.7-6.7 6.7z" />
        <path d="M9 8.5c.4-.5.6-1 .6-1.6 0-1.5-1.2-2.7-2.7-2.7-1.5 0-2.7 1.2-2.7 2.7 0 1.5 1.2 2.7 2.7 2.7.6 0 1.2-.2 1.6-.6l2.6 2.6c.1.1.1.1.2.1s.2 0 .2-.1c.1-.1.1-.3 0-.4L9 8.5zM4.9 6.8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.8-2-2z" />
      </g>
    </svg>
  );
};

SvgDiscovery.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDiscovery.displayName = 'Discovery';
export default SvgDiscovery;
