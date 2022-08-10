import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgFilterThin = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        d="M14.579 6.28c0-.9-.7-1.7-1.6-1.9v-3.1c0-.2-.1-.3-.3-.3-.2 0-.3.1-.3.3v3.1c-.9.2-1.6.9-1.6 1.9 0 .9.7 1.7 1.6 1.9v6.9c0 .2.1.3.3.3.2 0 .3-.1.3-.3v-6.9c.9-.2 1.6-1 1.6-1.9zm-1.9 1.3c-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3zm-9-5.6v-.7c0-.2-.1-.3-.3-.3-.2 0-.3.1-.3.3v.7c-.9.2-1.6.9-1.6 1.9 0 .9.7 1.7 1.6 1.9v9.3c0 .2.1.3.3.3.2 0 .3-.1.3-.3v-9.3c.9-.2 1.6-.9 1.6-1.9 0-1-.7-1.8-1.6-1.9zm-.3 3.1c-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3.7 0 1.3.6 1.3 1.3-.1.8-.6 1.3-1.3 1.3zm4.9 4.4v-8.2c0-.2-.1-.3-.3-.3-.2 0-.3.1-.3.3v8.2c-.9.2-1.6.9-1.6 1.9 0 .9.7 1.7 1.6 1.9v1.9c0 .2.1.3.3.3.2 0 .3-.1.3-.3v-1.9c.9-.2 1.6-.9 1.6-1.9 0-1-.7-1.8-1.6-1.9zm-.3 3.1c-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3z"
        fill="#5a5a5a"
      />
    </svg>
  );
};

SvgFilterThin.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgFilterThin.displayName = 'FilterThin';
export default SvgFilterThin;
