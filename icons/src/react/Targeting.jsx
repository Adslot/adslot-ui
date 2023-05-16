import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTargeting = (props) => {
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
        d="m9.7 11.9-.3.6c1.6.2 2.5.7 2.5 1.1 0 .5-1.5 1.1-3.9 1.1s-3.9-.7-3.9-1.2c0-.4 1.3-1 3.4-1.1l.5 1 3.4-6.8c.3-.6.5-1.2.5-1.9C11.9 2.6 10.2.8 8 .8 5.9.8 4.1 2.5 4.1 4.7c0 .7.2 1.4.5 1.9l2.6 5.2c-2 .1-3.7.7-3.7 1.7 0 1.2 2.3 1.8 4.5 1.8s4.5-.6 4.5-1.8c0-.8-1.3-1.4-2.8-1.6zM6.4 4.2c0-.9.7-1.6 1.6-1.6.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6z"
        fill="#6d6e71"
      />
    </svg>
  );
};

SvgTargeting.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTargeting.displayName = 'Targeting';
export default SvgTargeting;
