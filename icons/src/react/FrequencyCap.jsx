import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgFrequencyCap = (props) => {
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
        fill="#6d6e71"
        d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 12.9c-3.3 0-5.9-2.7-5.9-5.9 0-3.3 2.7-5.9 5.9-5.9 3.3 0 5.9 2.7 5.9 5.9 0 3.3-2.6 5.9-5.9 5.9z"
      />
      <path
        fill="#6d6e71"
        d="M10.8 7.7H8.1V3.8c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.5c0 .1 0 .2.1.2.1.2.3.3.5.3h3c.3 0 .6-.3.6-.6-.1-.2-.3-.5-.7-.5z"
      />
    </svg>
  );
};

SvgFrequencyCap.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgFrequencyCap.displayName = 'FrequencyCap';
export default SvgFrequencyCap;
