import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPlusSign = (props) => {
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
        d="M14.5 7H9V1.5c0-.6-.4-1-1-1s-1 .5-1 1V7H1.5c-.6 0-1 .5-1 1 0 .3.1.5.3.7.2.2.4.3.7.3H7v5.5c0 .6.4 1 1 1 .3 0 .5-.1.7-.3.2-.2.3-.4.3-.7V9h5.5c.3 0 .5-.1.7-.3.2-.2.3-.4.3-.7 0-.6-.4-1-1-1z"
        fill="#006DCC"
      />
    </svg>
  );
};

SvgPlusSign.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPlusSign.displayName = 'PlusSign';
export default SvgPlusSign;
