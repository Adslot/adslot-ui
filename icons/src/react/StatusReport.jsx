import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgStatusReport = (props) => {
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
      <path d="M15.5 11.3h9c1.1 0 1.8-.5 2.2-.9.5-.5.7-1.2.7-2 0-1.4-1-2.9-2.9-2.9h-1.1v-.2c0-1.5-1.3-2.8-2.9-2.8h-1.1c-1.6 0-2.9 1.3-2.9 2.8v.2h-1.1c-1.9 0-2.9 1.4-2.9 2.9.1 1.5 1.1 2.9 3 2.9zm0-4.3h1.9c.4 0 .7-.3.7-.7v-1c0-.7.6-1.3 1.4-1.3h1.1c.8 0 1.4.6 1.4 1.3v1c0 .4.4.7.8.7h1.8c1 0 1.4.8 1.4 1.4 0 .4-.1.7-.4 1s-.6.4-1.1.4h-9c-.5 0-.8-.1-1.1-.4-.2-.2-.3-.6-.3-1 0-.5.3-1.4 1.4-1.4z" />
      <path d="M32.6 6.9h-3c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h2.2v27.9H8.3V8.4h2.2c.4 0 .7-.3.7-.7s-.3-.7-.7-.7H7.6c-.4 0-.7.3-.7.7V37c0 .4.3.7.7.7h25c.4 0 .7-.3.7-.7V7.6c0-.4-.3-.7-.7-.7z" />
      <path d="m26.4 17.4-9.1 11-3.1-3.4c-.3-.3-.7-.3-1 0s-.3.7 0 1l3.7 4.1c.1.2.3.2.5.2s.4-.1.5-.3l9.6-11.7c.3-.3.2-.8-.1-1-.3-.2-.7-.2-1 .1zM20.1 6.5c.2 0 .4-.1.5-.2s.2-.3.2-.5-.1-.4-.2-.5c-.3-.3-.8-.3-1 0-.1.1-.2.3-.2.5s.1.4.2.5.3.2.5.2z" />
    </svg>
  );
};

SvgStatusReport.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgStatusReport.displayName = 'StatusReport';
export default SvgStatusReport;
