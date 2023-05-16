import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgStopwatch = (props) => {
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
      <path d="M12.2 4.6h.8s.1 0 .1-.1l.9-.9.1-.1v-.1l-1.1-1h-.1s-.1 0-.1.1l-.9.9-.1.1v.9C11 3.7 10 3.3 8.9 3.1V1.7h.6V0H6.3v1.7h.6v1.4c-3 .5-5.4 3.2-5.4 6.4C1.5 13.1 4.4 16 8 16s6.5-2.9 6.5-6.5c0-2-.9-3.7-2.3-4.9M8 15c-3 0-5.5-2.5-5.5-5.5S5 4 8 4s5.5 2.5 5.5 5.5S11 15 8 15m2.6-8.7L7.7 9.2c-.2.2-.2.4 0 .6s.4.2.6 0l2.9-2.9c.2-.2.2-.4 0-.6-.2-.1-.4-.1-.6 0" />
    </svg>
  );
};

SvgStopwatch.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgStopwatch.displayName = 'Stopwatch';
export default SvgStopwatch;
