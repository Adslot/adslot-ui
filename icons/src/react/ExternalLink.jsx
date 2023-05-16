import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgExternalLink = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={size}
      height={size}
      {...rest}
      className={classnames('svg-icon', className)}
    >
      <path d="M33.406 0c-.55.05-.957.543-.906 1.094.05.55.543.957 1.094.906h12.968L25.689 22.906a1.004 1.004 0 0 0-.348 1.004c.086.371.379.664.75.75.375.086.762-.05 1.004-.348L48 3.438v12.97c-.004.359.184.695.496.878.313.18.695.18 1.008 0 .312-.183.5-.52.496-.879V0H33.406zM2 10c-.523 0-1.059.184-1.438.563C.184 10.94 0 11.476 0 12v36c0 .523.184 1.059.563 1.438C.94 49.816 1.477 50 2 50h36c.523 0 1.059-.184 1.438-.563.378-.378.562-.914.562-1.437V18a1.006 1.006 0 0 0-.496-.879 1.01 1.01 0 0 0-1.008 0c-.312.184-.5.52-.496.879v30H2V12h30c.36.004.695-.184.879-.496a1.01 1.01 0 0 0 0-1.008c-.184-.312-.52-.5-.879-.496z" />
    </svg>
  );
};

SvgExternalLink.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgExternalLink.displayName = 'ExternalLink';
export default SvgExternalLink;
