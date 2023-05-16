import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgEmailSpeech = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 70 78.3"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <g stroke="#2c3850" strokeWidth={0.5} strokeMiterlimit={10}>
        <path
          d="M54.2 9.7H16.1c-3.8 0-6.8 3-6.8 6.8v38.1c0 3.8 3 6.8 6.8 6.8H47l8.1 9.9v-10c3.3-.5 5.9-3.3 5.9-6.7V16.4c0-3.7-3-6.7-6.8-6.7z"
          fill="#e6f7ff"
        />
        <g fill="#fff">
          <path d="M17.2 24.4h35.7v23.3H17.2z" />
          <path d="m17.2 24.4 17.9 15.8 17.8-15.8z" />
        </g>
      </g>
    </svg>
  );
};

SvgEmailSpeech.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgEmailSpeech.displayName = 'EmailSpeech';
export default SvgEmailSpeech;
