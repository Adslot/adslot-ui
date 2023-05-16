import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCalendar = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 23"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M14.7 9.2c-.3-.2-.7-.2-.9.1l-5.4 7.1-2-2.4c-.2-.3-.6-.3-.9-.1-.3.2-.3.6-.1.9l2.5 3c.1.1.3.2.5.2s.4-.1.5-.2l5.9-7.7c.3-.2.2-.6-.1-.9z" />
      <path d="M17.1 1.9h-1.7v1.5c0 .6-.5 1-1 1-.6 0-1-.5-1-1V1.9H6.9v1.5c0 .6-.5 1-1 1s-1-.5-1-1V1.9H3.2c-1.1 0-2 .9-2 2v16.4c0 1.1.9 2 2 2h13.9c1.1 0 2-.9 2-2V4c0-1.2-.9-2.1-2-2.1zm.7 18.4c0 .4-.3.7-.7.7H3.2c-.4 0-.7-.3-.7-.7V7h15.4v13.3z" />
      <path d="M5.9 3.8c.2 0 .4-.2.4-.4V1c0-.2-.2-.4-.4-.4-.3.1-.4.2-.4.4v2.4c0 .3.1.4.4.4zM14.4 3.8c.2 0 .4-.2.4-.4V1c0-.2-.2-.4-.4-.4-.2.1-.4.2-.4.4v2.4c0 .3.2.4.4.4z" />
    </svg>
  );
};

SvgCalendar.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCalendar.displayName = 'Calendar';
export default SvgCalendar;
