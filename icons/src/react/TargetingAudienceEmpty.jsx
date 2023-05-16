import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTargetingAudienceEmpty = (props) => {
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
      <path fill="#F1C9A5" d="M7.9 9.9C7.5 9 4.8 8.5 4.8 8.5S2 9 1.6 9.9C1.3 11 1 12.4 1 12.4h7.5s-.2-1.5-.6-2.5z" />
      <path fill="#E4B692" d="M4.8 8.5S7.6 9 8 9.8c.4 1 .6 2.5.6 2.5H4.8V8.5z" />
      <path fill="#F1C9A5" d="M4 6.9h1.5v2.5H4V6.9z" />
      <path fill="#E4B692" d="M4.8 6.9h.8v2.5h-.8V6.9z" />
      <path opacity={0.1} fill="#DDAC8C" d="M4 8.1c.1.4.7.6 1.1.6.1 0 .3 0 .4-.1V6.9H4v1.2z" />
      <path fill="#F1C9A5" d="M6.7 5.3c0-1.6-.9-2.5-1.9-2.5s-2 1-2 2.5c0 2.1.9 2.8 1.9 2.8 1.1 0 2-.8 2-2.8z" />
      <path fill="#E4B692" d="M6.4 6.4c-.4 0-.6-.4-.5-.8.1-.4.4-.7.7-.7.3 0 .6.4.5.8 0 .4-.4.7-.7.7z" />
      <path fill="#F1C9A5" d="M2.4 5.7c-.1-.4.2-.8.5-.9.3 0 .7.3.7.7.1.5-.1.8-.5.9-.3 0-.6-.3-.7-.7z" />
      <path fill="#E4B692" d="M6.7 5.3c0-1.6-.9-2.5-1.9-2.5v5.3c1 0 1.9-.8 1.9-2.8z" />
      <path
        fill="#4A4A4A"
        d="M6.5 6.6c-.1.3-.3.7-.6.7-.4 0-.7-.3-1.1-.3s-.8.3-1.2.3c-.3 0-.4-.4-.6-.7v-.5.7s.2.8.4 1c.2.2 1 .6 1.4.6.4 0 1.1-.4 1.4-.6.3-.2.4-1 .4-1v-.7l-.1.5z"
      />
      <path
        fill="#DADADA"
        d="M7.9 9.9c-.2-.5-1.3-.9-2.1-1.1 0 .6-.5 1-1.1 1s-1-.4-1.1-1c-.7.2-1.8.6-2 1.1-.3 1.1-.6 2.5-.6 2.5h7.5s-.2-1.5-.6-2.5z"
      />
      <path
        fill="#00B7A3"
        d="M1.1 12c-.1.3-.1.4-.1.4h7.5s0-.2-.1-.4H1.1zm.1-.4h7.2c0-.1 0-.3-.1-.4H1.2v.4zm.1-.8h6.9c0-.1-.1-.3-.1-.4H1.5c-.1.1-.1.2-.2.4zm3.4-1c-.2 0-.5-.1-.7-.3H1.9c-.1.1-.3.3-.3.4v.1H8v-.1c-.1-.1-.2-.3-.4-.4H5.5c-.2.2-.5.3-.8.3zm-2-.7h1c0-.1-.1-.2-.1-.3-.2.1-.6.2-.9.3zm3 0h1c-.2-.1-.6-.2-.9-.3 0 .1 0 .2-.1.3z"
      />
      <path
        fill="#00B7A3"
        d="M3.4 8.9c.1.6.6 1.1 1.4 1.1S6 9.5 6.1 8.9c-.1-.1-.2-.1-.3-.1 0 .6-.5 1-1.1 1s-1-.4-1.1-1c0 0-.1 0-.2.1z"
      />
      <path fill="#4A4A4A" d="M2.7 5.2s2-.4 3-1.2c.3.6.5 1.3 1 1.3C6.9 4 6.3 2.8 5 2.8s-2.2.7-2.3 2.4z" />
      <path
        fill="#F1C9A5"
        d="M13.6 10.8c-.5-.9-3.4-1.4-3.4-1.4s-2.9.5-3.4 1.4c-.3 1.2-.6 2.7-.6 2.7h8s-.2-1.7-.6-2.7z"
      />
      <path fill="#E4B692" d="M10.2 9.3s2.9.5 3.4 1.4c.4 1.1.6 2.7.6 2.7h-4V9.3z" />
      <path fill="#F1C9A5" d="M9.4 7.6H11v2.7H9.4V7.6z" />
      <path fill="#E4B692" d="M10.2 7.6h.8v2.7h-.8V7.6z" />
      <path opacity={0.1} fill="#DDAC8C" d="M9.4 8.8c.1.4.7.7 1.2.7.2 0 .3 0 .5-.1V7.6H9.4v1.2z" />
      <path fill="#F1C9A5" d="M12.2 5.9c0-1.7-.9-2.6-2.1-2.6S8 4.3 8 5.9s.9 3 2.1 3 2.1-1.3 2.1-3z" />
      <path fill="#E4B692" d="M11.9 7c-.4 0-.6-.5-.6-1s.4-.8.8-.8.6.5.6 1c-.1.5-.4.9-.8.8z" />
      <path fill="#F1C9A5" d="M7.7 6.3c-.1-.5.2-.9.6-1 .4 0 .7.3.8.8 0 .5-.3.9-.7.9-.3.1-.7-.3-.7-.7z" />
      <path fill="#E4B692" d="M12.2 5.9c0-1.7-.9-2.6-2.1-2.6v5.6c1.2 0 2.1-1.3 2.1-3z" />
      <path
        fill="#4A4A4A"
        d="M9.2 8.2s-.9-.7-.7-1.7c.2-1 .7-1.1.7-1.5.8 1 1.5 1.7 2.9 1.3.4.2-.1 1.4-.7 2C13 7.4 15 4 11 2.7 6.9 1.4 5.7 8 9.2 8.2z"
      />
      <path
        fill="#00B7A3"
        d="M10.2 4.3c1.1 0 1.9.8 2.1 1.8v-.4c0-1.2-1-2.2-2.2-2.2C9 3.6 8 4.5 8 5.7v.4c.2-1 1.1-1.8 2.2-1.8zM8.6 9.7c.3.2 1 .5 1.6.5.8 0 1.8-.4 1.8-.4h-.1c-.3-.1-.7-.2-.9-.3-.8.5-1.6 0-1.6 0-.3.1-.5.1-.8.2z"
      />
      <path
        fill="#DADADA"
        d="M13.6 10.8c-.2-.3-.6-.5-1.1-.8-.3 1-1.2 1.7-2.3 1.7s-2-.7-2.3-1.7c-.5.2-1 .5-1.1.8-.3 1.2-.6 2.7-.6 2.7h8s-.2-1.7-.6-2.7z"
      />
      <path
        fill="#00B7A3"
        d="M14.8 9.2c-.4-.2-1.1.2-1.6.1-.5 0-.8.3-1.1.2-.6-.1-.7.1-.7.1s-.1-.3.5-.2c.6.1 1-.2 1.2-.4.2-.2.9-.1.9-.1l-.3-.4c-.2 0-.6 0-.8.3-.2.3-.4.4-1 .3-.6 0-.9.4-.9.4l1 .3s.2.1.5.1.5-.2.9-.2c.5 0 1-.2 1.6 0l-.2-.5z"
      />
    </svg>
  );
};

SvgTargetingAudienceEmpty.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTargetingAudienceEmpty.displayName = 'TargetingAudienceEmpty';
export default SvgTargetingAudienceEmpty;
