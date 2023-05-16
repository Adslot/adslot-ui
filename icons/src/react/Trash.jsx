import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTrash = (props) => {
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
        d="M5.7 13.5c.2 0 .4-.2.4-.4V5.3c0-.2-.2-.4-.4-.4s-.4.2-.4.4v7.8c0 .2.2.4.4.4zm2.3 0c.2 0 .4-.2.4-.4V5.3c0-.2-.2-.4-.4-.4s-.4.2-.4.4v7.8c0 .2.2.4.4.4zm2.3 0c.2 0 .4-.2.4-.4V5.3c0-.2-.2-.4-.4-.4s-.4.2-.4.4v7.8c.1.2.2.4.4.4z"
        fill={color}
      />
      <path
        d="M13.6 2.4h-2.7v-.8c0-.6-.5-1.1-1.1-1.1H6.2c-.6 0-1.1.5-1.1 1.1v.8H2.4c-.4 0-.7.4-.7.8s.3.8.8.8H3v10.9c0 .3.3.6.6.6h9c.3 0 .6-.3.6-.6v-11h.5c.4 0 .7-.3.7-.8-.1-.3-.4-.7-.8-.7zm-7.5-.8c0-.1 0-.1.1-.1h3.5c.1 0 .1 0 .1.1v.8H6.1v-.8zm5.8 12.6H4.1V3.9h7.7v10.3h.1z"
        fill={color}
      />
    </svg>
  );
};

SvgTrash.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTrash.displayName = 'Trash';
export default SvgTrash;
