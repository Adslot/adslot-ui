import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMedal = (props) => {
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
      <path d="M17.5 13c.1.2.4.3.6.3.1 0 .3 0 .4-.1.3-.2.4-.7.2-1L12 2.5c-.2-.3-.7-.4-1-.2s-.4.7-.2 1l6.7 9.7z" />
      <path d="M35.5 2.3c-.3-.2-.8-.1-1 .2L23.2 19.1c-1-.3-2-.5-3.1-.5-.4 0-.7 0-1.1.1l9.2-13.3c.2-.3.1-.8-.2-1-.3-.2-.8-.1-1 .2L17 18.8 5.8 2.5c-.3-.4-.7-.5-1.1-.2-.3.2-.4.7-.2 1l11.1 16.2c-3.4 1.6-5.7 4.9-5.7 8.8 0 5.4 4.5 9.8 10.1 9.8s10.1-4.4 10.1-9.8c0-3.8-2.2-7.1-5.5-8.7L35.7 3.3c.3-.3.2-.8-.2-1zm-6.9 26c0 4.5-3.8 8.2-8.6 8.2-4.7 0-8.6-3.7-8.6-8.2s3.8-8.2 8.6-8.2 8.6 3.7 8.6 8.2z" />
      <path d="M18.1 25.3c.1.4.6.6 1 .4l.9-.3v7.3c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-8.4c0-.2-.1-.5-.3-.6-.2-.1-.5-.2-.7-.1l-1.9.7c-.5.1-.7.6-.6 1z" />
    </svg>
  );
};

SvgMedal.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMedal.displayName = 'Medal';
export default SvgMedal;
