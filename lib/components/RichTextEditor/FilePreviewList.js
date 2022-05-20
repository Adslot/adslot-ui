"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FileSticker = _interopRequireDefault(require("./FileSticker"));

var FilePreviewList = function FilePreviewList(_ref) {
  var files = _ref.files,
      onFileRemove = _ref.onFileRemove;
  return _lodash.default.isEmpty(files) ? null : /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--file-preview-list"
  }, _lodash.default.map(files, function (file, index) {
    return /*#__PURE__*/_react.default.createElement(_FileSticker.default, {
      key: index,
      onFileRemove: onFileRemove,
      file: file
    });
  }));
};

var _default = FilePreviewList;
exports.default = _default;
FilePreviewList.propTypes = {
  files: _propTypes.default.object,
  onFileRemove: _propTypes.default.func
};