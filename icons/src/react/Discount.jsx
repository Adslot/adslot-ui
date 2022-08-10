import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDiscount = (props) => {
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
      <path fill="#666" d="M9.9 9.3c-.2 0-.4.2-.4.5s.2.5.4.5.4-.2.4-.5-.2-.5-.4-.5z" />
      <path
        fill="#666"
        d="M12.1 1H9.4c-.1 0-.2.1-.3.2-.1.6-.5 1-1.1 1-.6 0-1-.4-1.1-.9-.1-.2-.2-.3-.3-.3H3.9c-.6 0-1.1.5-1.1 1.2v11.7c0 .6.5 1.2 1.2 1.2h2.7c.1 0 .3-.1.3-.2 0-.7.4-1.1 1-1.1s1 .4 1.1.9c0 .1.1.2.3.2h2.7c.6 0 1.2-.5 1.2-1.2V2.2c-.1-.7-.6-1.2-1.2-1.2zm-7 5.2c0-.6.5-1.2 1-1.2.6 0 1 .5 1 1.2s-.5 1.2-1 1.2-1-.6-1-1.2zm1.3 4.6c-.1.1-.2.2-.3.2-.1 0-.1 0-.2-.1s-.2-.3-.1-.4l3.8-5.2c.1-.1.3-.2.4-.1.1.1.2.3.1.4l-3.7 5.2zm3.5.2c-.6 0-1-.5-1-1.2 0-.6.5-1.2 1-1.2.6 0 1 .5 1 1.2 0 .6-.5 1.2-1 1.2z"
      />
      <path fill="#666" d="M6.5 6.2c0-.3-.2-.5-.4-.5s-.4.2-.4.5.2.5.4.5.4-.2.4-.5z" />
    </svg>
  );
};

SvgDiscount.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDiscount.displayName = 'Discount';
export default SvgDiscount;
