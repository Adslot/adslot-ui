import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const baseClass = 'avatar-component';
const Avatar = ({ color, givenName, tooltip, image, surname }) => (
  <div
    data-testid="avatar-wrapper"
    className={color ? `${baseClass} ${baseClass}-${color}` : baseClass}
    title={tooltip !== undefined ? tooltip : `${givenName || ''} ${surname || ''}`}
  >
    {image ? <img data-testid="avatar-image" className={`${baseClass}-image`} src={image} alt="presentation" /> : null}

    <div data-testid="avatar-initials" className="avatar-component-initials">{`${_.head(givenName) || ''}${_.head(
      surname
    ) || ''}`}</div>
  </div>
);

Avatar.displayName = 'AvatarComponent';

Avatar.propTypes = {
  /**
   * PropTypes.oneOf(['blue', 'green', 'red', 'orange', 'cyan'])
   */
  color: PropTypes.oneOf(['blue', 'green', 'red', 'orange', 'cyan']),
  givenName: PropTypes.string,
  tooltip: PropTypes.string,
  image: PropTypes.string,
  surname: PropTypes.string,
};

export default Avatar;
