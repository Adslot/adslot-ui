import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTypeSponsorship = (props) => {
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
      <path d="M3.38 10.15h1.18a.3.3 0 1 0 0-.6H3.38a.3.3 0 1 0 0 .6zm3.47.64H3.38a.3.3 0 1 0 0 .6h3.47a.3.3 0 0 0 0-.6zm0 1.21H3.38a.3.3 0 1 0 0 .6h3.47a.3.3 0 0 0 0-.6z" />
      <path d="m15.23 4.65-2-3.4a.5.5 0 0 0-.46-.25H3.22a.48.48 0 0 0-.43.25L.74 4.7v.09A.36.36 0 0 0 .67 5v9.53a.51.51 0 0 0 .51.51h13.64a.51.51 0 0 0 .51-.51V5a.55.55 0 0 0-.1-.35zM14.31 14H1.68V5.47H6v-1H2.07L3.51 2h3.58l-.48 2.46V8.7h2.85V4.46L9 2h3.5l1.45 2.44h-3.84v1h4.2z" />
    </svg>
  );
};

SvgTypeSponsorship.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTypeSponsorship.displayName = 'TypeSponsorship';
export default SvgTypeSponsorship;
