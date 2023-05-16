import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPencil = (props) => {
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
        fill={color}
        d="M.5 11.7v3.1c0 .2 0 .4.2.5s.4.2.5.2h3.1c.2 0 .4 0 .5-.2L15.4 4.8c.2-.2.2-.7 0-.9L12.3.6c-.2-.2-.7-.2-.9 0l-2.2 2-8.5 8.5c0 .2-.2.4-.2.6zm11.2-9.8 2.2 2.2-1.3 1.3-2-2.2 1.1-1.3zM2 11.9l7.8-7.8L12 6.3l-8 7.8H1.8l.2-2.2z"
      />
    </svg>
  );
};

SvgPencil.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPencil.displayName = 'Pencil';
export default SvgPencil;
