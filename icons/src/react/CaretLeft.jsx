import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCaretLeft = (props) => {
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
      <path d="m5.2 8.5 4.7 3.4c.2.1.4.1.6 0 .2-.1.3-.3.3-.5V4.5c0-.2-.1-.4-.3-.5h-.2c-.1 0-.2 0-.3.1L5.3 7.5c-.1.1-.2.3-.2.5-.1.2 0 .4.1.5z" />
    </svg>
  );
};

SvgCaretLeft.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCaretLeft.displayName = 'CaretLeft';
export default SvgCaretLeft;
