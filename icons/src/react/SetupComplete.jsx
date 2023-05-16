import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgSetupComplete = (props) => {
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
        fill="#95C83D"
        d="M12 5.1c-.2-.2-.5-.1-.7.1l-4.2 5.5-1.5-1.9c-.2-.2-.5-.2-.7 0-.2.2-.2.5 0 .7l1.9 2.3c.1.1.3.2.4.2.1 0 .3-.1.4-.2l4.6-6c.1-.3 0-.5-.2-.7z"
      />
      <path
        fill="#95C83D"
        d="M8.5 16.5c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm0-15c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.2-7-7-7z"
      />
    </svg>
  );
};

SvgSetupComplete.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgSetupComplete.displayName = 'SetupComplete';
export default SvgSetupComplete;
