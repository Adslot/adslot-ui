import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgSignupConversation = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        fill="#546A79"
        d="M30 67.5c0 2.8 2.2 5 5 5h30l15 15v-15h5c2.8 0 5-2.2 5-5v-40c0-2.8-2.2-5-5-5H35c-2.8 0-5 2.2-5 5v40z"
      />
      <path
        fill="#F0F1F1"
        d="M70 57.5c0 2.8-2.2 5-5 5H35l-15 15v-15h-5c-2.8 0-5-2.2-5-5v-40c0-2.8 2.2-5 5-5h50c2.8 0 5 2.2 5 5v40z"
      />
      <path
        fill="#FFF"
        d="M69.2 14.7c-.9-1.4-2.4-2.2-4.2-2.2H15c-2.8 0-5 2.2-5 5v40c0 2.8 2.2 5 5 5h5v1.4l49.2-49.2z"
      />
      <circle fill="#546A79" cx={25} cy={37.5} r={5} />
      <circle fill="#546A79" cx={40} cy={37.5} r={5} />
      <circle fill="#546A79" cx={55} cy={37.5} r={5} />
    </svg>
  );
};

SvgSignupConversation.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgSignupConversation.displayName = 'SignupConversation';
export default SvgSignupConversation;
