import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTargetingTechnologyEmpty = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 55 55"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        fill="#3E3E3F"
        d="M42.9 36.5c0 .9-.7 1.7-1.7 1.7H7.8c-.9 0-1.7-.7-1.7-1.7V13.1c0-.9.7-1.7 1.7-1.7h33.4c.9 0 1.7.7 1.7 1.7v23.4z"
      />
      <path fill="#E2E4E5" d="M19.5 38.2h10v4.3h-10z" />
      <path fill="#DADADA" d="M32.9 43.3c0 .5-.4.8-.8.8H17c-.5 0-.8-.4-.8-.8 0-.5.4-.8.8-.8h15c.5-.1.9.3.9.8z" />
      <path fill="#FFF" d="M42.9 36.5v-5H6.2v5c0 .9.7 1.7 1.7 1.7h33.4c.8 0 1.6-.8 1.6-1.7z" />
      <path
        fill="#CFD3D4"
        d="M24.5 37.2c-1.2 0-2.2-1-2.2-2.2 0-1.2 1-2.2 2.2-2.2 1.2 0 2.2 1 2.2 2.2.1 1.2-1 2.2-2.2 2.2zm0-3.4c-.6 0-1.1.5-1.1 1.1 0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.1-1.1-1.1z"
      />
      <path fill="#5B5C5F" d="M6.2 13.1v18.4h11.3l20-20H7.8c-.9-.1-1.6.7-1.6 1.6z" />
      <path
        fill="#FFF"
        d="M48 42c0 1.1-.9 2.1-2.1 2.1h-8.3c-1.1 0-2.1-.9-2.1-2.1V24c0-1.1.9-2.1 2.1-2.1H46c1.1 0 2.1.9 2.1 2.1v18z"
      />
      <path fill="#3E3E3F" d="M36.2 26.1h11.1V40H36.2z" />
      <path fill="#CFD3D4" d="M44.6 24.3c0 .2-.2.3-.3.3h-3.5c-.2 0-.3-.2-.3-.3 0-.2.2-.3.3-.3h3.5c.1 0 .3.1.3.3z" />
      <path fill="#FFF" d="M41.1 41.3h1.4v1.4h-1.4z" />
      <path fill="#5B5C5F" d="M47.3 27.7v-1.6H36.2v12.7z" />
      <circle fill="#CFD3D4" cx={39.4} cy={24.3} r={0.3} />
      <circle fill="#CFD3D4" cx={41.8} cy={42} r={1.4} />
    </svg>
  );
};

SvgTargetingTechnologyEmpty.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTargetingTechnologyEmpty.displayName = 'TargetingTechnologyEmpty';
export default SvgTargetingTechnologyEmpty;
