import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDeliveryDetail = (props) => {
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
      {'x="0" y="0"'}
      <circle cx={8} cy={8} r={6.6} fill="#fff" />
      <path
        d="M8 1.8c3.4 0 6.2 2.8 6.2 6.2s-2.8 6.2-6.2 6.2S1.8 11.4 1.8 8 4.6 1.8 8 1.8M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z"
        fill="#e8e8e8"
      />
      <path
        fill="#bcbec0"
        d="m11.6 6.7-2 2.6c.2.1.3.2.4.3L12 7c-.2-.1-.3-.2-.4-.3zm-4.7 0c-.1.1-.2.3-.4.3l2 2.6c.1-.1.3-.2.5-.3L6.9 6.7zm-1.6-.2-1.2 1c.2.2.3.3.4.5l1.2-1c-.2-.2-.3-.3-.4-.5z"
      />
      <path
        fill="#0071b9"
        d="M6.8 6.5c0-.1.1-.2.1-.3 0-.4-.3-.7-.7-.7-.4 0-.7.3-.7.7v.2c.1.2.2.3.4.4.1 0 .2.1.3.1h.1c.2-.2.4-.3.5-.4zm3.1 3.4s0-.1-.1-.1l-.1-.1s-.1 0-.1-.1h-.2c-.1 0-.2 0-.3.1 0 0-.1 0-.1.1l-.1.1-.1.1c0 .1-.1.2-.1.3 0 .4.3.7.7.7.4 0 .7-.3.7-.7-.2-.2-.2-.3-.2-.4zm2.4-4.4c-.4 0-.7.3-.7.7 0 .1 0 .2.1.3.1.2.2.3.4.3h.2c.4 0 .7-.3.7-.7 0-.3-.3-.6-.7-.6zM3.9 7.7c-.1 0-.2-.1-.3-.1-.3.1-.6.4-.6.7 0 .4.3.7.7.7.3 0 .6-.3.6-.7v-.2c-.1-.1-.2-.3-.4-.4z"
      />
    </svg>
  );
};

SvgDeliveryDetail.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDeliveryDetail.displayName = 'DeliveryDetail';
export default SvgDeliveryDetail;
