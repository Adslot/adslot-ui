import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTargetingAudienceSmall = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40.2 40.2"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <g fill="#5a5a5a">
        <path d="M24.6 25.4c-4.6-1.8-5.5-2.6-5.7-2.8v-.5c.5-.6.9-1.4 1.2-2.3.4-.3.6-.8.7-1.3s0-1-.3-1.4v-1.8c0-2.6-1.6-4.1-4.3-4.1s-4.3 1.5-4.3 4.1v1.8c-.3.4-.4.9-.3 1.4.1.5.3.9.7 1.3.3.9.7 1.7 1.2 2.3v.5c-.3.4-1.5 1.2-3.6 2.1-.3.1-.5.5-.3.9.1.3.5.5.9.3 1.2-.5 4-1.8 4.3-3v-1.1c0-.2-.1-.3-.2-.5-.5-.5-.9-1.3-1.1-2.1 0-.1-.1-.3-.3-.4s-.3-.3-.3-.5 0-.4.2-.6c.1-.1.1-.3.1-.4v-2c0-1.8 1-2.8 3-2.8s3 .9 3 2.8v2c0 .2.1.3.1.4.1.2.2.4.2.6s-.1.4-.3.5c-.2.2-.2.3-.3.5-.2.9-.6 1.6-1.1 2.1-.1.1-.2.3-.2.5V23c.2.7 1.1 1.6 6.4 3.7v2.7c0 .4.3.7.7.7.4 0 .7-.3.7-.7v-2.7c0-.6-.3-1.1-.8-1.3z" />
        <path d="M29.6 25.2c-1.1-.5-1.6-.9-1.7-1.1v-.3c.4-.5.7-1.1.9-1.7.3-.3.5-.6.5-1 .1-.4 0-.8-.2-1.2v-1.3c0-2.1-1.3-3.3-3.5-3.3s-3.5 1.3-3.5 3.3V20c-.2.3-.3.7-.2 1.1.1.4.2.8.5 1 .2.8.6 1.4 1.1 1.9.3.3.7.3.9 0 .3-.3.3-.7 0-.9-.4-.4-.7-.9-.8-1.6 0-.1-.1-.3-.3-.4-.1-.1-.2-.2-.2-.3 0-.1 0-.2.1-.3.1-.1.1-.3.1-.4v-1.5c0-1.3.7-2 2.2-2s2.2.6 2.2 2v1.5c0 .2.1.3.1.4.2.3.2.4.2.5s-.1.2-.2.3c-.1.1-.2.2-.3.4-.2.6-.5 1.2-.8 1.6-.1.1-.2.3-.2.5v.9c.2.6 1 1.2 2.5 1.9.1 0 .2.1.3.1.3 0 .5-.1.6-.4.2-.5.1-.9-.3-1.1z" />
        <path d="M35.4 19.4h-.7c-.3-7.5-6.4-13.6-14-14v-.6c0-.4-.3-.7-.7-.7-.4 0-.7.3-.7.7v.7c-7.5.3-13.6 6.4-14 14h-.5c-.4 0-.7.3-.7.7s.3.7.7.7h.7c.3 7.5 6.4 13.6 14 14v.7c0 .4.3.7.7.7.4 0 .7-.3.7-.7v-.7c7.5-.3 13.6-6.4 14-14h.7c.4 0 .7-.3.7-.7s-.5-.8-.9-.8zm-14.6 14v-1.7c0-.4-.3-.7-.7-.7-.4 0-.7.3-.7.7v1.7C12.6 33 7.2 27.6 6.8 20.8h1.7c.4 0 .7-.3.7-.7s-.3-.7-.7-.7H6.8c.3-6.8 5.8-12.3 12.6-12.6v1.8c0 .4.3.7.7.7.4 0 .7-.3.7-.7V6.8c6.8.3 12.3 5.8 12.6 12.6h-1.8c-.4 0-.7.3-.7.7s.3.7.7.7h1.8C33 27.6 27.6 33 20.8 33.4z" />
      </g>
    </svg>
  );
};

SvgTargetingAudienceSmall.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTargetingAudienceSmall.displayName = 'TargetingAudienceSmall';
export default SvgTargetingAudienceSmall;
