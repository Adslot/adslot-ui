import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPackageSponsorshipExpand = (props) => {
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
      <path d="M7.3 28.8h2.9c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7H7.3c-.4 0-.7.3-.7.7 0 .4.3.7.7.7zM15.8 30.4H7.3c-.4 0-.8.2-.8.6 0 .4.2.8.6.8h8.6c.4 0 .7-.4.6-.8.1-.3-.2-.6-.5-.6zM15.8 33.4H7.3c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h8.4c.4 0 .7-.3.7-.7.1-.4-.2-.7-.6-.7z" />
      <path d="M36.1 37.2c-.8 0-1.5-.1-2.2-.2v1.1H3.2V17.4h10.4V15H4.1l3.5-6h8.7l-1.2 6v10.3H22V15l-1.2-6h8.5l2 3.3c.8-.3 1.6-.5 2.4-.7L31 7.1c-.2-.4-.6-.6-1.1-.6h-23c-.4 0-.8.2-1.1.6l-5 8.4c0 .1-.1.1-.1.2V39.3c0 .7.5 1.2 1.2 1.2H35c.7 0 1.2-.6 1.2-1.2v-2.2c.1.1 0 .1-.1.1z" />
      <path d="M37.6 22.7h6.5v2.8h-6.5v7.4h-3v-7.4h-6.5v-2.8h6.5v-6.8h3v6.8z" />
    </svg>
  );
};

SvgPackageSponsorshipExpand.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPackageSponsorshipExpand.displayName = 'PackageSponsorshipExpand';
export default SvgPackageSponsorshipExpand;
