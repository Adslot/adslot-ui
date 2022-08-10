import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMobileInverse = (props) => {
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
      <path d="M0 0h16v16H0z" fill="none" />
      <path d="M1 1h14v14H1z" fill="none" />
      <path
        d="M8 12.5c-.4 0-.8.4-.8.8s.4.8.8.8.8-.4.8-.8-.4-.8-.8-.8zm0 1c-.1 0-.2-.1-.2-.2s.1-.2.2-.2.2.1.2.2-.1.2-.2.2z"
        fill="#fff"
      />
      <path
        d="M12.1 3.1c0-.1 0-.1 0 0v-.6c0-.8-.7-1.5-1.5-1.5H5.4c-.8 0-1.5.7-1.5 1.5v11.1c0 .8.7 1.5 1.5 1.5h5.2c.8 0 1.5-.7 1.5-1.5V3.1zm-.6 8.4h-7V3.3h7v8.2zM5.4 1.6h5.2c.5 0 .9.4.9.9v.3h-7v-.3c0-.5.4-.9.9-.9zm5.2 12.8H5.4c-.5 0-.9-.4-.9-.9v-1.4h7v1.4c0 .5-.4.9-.9.9z"
        fill="#fff"
      />
    </svg>
  );
};

SvgMobileInverse.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMobileInverse.displayName = 'MobileInverse';
export default SvgMobileInverse;
