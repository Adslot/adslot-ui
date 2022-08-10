import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgNewsStand = (props) => {
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
      <path d="M12.5 10.6H3.4V7.3c-.3.2-.6.4-1 .5V14c0 .3.2.5.5.5H13c.3 0 .5-.2.5-.5V7.8c-.4-.1-.7-.2-1-.5v3.3zM13.5 2.5V2c0-.3-.2-.5-.5-.5H2.9c-.2 0-.5.2-.5.5v.6h10.9l.2-.1zM13.3 3.1H2.7l-2 2.2c0 .8.7 1.5 1.5 1.5.2 0 .3 0 .5-.1 0 0 .1 0 .1-.1 0 0 .1 0 .1-.1.2-.1.3-.3.5-.5l.1-.1c.1-.2.1-.4.1-.6 0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0 .3.1.5.2.7 0 0 0 .1.1.1l.1.1.1.1c.1.1.3.2.4.3.1 0 .1 0 .2.1h.3c.8 0 1.5-.7 1.5-1.5l-2.2-2.1z" />
      <path d="M13.2 2.4h.3v.2h-.3z" />
    </svg>
  );
};

SvgNewsStand.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgNewsStand.displayName = 'NewsStand';
export default SvgNewsStand;
