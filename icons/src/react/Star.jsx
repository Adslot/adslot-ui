import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgStar = (props) => {
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
      <path d="m14.9 6.9-3.7 2.8 1.4 4.4c.1.2 0 .4-.2.5-.1.1-.2.1-.2.1-.1 0-.2 0-.2-.1l-4-2.7-3.9 2.7c-.1.1-.3.1-.5 0-.1-.1-.2-.3-.2-.5l1.4-4.4-3.7-2.8C1 6.8.9 6.6 1 6.4c0-.2.2-.3.4-.3L6.1 6l1.5-4.4c.1-.1.2-.3.4-.3s.3.1.4.3L9.9 6l4.7.1c.2 0 .3.1.4.3.1.2 0 .4-.1.5" />
    </svg>
  );
};

SvgStar.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgStar.displayName = 'Star';
export default SvgStar;
