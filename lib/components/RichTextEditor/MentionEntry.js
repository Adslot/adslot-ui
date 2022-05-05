"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Avatar = _interopRequireDefault(require("../Avatar"));

var _excluded = ["mention"];

var MentionEntry = function MentionEntry(_ref // internal props used by mention plugin
) {
  var _ref$mention = _ref.mention,
      name = _ref$mention.name,
      title = _ref$mention.title,
      avatar = _ref$mention.avatar,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var fullName = name.split(' ');
  var givenName = fullName[0];
  var surname = fullName.length > 1 ? fullName[fullName.length - 1] : '';
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: (0, _classnames.default)(['aui--mention-entry', {
      'aui--mention-entry__is-focused': props.isFocused
    }])
  }, _lodash.default.pick(props, ['onMouseDown', 'onMouseUp', 'onMouseEnter'])), /*#__PURE__*/_react.default.createElement("div", {
    className: "mention-entry--container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mention-entry--container__left"
  }, /*#__PURE__*/_react.default.createElement(_Avatar.default, {
    givenName: givenName,
    surname: surname,
    image: avatar
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "mention-entry--container__right"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mention-entry--name"
  }, name), /*#__PURE__*/_react.default.createElement("div", {
    className: "mention-entry--title"
  }, title))));
};

var _default = MentionEntry;
exports.default = _default;
MentionEntry.propTypes = {
  className: _propTypes.default.string,
  mention: _propTypes.default.shape({
    name: _propTypes.default.string,
    title: _propTypes.default.string,
    avatar: _propTypes.default.string
  }),
  onMouseDown: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  isFocused: _propTypes.default.bool
};