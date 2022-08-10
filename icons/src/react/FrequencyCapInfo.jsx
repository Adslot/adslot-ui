import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgFrequencyCapInfo = (props) => {
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
        d="M7.3 3.3c-.2 0-.3.2-.3.3v4.7c0 .1 0 .2.1.2l2.3 1.8c.1 0 .1.1.2.1s.2 0 .2-.1c.1-.1.1-.3-.1-.4L7.6 8.2V3.6c0-.1-.2-.3-.3-.3zm5.4 1.6c.1 0 .1 0 .2-.1.1 0 .1-.2 0-.4-.1-.1-.3-.1-.4-.1-.1.1-.2.3-.1.4.1.2.2.2.3.2zm.3.9c0 .1.1.2.2.2h.1c.2-.1.2-.2.2-.4v-.1c-.1-.1-.2-.2-.4-.1-.1 0-.2.2-.1.4zM12 4c.1 0 .1 0 .2-.1s.1-.3 0-.4v-.1c-.1-.1-.3-.1-.4 0-.1.1-.1.3 0 .4 0 .1.1.2.2.2zM8.8 2.3h.1c.1 0 .3-.1.3-.2 0-.2-.1-.3-.2-.3-.2 0-.3.1-.3.2-.2.1-.1.2.1.3zm1.1.3h.2c.1 0 .2-.1.3-.2.1-.2 0-.3-.2-.4-.2 0-.4.1-.5.2 0 .2 0 .3.2.4zm1.2.6c.1 0 .2 0 .2-.1.1-.1.1-.3-.1-.4h-.1c-.1-.1-.3 0-.4.1-.1.1 0 .3.1.4h.3z"
      />
      <path
        fill="#666"
        d="m15.1 8.7-1.2-1.2s-.1-.1-.2-.1h-.2l-1.3 1.1c-.1.1-.1.3 0 .4.1.1.1.1.2.1s.1 0 .2-.1l.9-.7c-.1 1.4-.6 2.7-1.6 3.7-1.1 1.2-2.6 1.8-4.2 1.8-3.2 0-5.8-2.6-5.8-5.8 0-1.6.6-3.1 1.8-4.2C4.8 2.6 6.3 2 7.9 2c0 .1.1 0 .1-.1 0-.2-.1-.3-.3-.3h-.1c-1.6-.1-3.3.6-4.5 1.8-1.3 1.2-2 2.8-2 4.6 0 3.5 2.9 6.4 6.4 6.4 1.8 0 3.4-.7 4.7-2 1.1-1.1 1.7-2.5 1.8-4l.7.7c.1.1.3.1.4 0 .1-.1.1-.3 0-.4z"
      />
    </svg>
  );
};

SvgFrequencyCapInfo.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgFrequencyCapInfo.displayName = 'FrequencyCapInfo';
export default SvgFrequencyCapInfo;
