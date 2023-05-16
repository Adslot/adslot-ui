import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgAdFormatVideo = (props) => {
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
        fill="#6D6E71"
        d="M15 4.6V4.3c-.2-.6-.7-1-1.3-1h.1s-2.5-.4-5.8-.4c-3.3.1-5.8.5-5.8.5h.1c-.6 0-1.1.4-1.3 1V4.7C.8 5.2.7 6.5.7 8c0 1.5.2 2.8.3 3.5V11.8c.2.6.7 1 1.3 1h-.1s2.5.4 5.8.4 5.8-.4 5.8-.4h-.1c.6 0 1.1-.4 1.3-1V11.5c.1-.6.2-1.9.3-3.5 0-1.5-.2-2.8-.3-3.4zm-4.9 3.7-3 2.1c-.1 0-.1.1-.2.1h-.2c-.1-.1-.2-.2-.2-.3V5.9c0-.1.1-.3.2-.3.1-.1.3 0 .4 0l3 2.1c.1.1.1.2.1.3.1.2 0 .3-.1.3z"
      />
    </svg>
  );
};

SvgAdFormatVideo.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgAdFormatVideo.displayName = 'AdFormatVideo';
export default SvgAdFormatVideo;
