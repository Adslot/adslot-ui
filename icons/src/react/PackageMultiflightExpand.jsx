import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPackageMultiflightExpand = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M41.9 22.7h-.1v-6.6H39v6.6h-6.6v2.8H39v6.6h2.8v-6.6h6.6v-2.8zM7.1 30.5l26.4-20.3L1 26.4zm4 3v5.1l3.4-3.4 7.8 3.9 11.2-28.9z" />
    </svg>
  );
};

SvgPackageMultiflightExpand.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPackageMultiflightExpand.displayName = 'PackageMultiflightExpand';
export default SvgPackageMultiflightExpand;
