import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgEmailEstimate = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#a4dacd"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M1 11.9V4.1c0-.5.4-.9.9-.9h12.2c.5 0 .9.4.9.9v7.8c0 .5-.4.9-.9.9H1.9c-.5 0-.9-.4-.9-.9zm13.2-7.8c0-.1 0-.1-.1-.1H1.9c-.1 0-.1 0-.1.1v7.8c0 .1 0 .1.1.1h12.2c.1 0 .1-.1.1-.1V4.1z" />
      <path d="M7.9 9.5c-.1 0-.2 0-.3-.1L2.5 5.3c-.2-.2-.2-.4-.1-.6.2-.2.4-.2.6-.1l4.9 3.9 5-3.9c.2-.1.4-.1.6.1.1.2.1.4-.1.6L8.2 9.4c-.1.1-.2.1-.3.1z" />
    </svg>
  );
};

SvgEmailEstimate.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgEmailEstimate.displayName = 'EmailEstimate';
export default SvgEmailEstimate;
