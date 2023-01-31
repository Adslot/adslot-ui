"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Spinner = _interopRequireDefault(require("../Spinner"));
const FileSticker = _ref => {
  let {
    onFileRemove,
    file
  } = _ref;
  const [showClose, setShowClose] = _react.default.useState(false);
  const {
    name,
    path,
    isUploading
  } = file;
  const isImage = /\.(jpe?g|png)$/i.test(name);
  const onStickerRemove = () => {
    onFileRemove(file);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--file-sticker",
    onMouseEnter: () => setShowClose(true),
    onMouseLeave: () => setShowClose(false)
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