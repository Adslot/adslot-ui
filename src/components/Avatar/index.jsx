import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const baseClass = 'avatar-component';
const Avatar = ({ color, givenName, tooltip, image, surname }) => (
  <div
    data-testid="avatar-wrapper"
    className={classnames([
      baseClass,
      { [`${baseClass}-${color}`]: color && !image },
      { [`${baseClass}-image-placeholder`]: image },
    ])}
    title={tooltip !== undefined ? tooltip : `${givenName || ''} ${surname || ''}`}
  >
    {image ? <img data-testid="avatar-image" className={`${baseClass}-image`} src={image} alt="presentation" /> : null}

    <div data-testid="avatar-initials" className="avatar-component-initials">{`${_.head(givenName) || ''}${
      _.head(surname) || ''
    }`}</div>
  </div>
);

Avatar.propTypes = {
  /**
   * PropTypes.oneOf(['blue', 'green', 'red', 'orange', 'cyan', 'black'])
   */
  color: PropTypes.oneOf(['blue', 'green', 'red', 'orange', 'cyan', 'black']),
  givenName: PropTypes.string,
  tooltip: PropTypes.string,
  image: PropTypes.string,
  surname: PropTypes.string,
};

export default Avatar;
