import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMemberAdd = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="#5a5a5a"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M17.1 47.7c2.2 0 5.3-.5 7.1-2.7.4-.5.8-1 1.1-1.4 2.2 4.3 6.4 7.3 9.6 7.3 3.5 0 7.6-3 9.6-7.3.3.4.7.9 1.1 1.4 1.8 2.2 4.8 2.7 7.1 2.7 2.1 0 6-.6 6-1.7 0-.1 0-.5-.6-.6-.3-.1-.6-.1-1.6 0-1.2 0-2.4-1.7-3.5-4.3.2 0 .3.1.5.1 1.5 0 2.8-.7 3.4-1.1.4-.3 1.7-1.1 1.7-2 0-.5-.5-1-1.8-.6h-.2c-2.1 0-5.2-8.3-6.8-14.5 0-.1-.1-.2-.1-.4v-.1C48.2 15.9 42.3 11 35.2 11s-13 4.9-14.5 11.5v.1c0 .1-.1.2-.1.4-1.6 6.2-4.7 14.5-6.8 14.5h-.2c-1.3-.4-1.8.1-1.8.6 0 1.1 2.6 3.1 5 3.1.2 0 .3-.1.4-.1-1.1 2.6-2.4 4.3-3.6 4.3h-.8c-.3 0-1.2 0-1.2.7-.5 1 3.4 1.6 5.5 1.6zM6.7 89.2H63c.4-1.9.9-3.9 1.4-6.1 1.9-12.3-1.6-19.3-4.8-23.1-3-3.5-7.1-5.5-11.2-5.5h-2l-11.6 28-11.5-28h-1.6c-4.3 0-8.5 2-11.6 5.5C7 63.6 3.6 70.6 5.4 83.2c.4 2.2.9 4.1 1.3 6z" />
      <circle cx={72.9} cy={50} r={22} />
      <circle cx={72.8} cy={50} r={18.6} fill="#FFF" />
      <path d="M83.7 47.4h-8.1v-8.5c0-.7-.6-1.3-1.3-1.3h-2.7c-.7 0-1.3.6-1.3 1.3v8.5H62c-.7 0-1.3.6-1.3 1.3v2.5c0 .7.6 1.3 1.3 1.3h8.1v8.6c0 .7.6 1.3 1.3 1.3h2.7c.7 0 1.3-.6 1.3-1.3v-8.6h8.1c.7 0 1.3-.6 1.3-1.3v-2.5c.2-.7-.4-1.3-1.1-1.3z" />
    </svg>
  );
};

SvgMemberAdd.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMemberAdd.displayName = 'MemberAdd';
export default SvgMemberAdd;
