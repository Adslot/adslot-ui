"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var baseClass = 'avatar-component';

var Avatar = function Avatar(_ref) {
  var color = _ref.color,
      givenName = _ref.givenName,
      tooltip = _ref.tooltip,
      image = _ref.image,
      surname = _ref.surname;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)([baseClass, (0, _defineProperty2.default)({}, "".concat(baseClass, "-").concat(color), color && !image), (0, _defineProperty2.default)({}, "".concat(baseClass, "-image-placeholder"), image)]),
    title: tooltip !== undefined ? tooltip : "".concat(givenName || '', " ").concat(surname || '')
  }, image ? /*#__PURE__*/_react.default.createElement("img", {
    className: "".concat(baseClass, "-image"),
    src: image,
    alt: "presentation"
  }) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "avatar-component-initials"
  }, "".concat(_lodash.default.head(givenName) || '').concat(_lodash.default.head(surname) || '')));
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