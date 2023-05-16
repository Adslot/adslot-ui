import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgIconApply = (props) => {
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
      <path d="M6.2 13c-.3 0-.6-.1-.8-.3L2.7 9.6c-.4-.4-.3-1 .1-1.4.4-.4 1-.3 1.4.1l1.9 2.2 5.6-7.1c.3-.4 1-.5 1.4-.2.4.3.5 1 .2 1.4l-6.3 8c-.2.3-.5.4-.8.4z" />
    </svg>
  );
};

SvgIconApply.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgIconApply.displayName = 'IconApply';
export default SvgIconApply;
