import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgGravatarLogo = (props) => {
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
        fill="#4f92db"
        d="M6.9.9C7.2.7 7.6.5 8 .5c4.1 0 7.5 3.4 7.5 7.5s-3.4 7.5-7.5 7.5S.5 12.1.5 8c0-2.1.8-4 2.2-5.4.7-.6 1.6-.6 2.2.1.6.6.6 1.5 0 2.1-.9.8-1.4 2-1.4 3.2 0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5c0-2-1.3-3.6-3-4.2v3.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V2c0-.4.2-.8.4-1.1z"
      />
    </svg>
  );
};

SvgGravatarLogo.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgGravatarLogo.displayName = 'GravatarLogo';
export default SvgGravatarLogo;
