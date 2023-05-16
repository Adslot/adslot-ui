import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgSetupIncomplete = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        fill="#ABABAB"
        d="M4.3 9.3c-.2 0-.4-.3-.4-.5 0-.3.2-.5.5-.5h8.3c.3 0 .5.2.5.5 0 .1-.1.2-.1.3-.1.1-.2.1-.3.1l-8.5.1z"
      />
      <path
        fill="#ABABAB"
        d="M8.5 16.5c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm0-15c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.2-7-7-7z"
      />
    </svg>
  );
};

SvgSetupIncomplete.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgSetupIncomplete.displayName = 'SetupIncomplete';
export default SvgSetupIncomplete;
