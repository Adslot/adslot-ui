import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCaretRight = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#5a5a5a"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M10.7 7.5 6 4.1c-.2-.1-.4-.1-.6 0s-.3.3-.3.5v6.9c0 .2.1.4.3.5h.2c.1 0 .2 0 .3-.1l4.7-3.4c.1-.1.2-.3.2-.5.1-.2 0-.4-.1-.5z" />
    </svg>
  );
};

SvgCaretRight.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCaretRight.displayName = 'CaretRight';
export default SvgCaretRight;
