import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgClipboard = (props) => {
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
      <path d="M85 18.7c0-1.5-1.2-2.7-2.7-2.7H17.7c-1.5 0-2.7 1.2-2.7 2.7v68.7c0 1.5 1.2 2.7 2.7 2.7h64.6c1.5 0 2.7-1.2 2.7-2.7V18.7z" />
      <path fill="#FFF" d="M20.4 21.3h59.2v63.3H20.4z" />
      <path
        fill="#B1E0DF"
        d="M63.5 12h-5.4c0-4.4-3.7-8.1-8.1-8.1s-8.1 3.7-8.1 8.1h-5.4c-1.5 0-2.7 1.2-2.7 2.7v10.8c0 1.5 1.2 2.7 2.7 2.7h26.9c1.5 0 2.7-1.2 2.7-2.7V14.7c0-1.6-1.1-2.7-2.6-2.7zM50 6.6c1.5 0 2.7 1.2 2.7 2.7S51.5 12 50 12s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7z"
      />
      <path d="M56.1 78.6c-4.4 0-8.1-3.7-8.1-8.1s3.7-8.1 8.1-8.1 8.1 3.7 8.1 8.1-3.7 8.1-8.1 8.1zm0-12.2c-2.3 0-4.1 1.8-4.1 4.1s1.8 4.1 4.1 4.1 4.1-1.8 4.1-4.1-1.8-4.1-4.1-4.1zM73 45.2l-2.3-2.3-3.7 3.6-3.7-3.6-2.4 2.3 3.6 3.7-3.6 3.6 2.4 2.5 3.7-3.6 3.7 3.6 2.3-2.5-3.6-3.6zM40.6 37.3l-2.3-2.4-3.7 3.7-3.8-3.8-2.4 2.4 3.7 3.7-3.6 3.7 2.4 2.5 3.7-3.7 3.6 3.5 2.3-2.4-3.5-3.6z" />
      <path
        fill="#03746A"
        d="m55.6 42.9-10.9 1.3 3 3.1c-4.1 2.5-14.4 10.2-14.4 26.5 0 1.1.9 2 2 2s2-.9 2-2c0-15.7 11-22.3 13.2-23.5l3.2 3.3 1.9-10.7z"
      />
      <path d="M63.5 12h-5.4c0-4.4-3.7-8.1-8.1-8.1s-8.1 3.7-8.1 8.1h-5.4c-1.5 0-2.7 1.2-2.7 2.7V20h32.3v-5.4c0-1.5-1.1-2.6-2.6-2.6zM50 12c-1.5 0-2.7-1.2-2.7-2.7s1.2-2.7 2.7-2.7 2.7 1.2 2.7 2.7S51.5 12 50 12z" />
    </svg>
  );
};

SvgClipboard.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgClipboard.displayName = 'Clipboard';
export default SvgClipboard;
