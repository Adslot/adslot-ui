import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTargetingTechnology = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 55 55"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        fill="#6D6E71"
        d="M44.3 5.1H3.1C1.9 5.1 1 6.1 1 7.3v31.9c0 1.2.9 2.2 2.1 2.2h14.7L16 46.9c-.5 1.3-.2 2.1 2.4 2.1h11.4c2.6 0 2.9-.8 2.4-2.1l-1.8-5.5h13.9c1.2 0 2.1-1 2.1-2.2V7.3c0-1.2-.9-2.2-2.1-2.2zM24.1 39.2c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1zm19.6-4.3h-40V9c0-.7.6-1.3 1.3-1.3h37.4c.7 0 1.3.6 1.3 1.3v25.9z"
      />
      <path fill="#FFF" d="M38.5 20.1h14.8v28.1H38.5z" />
      <path
        fill="#6D6E71"
        d="M51.5 18.6H40.3c-1.4 0-2.5 1.1-2.5 2.5v25.3c0 1.4 1.1 2.5 2.5 2.5h11.1c1.4 0 2.5-1.1 2.5-2.5V21.1c.1-1.4-1-2.5-2.4-2.5zm-7.1 2h3c.3 0 .5.2.5.5s-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5 0-.2.2-.5.5-.5zM45.9 48c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm7.1-4.1H38.8V23.7H53v20.2z"
      />
    </svg>
  );
};

SvgTargetingTechnology.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTargetingTechnology.displayName = 'TargetingTechnology';
export default SvgTargetingTechnology;
