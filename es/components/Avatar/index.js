import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
const baseClass = 'avatar-component';
const Avatar = _ref => {
  let {
    color,
    givenName,
    tooltip,
    image,
    surname
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: classnames([baseClass, {
      [`${baseClass}-${color}`]: color && !image
    }, {
      [`${baseClass}-image-placeholder`]: image
    }]),
    title: tooltip !== undefined ? tooltip : `${givenName || ''} ${surname || ''}`
  }, image ? /*#__PURE__*/React.createElement("img", {
    className: `${baseClass}-image`,
    src: image,
    alt: "presentation"
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "avatar-component-initials"
  }, `${_.head(givenName) || ''}${_.head(surname) || ''}`));
};
Avatar.propTypes = {
  /**
   * PropTypes.oneOf(['blue', 'green', 'red', 'orange', 'cyan', 'black'])
   */
  color: PropTypes.oneOf(['blue', 'green', 'red', 'orange', 'cyan', 'black']),
  givenName: PropTypes.string,
  tooltip: PropTypes.string,
  image: PropTypes.string,
  surname: PropTypes.string
};
export default Avatar;