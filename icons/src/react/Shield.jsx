import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgShield = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40.2 40.2"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M26.8 16.9c-.3-.3-.8-.3-1.1 0l-7.8 8-3.3-3.4c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1l3.9 4c.1.1.3.2.6.2s.4-.1.6-.2L27 18c.1-.3.1-.8-.2-1.1z" />
      <path d="M31.5 10.3s-.7.2-1.7.2c-2.3 0-5.6-.8-8.4-4.9-.6-.8-2-.8-2.6 0-3.2 4.6-7.2 4.9-8.4 4.9-.8 0-1.3-.1-1.7-.2-1-.3-2.1.5-2.1 1.5v8.7c0 12.5 12.5 16.2 13 16.3.1 0 .3.1.4.1s.3 0 .4-.1c.5-.1 13-3.8 13-16.3v-8.7c.1-.9-.9-1.7-1.9-1.5zm.7 10.3c0 11.5-11.5 14.9-12 15H20c-.5-.1-12-3.6-12-15v-8.7c0-.2.1-.2.3-.2.6.2 1.3.3 2.1.3 1.3 0 6-.4 9.5-5.5.1-.1.3-.1.4 0 3.1 4.5 6.9 5.5 9.5 5.5 1.3 0 2.1-.2 2.2-.2.1 0 .2.1.2.2v8.6z" />
    </svg>
  );
};

SvgShield.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgShield.displayName = 'Shield';
export default SvgShield;
