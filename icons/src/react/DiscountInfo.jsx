import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDiscountInfo = (props) => {
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
        fill="#666"
        d="M7.2 6.4c0-.6-.4-1.1-1-1.1-.5 0-1 .5-1 1.1s.4 1.1 1 1.1c.5 0 1-.5 1-1.1zm-1.4 0c0-.3.2-.5.4-.5s.4.2.4.5-.2.5-.4.5-.4-.2-.4-.5zm4 2.3c-.5 0-1 .5-1 1.1s.4 1.1 1 1.1c.5 0 1-.5 1-1.1s-.5-1.1-1-1.1zm0 1.6c-.2 0-.4-.2-.4-.5s.2-.5.4-.5.4.2.4.5-.2.5-.4.5zm.2-4.9c-.2-.1-.4 0-.5.1L6 10.4c-.1.1-.1.3.1.4.1 0 .1.1.2.1s.2 0 .2-.1l3.5-5c.1-.1.1-.3 0-.4z"
      />
      <path
        fill="#666"
        d="M12.1 1.1H9.4c-.1 0-.3.1-.3.2-.1.6-.5 1-1.1 1-.6 0-1-.4-1.1-.9 0-.1-.1-.2-.3-.2H3.9c-.6 0-1.2.5-1.2 1.2v11.7c0 .6.5 1.2 1.2 1.2h2.7c.1 0 .3-.1.3-.2.1-.8.5-1.2 1.1-1.2.6 0 1 .4 1.1.9 0 .1.1.2.3.2h2.7c.6 0 1.2-.5 1.2-1.2V2.3c-.1-.7-.6-1.2-1.2-1.2zm.6 12.8c0 .3-.3.6-.6.6H9.7c-.2-.7-.9-1.2-1.7-1.2-.7 0-1.4.5-1.7 1.2H3.9c-.3 0-.6-.3-.6-.6V2.3c0-.3.3-.6.6-.6h2.4c.3.7 1 1.2 1.7 1.2s1.4-.5 1.7-1.2h2.4c.3 0 .6.3.6.6v11.6z"
      />
    </svg>
  );
};

SvgDiscountInfo.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDiscountInfo.displayName = 'DiscountInfo';
export default SvgDiscountInfo;
