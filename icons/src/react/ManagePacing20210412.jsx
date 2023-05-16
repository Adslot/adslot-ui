import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgManagePacing20210412 = (props) => {
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
      <path
        d="M3.4 7.2V33c0 2.3 1.8 4.1 4.1 4.1h25.8c2.3 0 4.1-1.8 4.1-4.1V7.2c0-2.3-1.8-4.1-4.1-4.1H7.5c-2.3 0-4.1 1.8-4.1 4.1zm29.9-2.7c1.5 0 2.7 1.2 2.7 2.7V33c0 1.5-1.2 2.7-2.7 2.7H7.5c-1.5 0-2.7-1.2-2.7-2.7V7.2c0-1.5 1.2-2.7 2.7-2.7h25.8z"
        fill="#5a5a5a"
      />
      <path
        d="M10.1 27.2h-.5c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h.4c.3 1.7 1.8 2.9 3.6 2.9s3.2-1.3 3.6-2.9H31c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7H17.2c-.3-1.7-1.8-2.9-3.6-2.9-1.7 0-3.2 1.2-3.5 2.9zm5.7.7c0 1.2-1 2.2-2.2 2.2-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2c1.3 0 2.2 1 2.2 2.2zm6.7-8.6H9.6c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h12.8c.3 1.7 1.8 2.9 3.6 2.9s3.2-1.3 3.6-2.9H31c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-1.4c-.3-1.7-1.8-2.9-3.6-2.9-1.7-.1-3.2 1.2-3.5 2.9zm5.7.7c0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2c0-1.2 1-2.2 2.2-2.2s2.2.9 2.2 2.2zm-14.6-8.4h-4c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h4c.3 1.7 1.8 2.9 3.6 2.9s3.2-1.3 3.6-2.9H31c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7H20.7c-.3-1.7-1.8-2.9-3.6-2.9s-3.2 1.3-3.5 2.9zm5.8.7c0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2 1-2.2 2.2-2.2 2.2 1 2.2 2.2z"
        fill="#5a5a5a"
      />
    </svg>
  );
};

SvgManagePacing20210412.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgManagePacing20210412.displayName = 'ManagePacing20210412';
export default SvgManagePacing20210412;
