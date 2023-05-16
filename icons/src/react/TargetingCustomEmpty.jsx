import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTargetingCustomEmpty = (props) => {
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
      <path fill="#F1C8A4" d="M9.3 10.7c-.5-1-3.8-1.6-3.8-1.6s-3.3.6-3.8 1.6c-.4 1.3-.7 3-.7 3h9s-.2-1.8-.7-3z" />
      <path fill="#E3B590" d="M5.5 9.1s3.3.6 3.8 1.6c.5 1.2.7 3 .7 3H5.5V9.1z" />
      <path fill="#F1C8A4" d="M4.6 7.1h1.8v3H4.6v-3z" />
      <path fill="#E3B590" d="M5.5 7.1h.9v3h-.9v-3z" />
      <path opacity={0.1} fill="#DCAB8B" d="M4.6 8.5c.1.5.8.7 1.3.7.2 0 .3 0 .5-.1v-2H4.6v1.4z" />
      <path fill="#F1C8A4" d="M7.8 5.2c0-1.9-1-2.9-2.3-2.9S3.2 3.4 3.2 5.2c0 2.5 1 3.4 2.3 3.4s2.3-.9 2.3-3.4z" />
      <path fill="#E3B590" d="M7.5 6.5c-1-.7-.9-1.3.2-1.8.9.7.8 1.3-.2 1.8-.5 0 .4.1 0 0z" />
      <path fill="#F1C8A4" d="M2.7 5.7c-.1-.5.2-1 .6-1 1.1.5 1.2 1.1.3 1.9-.5 0-.9-.4-.9-.9z" />
      <path fill="#E3B590" d="M7.8 5.2c0-1.9-1-2.9-2.3-2.9v6.3c1.3 0 2.3-.9 2.3-3.4z" />
      <path
        fill="#4B4A4B"
        d="M7.6 6.8c-.2.3-.4.8-.8.8s-.8-.4-1.3-.4-.9.4-1.4.4c-.4 0-.6-.4-.7-.8l-.1-.7v.8s.2.9.5 1.2c.3.3 1.2.7 1.7.7s1.4-.4 1.6-.7c.3-.2.5-1.2.5-1.2v-.3h-.1l.1.2z"
      />
      <path
        fill="#DAD9D8"
        d="M9.3 10.7c-.3-.6-1.5-1-2.5-1.3 0 .7-.6 1.2-1.3 1.2s-1.2-.5-1.3-1.2c-1 .3-2.2.7-2.5 1.3-.4 1.3-.7 3-.7 3h9s-.2-1.8-.7-3z"
      />
      <path
        fill="#01B5A1"
        d="M1.1 13.2c-.1.3-.1.5-.1.5h9s0-.2-.1-.5H1.1zm.1-.5h8.6c0-.2-.1-.3-.1-.5H1.3c0 .2-.1.4-.1.5zm.2-.9h8.2c0-.2-.1-.3-.1-.5h-8c0 .1 0 .3-.1.5zm4.1-1.2c-.3 0-.6-.1-.9-.3H2.1c-.2.1-.3.3-.4.4v.1h7.7v-.1c-.1-.1-.2-.3-.4-.4H6.3c-.2.2-.5.3-.8.3zM3 9.8h1.3c0-.1-.1-.2-.1-.4-.4.1-.8.2-1.2.4zm3.7 0H8c-.5-.2-.9-.3-1.2-.4 0 .1-.1.3-.1.4z"
      />
      <path
        fill="#01B5A1"
        d="M3.8 9.5c.1.8.8 1.4 1.6 1.4s1.6-.6 1.7-1.4c-.1 0-.2-.1-.3-.1 0 .7-.6 1.2-1.3 1.2s-1.2-.5-1.3-1.2c-.1 0-.2.1-.4.1z"
      />
      <path fill="#4B4A4B" d="M3.1 5s2.3-.5 3.6-1.5c.3.8.5 1.7 1.1 1.7.3-1.6-.5-2.9-2-2.9S3.1 3 3.1 5z" />
      <path fill="#FFF" d="M10.4 10.8c-4 0-4-6.2 0-6.2 4.1 0 4.1 6.2 0 6.2z" />
      <path
        fill="#176581"
        d="m14.8 11.3-1.4-1.4-.2.2-.8-.8c-.1.1-.2.3-.4.4l.8.8-.2.2 1.4 1.4c.2.2.5.2.7 0 .4-.3.4-.6.1-.8z"
      />
      <path fill="#176581" d="M10.4 5.1c3.4 0 3.3 5.2 0 5.2s-3.3-5.2 0-5.2z" />
      <circle fill="#DAD9D8" cx={10.4} cy={7.7} r={2.1} />
    </svg>
  );
};

SvgTargetingCustomEmpty.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTargetingCustomEmpty.displayName = 'TargetingCustomEmpty';
export default SvgTargetingCustomEmpty;
