import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgSurveyInverse = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="#fff"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M86.9 3.6H76.1V1.4c0-1.8-2.7-1.8-2.7 0v1.8H59.9V1.4c0-1.8-2.7-1.8-2.7 0v1.8H43.7V1.4c0-1.8-2.7-1.8-2.7 0v1.8H27.5V1.4c0-1.8-2.7-1.8-2.7 0v1.8H13.1c-1.8.4-3.6 1.8-3.6 4.1v89.5c0 1.4 1.8 3.2 3.6 3.2h73.8c1.8 0 3.6-1.8 3.6-3.6V7.3c0-2.3-1.8-3.7-3.6-3.7zM74.3 21.4c.9 0 1.4-.5 1.4-1.4v-3.6c3.6 1.4 2.2 7.3-1.4 7.3-4 0-4.9-5.5-1.3-7.3V20c0 .5.9 1.4 1.3 1.4zm-16.2 0c.9 0 1.4-.5 1.4-1.4v-3.6c3.6 1.4 2.2 7.3-1.4 7.3-4 0-5-5.5-1.4-7.3V20c.1.5.5 1.4 1.4 1.4zm-16.2 0c.9 0 1.4-.5 1.4-1.4v-3.6c3.6 1.4 2.2 7.3-1.4 7.3-4 0-5.4-5.9-1.8-7.3V20c0 .5.9 1.4 1.8 1.4zm-16.6 0c.9 0 1.4-.5 1.4-1.4v-3.6c3.6 1.4 2.2 7.3-1.4 7.3-4.1 0-5-5.5-1.4-7.3V20c0 .5.5 1.4 1.4 1.4zm58 71.3H16.7V10.5h7.2v2.7c-7.2 1.8-6.3 13.2 1.4 13.2s9-11.4 1.4-13.2v-2.7h13.5v2.7C33 15 34.4 26.4 42 26.4s9-11.4 1.4-13.2v-2.7h13.5v2.7c-7.2 1.8-6.3 13.2 1.4 13.2s9-11.4 1.4-13.2v-2.7H73v2.7c-7.2 1.8-6.3 13.2 1.3 13.2s9-11.4 1.3-13.2v-2.7h7.2v82.3h.5z" />
      <path d="M74.8 75H37.9c-1.8 0-1.8 2.7 0 2.7h36.9c1.8 0 1.8-2.7 0-2.7zm0-17.7H37.9c-1.8 0-1.8 2.7 0 2.7h36.9c1.8 0 1.8-2.7 0-2.7zm0-17.8H37.9c-1.8 0-1.8 2.7 0 2.7h36.9c1.8.1 1.8-2.7 0-2.7zm-44.6-3.1h-6.3c-.9 0-1.4.5-1.4 1.4v6.4c0 .9.5 1.4 1.4 1.4h6.3c.9 0 1.4-.5 1.4-1.4v-6.4c0-1-.5-1.4-1.4-1.4zm0 17.7h-6.3c-.9 0-1.4.5-1.4 1.4v6.4c0 .9.5 1.4 1.4 1.4h6.3c.9 0 1.4-.5 1.4-1.4v-6.4c0-.5-.5-1.4-1.4-1.4zm0 17.7h-6.3c-.9 0-1.4.5-1.4 1.4v6.4c0 .9.5 1.4 1.4 1.4h6.3c.9 0 1.4-.5 1.4-1.4v-6.4c0-.5-.5-1.4-1.4-1.4z" />
    </svg>
  );
};

SvgSurveyInverse.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgSurveyInverse.displayName = 'SurveyInverse';
export default SvgSurveyInverse;
