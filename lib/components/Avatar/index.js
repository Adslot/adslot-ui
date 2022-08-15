"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

const baseClass = 'avatar-component';

const Avatar = _ref => {
  let {
    color,
    givenName,
    tooltip,
    image,
    surname
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)([baseClass, {
      [`${baseClass}-${color}`]: color && !image
    }, {
      [`${baseClass}-image-placeholder`]: image
    }]),
    title: tooltip !== undefined ? tooltip : `${givenName || ''} ${surname || ''}`
  }, image ? /*#__PURE__*/_react.default.createElement("img", {
    className: `${baseClass}-image`,
    src: image,
    alt: "presentation"
  }) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "avatar-component-initials"
  }, `${_lodash.default.head(givenName) || ''}${_lodash.default.head(surname) || ''}`));
};

Avatar.propTypes = {
  /**
   * PropTypes.oneOf(['blue', 'green', 'red', 'orange', 'cyan', 'black'])
   */
  color: _propTypes.default.oneOf(['blue', 'green', 'red', 'orange', 'cyan', 'black']),
  givenName: _propTypes.default.string,
  tooltip: _propTypes.default.string,
  image: _propTypes.default.string,
  surname: _propTypes.default.string
};
var _default = Avatar;
exports.default = _default;