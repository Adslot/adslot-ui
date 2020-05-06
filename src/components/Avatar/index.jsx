import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const baseClass = 'avatar-component';
const Avatar = ({ color, givenName, tooltip, image, surname }) => (
  <div
    className={color ? `${baseClass} ${baseClass}-${color}` : baseClass}
    title={tooltip !== undefined ? tooltip : `${givenName || ''} ${surname || ''}`}
  >
    {image ? <img className={`${baseClass}-image`} src={image} alt="presentation" /> : null}

    <div className="avatar-component-initials">{`${_.head(givenName) || ''}${_.head(surname) || ''}`}</div>
  </div>
);

Avatar.displayName = 'AvatarComponent';

Avatar.propTypes = {
  color: PropTypes.string,
  givenName: PropTypes.string,
  tooltip: PropTypes.string,
  image: PropTypes.string,
  surname: PropTypes.string,
};

export default Avatar;
