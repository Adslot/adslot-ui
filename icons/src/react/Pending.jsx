import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPending = (props) => {
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
      <path d="M5.2 6.5C2.7 6.5.5 8 .5 10c0 .7.2 1.3.6 1.9.7.9-.1 2.6-.1 2.6l2.4-1c.5.2 1.1.3 1.6.3 2.6.1 4.7-1.5 4.7-3.5.1-2.1-1.9-3.7-4.5-3.8zm9.6 1.9c.4-.6.7-1.2.6-1.9 0-2-2.2-3.6-4.7-3.5-2.1 0-3.8 1.2-4.3 2.8C7.4 6 8.3 6.4 9 7c1.1.9 1.6 2 1.6 3.3h.3c.6 0 1.1-.1 1.6-.3l2.4 1s-.8-1.6-.1-2.6z" />
    </svg>
  );
};

SvgPending.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPending.displayName = 'Pending';
export default SvgPending;
