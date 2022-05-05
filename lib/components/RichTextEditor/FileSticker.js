"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Spinner = _interopRequireDefault(require("../Spinner"));

var FileSticker = function FileSticker(_ref) {
  var onFileRemove = _ref.onFileRemove,
      file = _ref.file;

  var _React$useState = _react.default.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      showClose = _React$useState2[0],
      setShowClose = _React$useState2[1];

  var name = file.name,
      path = file.path,
      isUploading = file.isUploading;
  var isImage = /\.(jpe?g|png)$/i.test(name);

  var onStickerRemove = function onStickerRemove() {
    onFileRemove(file);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--file-sticker",
    onMouseEnter: function onMouseEnter() {
      return setShowClose(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setShowClose(false);
    }
  }, isImage && !isUploading ? /*#__PURE__*/_react.default.createElement("img", {
    className: "aui--file-sticker-image",
    src: path,
    alt: ""
  }) : /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--file-sticker-file"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--file-sticker-file-icon"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--file-sticker-file-name"
  }, name)), showClose && /*#__PURE__*/_react.default.createElement("span", {
    className: "aui--file-sticker-close-button",
    onClick: onStickerRemove,
    role: "button"
  }), isUploading && /*#__PURE__*/_react.default.createElement(_Spinner.default, {
    className: "aui--file-sticker-spinner",
    size: "small"
  }));
};

var _default = FileSticker;
exports.default = _default;
FileSticker.propTypes = {
  file: _propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    name: _propTypes.default.string.isRequired,
    path: _propTypes.default.string,
    isUploading: _propTypes.default.bool
  }),
  onFileRemove: _propTypes.default.func
};