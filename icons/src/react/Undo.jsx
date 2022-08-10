import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgUndo = (props) => {
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
      <path fill="none" d="M0 0h16v16H0z" />
      <path
        d="M15.4 10 13 6.7c-.1-.1-.2-.1-.3-.1s-.2.1-.3.1L10.1 10c-.1.1-.1.3 0 .4.1.1.2.2.3.2h1.3c-.3.5-.7.9-1.1 1.3-1 .9-2.4 1.3-3.7 1.2-1.4-.1-2.6-.8-3.5-1.8S2.1 8.9 2.2 7.6C2.3 6.2 2.9 5 4 4.1s2.4-1.3 3.7-1.2c1.3.1 2.6.7 3.4 1.8.3.3.9.3 1.2 0s.4-.8.1-1.2c-1.2-1.3-2.8-2.2-4.5-2.3-1.8-.1-3.6.4-5 1.6S.7 5.6.5 7.4c-.1 1.8.4 3.6 1.6 5s2.8 2.2 4.6 2.4h.6c1.6 0 3.1-.6 4.4-1.6.8-.7 1.5-1.6 1.9-2.6h1.6c.1 0 .3-.1.3-.2s0-.3-.1-.4z"
        fill={color}
      />
    </svg>
  );
};

SvgUndo.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgUndo.displayName = 'Undo';
export default SvgUndo;
