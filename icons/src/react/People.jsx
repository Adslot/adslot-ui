import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPeople = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      xmlSpace="preserve"
      enableBackground="new 0 0 16 16"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        d="M14.6 11.8c-3.8-1.5-4.4-2.1-4.5-2.3v-.4c.4-.5.8-1.1 1-1.8.3-.2.5-.6.5-.9.1-.4 0-.8-.2-1.1V3.8c0-2-1.2-3.1-3.3-3.1C6 .7 4.8 1.9 4.8 3.8v1.4c-.3.4-.4.7-.3 1.1 0 .4.2.7.5 1 .2.7.5 1.3 1 1.8v.4c-.1.2-.8.8-4.5 2.3-.3.1-.6.5-.6.9v1.7c0 .5.4.9.9.9h12.6c.5 0 .9-.4.9-.9v-1.7c-.1-.4-.4-.8-.7-.9zm-.3 2.6c0 .1 0 .1 0 0l-12.6.1s-.1 0-.1-.1v-1.8c4.2-1.6 4.9-2.3 5-2.9V8.9c0-.1 0-.2-.1-.3-.4-.4-.7-1-.9-1.7 0-.1-.1-.2-.2-.2 0-.1-.1-.3-.1-.5s0-.4.2-.6c.1-.1.1-.2.1-.3V3.8c0-1.5.9-2.3 2.5-2.3s2.5.8 2.5 2.3v1.6c0 .1 0 .2.1.3.1.2.2.4.2.6 0 .2-.1.4-.3.5l-.2.2c-.2.7-.5 1.3-.9 1.7-.2 0-.3.1-.3.2V9.7c.2.5.9 1.2 5.1 2.9v1.8z"
        fill="#5a5a5a"
      />
      <path d="M0 0h16v16H0z" fill="none" />
    </svg>
  );
};

SvgPeople.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPeople.displayName = 'People';
export default SvgPeople;
