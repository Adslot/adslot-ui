import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTargetingCustom = (props) => {
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
      <path d="M3.2 7.7c.4 0 1-.1 1.4-.5.1-.2.1-.2.1-.3.4.8 1.2 1.3 1.8 1.3.7 0 1.4-.5 1.8-1.3-.1.1 0 .1 0 .2.3.4.8.5 1.4.5.4 0 1.1-.1 1.1-.3 0 0 0-.1-.1-.1h-.3c-.3.1-.4-.2-.7-.7h.1c.3 0 .5-.1.7-.1s.3-.1.3-.4c0-.1-.1-.1-.3-.1-.4 0-1-1.4-1.2-2.6v-.2C9 1.9 7.9 1 6.6 1s-2.5.9-2.8 2.1v.1C3.6 4.3 3 5.8 2.6 5.8c-.3-.1-.4 0-.4.2 0 .1.5.5 1 .5h.1c-.3.4-.5.8-.7.8h-.1s-.3 0-.3.1c-.1.1.7.3 1 .3zM1.3 15h10.3c.1-.4.3-.8.3-1 .4-2.2-.3-3.4-.8-4.1-.5-.7-1.4-1-2-1h-.5l-2.2 5-2-5h-.3c-.8 0-1.5.4-2.2.9-.5.7-1.2 1.8-.8 4.1 0 .4.2.7.2 1.1z" />
      <path
        fill="#FFF"
        stroke="#FFF"
        strokeWidth={0.659}
        strokeMiterlimit={10}
        d="M14 12c-.2 0-.5-.1-.6-.3L11 9.2l.2-.2c.4-.2.7-.5.8-.9l.2-.3 2.4 2.5c.2.2.3.4.3.6s-.1.5-.3.6l-.2.2c0 .2-.2.3-.4.3z"
      />
      <path d="m14.9 10.9-2.3-2.3c-.2.4-.6.8-1 1l2.3 2.3c.2.2.6.2.8 0l.2-.2c.1-.2.1-.5 0-.8z" />
      <path
        fill="#FFF"
        stroke="#FFF"
        strokeWidth={0.659}
        strokeMiterlimit={10}
        d="M9.9 9.9C8.4 9.9 7 8.6 7 7s1.3-3 2.9-3 2.9 1.3 2.9 3c.1 1.5-1.3 2.9-2.9 2.9z"
      />
      <path d="M12.5 7c0-1.5-1.2-2.6-2.6-2.6S7.4 5.5 7.4 7 8.6 9.6 10 9.6c1.4-.1 2.5-1.2 2.5-2.6zM9.9 8.9C8.9 8.9 8 8 8 7s.9-2 2-2 2 .9 2 2-1 1.9-2.1 1.9z" />
    </svg>
  );
};

SvgTargetingCustom.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTargetingCustom.displayName = 'TargetingCustom';
export default SvgTargetingCustom;
