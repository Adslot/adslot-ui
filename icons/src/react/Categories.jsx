import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCategories = (props) => {
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
        d="M4.3 11.3H1c-.2 0-.3.1-.3.3V15c0 .2.1.3.3.3h3.3c.2 0 .3-.1.3-.3v-3.3c.1-.2-.1-.4-.3-.4zM4 14.6H1.4V12H4v2.6zM4.3 6H1c-.1 0-.3.2-.3.4v3.3c0 .2.2.3.3.3h3.3c.2 0 .3-.1.3-.3V6.4c.1-.2-.1-.4-.3-.4zM4 9.3H1.4V6.7H4v2.6zM4.3.8H1C.8.8.7.9.7 1.1v3.3c0 .2.1.3.3.3h3.3c.2 0 .3-.1.3-.3V1.1c.1-.2-.1-.3-.3-.3zM4 4.1H1.4V1.4H4v2.7zm5.6 7.2H6.3c-.2 0-.3.1-.3.3V15c0 .2.1.3.3.3h3.3c.2 0 .3-.1.3-.3v-3.3c.1-.2-.1-.4-.3-.4zm-.3 3.3H6.7V12h2.6v2.6zM9.6 6H6.3c-.2 0-.3.2-.3.4v3.3c0 .2.1.3.3.3h3.3c.2 0 .4-.1.4-.3V6.4c0-.2-.2-.4-.4-.4zm-.3 3.3H6.7V6.7h2.6v2.6zM9.6.8H6.3c-.2 0-.3.1-.3.3v3.3c0 .2.1.3.3.3h3.3c.2 0 .3-.1.3-.3V1.1c.1-.2-.1-.3-.3-.3zm-.3 3.3H6.7V1.4h2.6v2.7zm5.6 7.2h-3.3c-.2 0-.3.1-.3.3V15c0 .2.1.3.3.3h3.3c.2 0 .3-.1.3-.3v-3.3c0-.2-.1-.4-.3-.4zm-.3 3.3H12V12h2.6v2.6zm.3-8.6h-3.3c-.2 0-.3.1-.3.3v3.3c0 .2.1.3.3.3h3.3c.2 0 .3-.1.3-.3V6.4c0-.2-.1-.4-.3-.4zm-.3 3.3H12V6.7h2.6v2.6zm.3-8.5h-3.3c-.2 0-.3.1-.3.3v3.3c0 .2.1.3.3.3h3.3c.2 0 .3-.1.3-.3V1.1c0-.2-.1-.3-.3-.3zm-.3 3.3H12V1.4h2.6v2.7z"
        fill="#5a5a5a"
      />
    </svg>
  );
};

SvgCategories.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCategories.displayName = 'Categories';
export default SvgCategories;
