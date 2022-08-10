import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCaretUp = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#5bb75b"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="m7.7 4.7-3.6 6.2c-.1.2-.1.4.1.5.1 0 .1.1.2.1h7.2c.2 0 .4-.2.4-.4 0-.1 0-.1-.1-.2L8.3 4.7c-.1-.2-.3-.3-.5-.2-.1.1-.1.1-.1.2z" />
    </svg>
  );
};

SvgCaretUp.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCaretUp.displayName = 'CaretUp';
export default SvgCaretUp;
