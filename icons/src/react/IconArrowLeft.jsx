import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgIconArrowLeft = (props) => {
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
      <path
        d="M1.3 8.7 6 13.4c.4.4.8.4 1.2 0 .4-.4.4-1 0-1.4L4 8.8h10.2c.4.1.8-.3.8-.8s-.4-.9-.8-.9H4.1l3.3-3.3c.4-.4.4-.8 0-1.2-.2-.2-.4-.4-.7-.4s-.6.2-.7.4L1.2 7.4c-.3.3-.3.9.1 1.3z"
        fill="#006dcc"
      />
      <path fill="none" d="M0 0h16v16H0z" />
      <path fill="none" d="M1 1h14v14H1z" />
    </svg>
  );
};

SvgIconArrowLeft.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgIconArrowLeft.displayName = 'IconArrowLeft';
export default SvgIconArrowLeft;
