import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgInformation = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#ababab"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm.2 2.1c.9 0 1.5.7 1.5 1.5S9 6.2 8.2 6.2c-.9 0-1.5-.7-1.5-1.5s.6-1.6 1.5-1.6zm2.1 9.2c-.1.1-.3.2-.3.2H6.4c-.1 0-.2 0-.3-.2-.1-.1-.1-.2-.1-.4s0-.3.1-.4c.1-.1.3-.2.3-.2h.4v-3h-.4c-.1 0-.2 0-.3-.2-.1.1-.2-.1-.2-.2 0-.2 0-.3.1-.4.1-.1.3-.2.3-.2h3c.1 0 .2.1.2.2v3.9h.5c.1 0 .2 0 .3.2.1.1.1.2.1.4.1.1 0 .2-.1.3z" />
    </svg>
  );
};

SvgInformation.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgInformation.displayName = 'Information';
export default SvgInformation;
