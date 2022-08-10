import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMonthlyCalendar = (props) => {
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
      <path d="M29.8 19.2H16.4c-.2-.6-.9-1.1-1.6-1.1-.9 0-1.7.8-1.7 1.7 0 .9.8 1.7 1.7 1.7.7 0 1.3-.5 1.6-1.1h13.4c.3 0 .6-.3.6-.6 0-.4-.3-.6-.6-.6zm-15 1.1c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5c0 .2-.2.5-.5.5zM19.6 21.7c-.7 0-1.3.5-1.6 1.1H9.5c-.3 0-.6.3-.6.6s.3.6.6.6H18c.2.6.9 1.1 1.6 1.1.9 0 1.7-.8 1.7-1.7 0-1-.7-1.7-1.7-1.7zm0 2.2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5c0 .2-.2.5-.5.5z" />
      <path d="M30.6 6H8.7C6.8 6 5.2 7.6 5.2 9.5v21.9c0 1.9 1.6 3.5 3.5 3.5h21.9c1.9 0 3.5-1.6 3.5-3.5V9.5c0-1.9-1.6-3.5-3.5-3.5zM8.7 7.2h21.9c1.2 0 2.3 1 2.3 2.3v1.3H6.4V9.5c0-1.3 1-2.3 2.3-2.3zm21.9 26.4H8.7c-1.2 0-2.3-1-2.3-2.3V12h26.4v19.4c.1 1.2-1 2.2-2.2 2.2z" />
      <path d="M14.2 9.6c.3 0 .6-.3.6-.6s-.3-.6-.6-.6-.6.3-.6.6.3.6.6.6zM25.1 9.6c.3 0 .6-.3.6-.6s-.3-.6-.6-.6-.6.3-.6.6.2.6.6.6zM10.7 26.4H9.5c-.3 0-.6.3-.6.6s.3.6.6.6h1.1c.3 0 .6-.3.6-.6.1-.4-.2-.6-.5-.6zM15.4 26.4h-1.1c-.3 0-.6.3-.6.6s.3.6.6.6h1.1c.3 0 .6-.3.6-.6 0-.4-.3-.6-.6-.6zM10.7 30H9.5c-.3 0-.6.3-.6.6s.3.6.6.6h1.1c.3 0 .6-.3.6-.6.1-.4-.2-.6-.5-.6zM15.4 30h-1.1c-.3 0-.6.3-.6.6s.3.6.6.6h1.1c.3 0 .6-.3.6-.6 0-.4-.3-.6-.6-.6zM20.2 30h-1.1c-.3 0-.6.3-.6.6s.3.6.6.6h1.1c.3 0 .6-.3.6-.6 0-.4-.3-.6-.6-.6zM20.2 26.4h-1.1c-.3 0-.6.3-.6.6s.3.6.6.6h1.1c.3 0 .6-.3.6-.6 0-.4-.3-.6-.6-.6zM25 26.4h-1.1c-.3 0-.6.3-.6.6s.3.6.6.6H25c.3 0 .6-.3.6-.6 0-.4-.3-.6-.6-.6zM29.8 26.4h-1.1c-.3 0-.6.3-.6.6s.3.6.6.6h1.1c.3 0 .6-.3.6-.6 0-.4-.3-.6-.6-.6zM25 22.8h-1.1c-.3 0-.6.3-.6.6s.3.6.6.6H25c.3 0 .6-.3.6-.6 0-.4-.3-.6-.6-.6zM29.8 22.8h-1.1c-.3 0-.6.3-.6.6s.3.6.6.6h1.1c.3 0 .6-.3.6-.6 0-.4-.3-.6-.6-.6zM9.5 20.4h1.1c.3 0 .6-.3.6-.6s-.3-.6-.6-.6H9.5c-.3 0-.6.3-.6.6s.3.6.6.6zM9.5 16.8h1.1c.3 0 .6-.3.6-.6s-.3-.6-.6-.6H9.5c-.3 0-.6.3-.6.6s.3.6.6.6zM14.3 16.8h1.1c.3 0 .6-.3.6-.6s-.3-.6-.6-.6h-1.1c-.3 0-.6.3-.6.6s.2.6.6.6zM19.1 16.8h1.1c.3 0 .6-.3.6-.6s-.3-.6-.6-.6h-1.1c-.3 0-.6.3-.6.6s.2.6.6.6zM23.9 16.8H25c.3 0 .6-.3.6-.6s-.3-.6-.6-.6h-1.1c-.3 0-.6.3-.6.6s.3.6.6.6zM29.8 15.6h-1.1c-.3 0-.6.3-.6.6s.3.6.6.6h1.1c.3 0 .6-.3.6-.6 0-.4-.3-.6-.6-.6z" />
    </svg>
  );
};

SvgMonthlyCalendar.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMonthlyCalendar.displayName = 'MonthlyCalendar';
export default SvgMonthlyCalendar;
