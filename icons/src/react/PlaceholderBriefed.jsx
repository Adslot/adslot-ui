import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPlaceholderBriefed = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M20 14.8c0-2.7 2.1-4.8 4.8-4.8H60l20 16.8v58.4c0 2.7-2.1 4.8-4.8 4.8H24.8c-2.7 0-4.8-2.1-4.8-4.8V14.8z" />
      <path fill="#FFF" d="M60 10.1v12c0 2.7 2.1 4.8 4.8 4.8H80L60 10.1z" />
      <path fill="#00B7A4" d="m45.1 68.7-4.5 4.4v-6.6" />
      <path fill="#FFF" d="m70 35.8-14.7 38-14.7-7.3v6.6l-5.3-10.7-8-5.3" />
      <path fill="#ECF0F1" d="m35.3 62.4 5.3 10.7v-6.6L70 35.8" />
    </svg>
  );
};

SvgPlaceholderBriefed.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPlaceholderBriefed.displayName = 'PlaceholderBriefed';
export default SvgPlaceholderBriefed;
