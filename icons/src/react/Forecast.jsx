import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgForecast = (props) => {
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
      <path d="m15.2 9.8-2.1-2.9c-.1-.1-.2-.1-.3-.1s-.2 0-.3.1l-2.1 2.9c-.1.1-.1.2 0 .3.1.1.2.2.3.2h1.2c-.3.4-.6.8-1 1.2-.9.8-2.1 1.1-3.3 1-1.2-.1-2.2-.6-3-1.5-.3-.3-.7-.3-1-.1-.3.3-.3.7-.1 1 1 1.2 2.4 1.9 4 2H8c1.4 0 2.8-.5 3.8-1.4.7-.6 1.3-1.4 1.7-2.3h1.4c.1 0 .2-.1.3-.2.1 0 .1-.1 0-.2zM3.4 9.1l2.1-2.9c.1-.1.1-.2 0-.3 0-.1-.1-.2-.2-.2H4.1C5 4.2 6.6 3.4 8.4 3.5c1.2.1 2.2.6 3 1.5.3.3.7.3 1 .1.3-.3.3-.7.1-1-1-1.2-2.5-1.9-4-2-2.6-.2-5.1 1.3-6 3.7H1.1c-.1 0-.2.1-.3.2-.1.1 0 .2 0 .3l2.1 2.9c.1 0 .2.1.3.1.1 0 .2-.1.2-.2z" />
    </svg>
  );
};

SvgForecast.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgForecast.displayName = 'Forecast';
export default SvgForecast;
