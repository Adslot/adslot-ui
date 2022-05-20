import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
var baseClass = 'avatar-component';

var Avatar = function Avatar(_ref) {
  var color = _ref.color,
      givenName = _ref.givenName,
      tooltip = _ref.tooltip,
      image = _ref.image,
      surname = _ref.surname;
  return /*#__PURE__*/React.createElement("div", {
    className: classnames([baseClass, _defineProperty({}, "".concat(baseClass, "-").concat(color), color && !image), _defineProperty({}, "".concat(baseClass, "-image-placeholder"), image)]),
    title: tooltip !== undefined ? tooltip : "".concat(givenName || '', " ").concat(surname || '')
  }, image ? /*#__PURE__*/React.createElement("img", {
    className: "".concat(baseClass, "-image"),
    src: image,
    alt: "presentation"
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "avatar-component-initials"
  }, "".concat(_.head(givenName) || '').concat(_.head(surname) || '')));
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