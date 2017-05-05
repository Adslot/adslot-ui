import _ from 'lodash';
import React, { PropTypes } from 'react';

require('styles/alexandria/Avatar.scss');

const baseClass = 'avatar-component';
const AvatarComponent = ({ color, givenName, image, surname }) => (
  <div
    className={color ? `${baseClass} ${baseClass}-${color}` : baseClass}
    title={`${givenName || ''} ${surname || ''}`}
  >

    {image ? <img className={`${baseClass}-image`} src={image} role="presentation" /> : null}

    <div className="avatar-component-initials">
      {`${_.first(givenName) || ''}${_.first(surname) || ''}`}
    </div>

  </div>
);

AvatarComponent.displayName = 'AlexandriaAvatarComponent';

AvatarComponent.propTypes = {
  color: PropTypes.string,
  givenName: PropTypes.string,
  image: PropTypes.string,
  surname: PropTypes.string,
};

export default AvatarComponent;
