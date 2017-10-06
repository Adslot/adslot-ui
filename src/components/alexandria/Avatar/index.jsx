import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const baseClass = 'avatar-component';
class Avatar extends PureComponent {
  render() {
    const { color, givenName, tooltip, image, surname } = this.props;

    return (
      <div
        className={color ? `${baseClass} ${baseClass}-${color}` : baseClass}
        title={tooltip !== undefined ? tooltip : `${givenName || ''} ${surname || ''}`}
      >

        {image ? <img className={`${baseClass}-image`} src={image} role="presentation" /> : null}

        <div className="avatar-component-initials">
          {`${_.first(givenName) || ''}${_.first(surname) || ''}`}
        </div>

      </div>
    );
  }
}

Avatar.displayName = 'AlexandriaAvatarComponent';

Avatar.propTypes = {
  color: PropTypes.string,
  givenName: PropTypes.string,
  tooltip: PropTypes.string,
  image: PropTypes.string,
  surname: PropTypes.string,
};

export default Avatar;
