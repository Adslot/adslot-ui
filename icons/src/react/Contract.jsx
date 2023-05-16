import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgContract = (props) => {
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
      <path d="M28.2 31c-.4 0-.7.3-.7.7V33c0 .2-.2.4-.4.4H6.9c-.2 0-.4-.2-.4-.4V4.9c0-.2.2-.4.4-.4h15.4v4.6c0 .4.3.7.7.7h4.6v4.5c0 .4.3.7.7.7.4 0 .7-.3.7-.7V9.1c0-.5-.3-.9-.5-1.1L24 3.7c-.2-.2-.5-.5-1.1-.5h-16c-.9 0-1.7.8-1.7 1.7V33c0 .9.8 1.7 1.7 1.7h20.2c.9 0 1.7-.8 1.7-1.7v-1.3c0-.4-.2-.7-.6-.7zM26.9 8.5h-3.3V5.2l3.3 3.3z" />
      <path d="M21 25.5H10.5c-.4 0-.7.3-.7.7 0 .4.3.7.7.7H21c.4 0 .7-.3.7-.7s-.3-.7-.7-.7zM21 21.6H10.5c-.4 0-.7.3-.7.7 0 .4.3.7.7.7H21c.4 0 .7-.3.7-.7s-.3-.7-.7-.7zM21 17.7H10.5c-.4 0-.7.3-.7.7 0 .4.3.7.7.7H21c.4 0 .7-.3.7-.7s-.3-.7-.7-.7zM10.5 15h7.3c.4 0 .7-.3.7-.7s-.3-.7-.7-.7h-7.3c-.4 0-.7.3-.7.7 0 .4.3.7.7.7zM34.7 18.4c-2.5-2.5-6.6-2.5-9.1 0s-2.5 6.6 0 9.1c1.3 1.3 2.9 1.9 4.6 1.9s3.3-.6 4.6-1.9c1.2-1.2 1.9-2.8 1.9-4.6-.1-1.7-.8-3.3-2-4.5zm-.9 8.2c-2 2-5.3 2-7.3 0s-2-5.3 0-7.3c1-1 2.3-1.5 3.6-1.5 1.3 0 2.6.5 3.6 1.5s1.5 2.3 1.5 3.6c.1 1.4-.5 2.7-1.4 3.7z" />
      <path d="m32.5 21.4-3.4 2.9-1-.9c-.3-.2-.7-.2-.9 0-.2.3-.2.7 0 .9l1.4 1.3c.1.1.3.2.4.2.2 0 .3-.1.4-.2l3.8-3.3c.3-.2.3-.7.1-.9-.1-.2-.5-.2-.8 0z" />
    </svg>
  );
};

SvgContract.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgContract.displayName = 'Contract';
export default SvgContract;
