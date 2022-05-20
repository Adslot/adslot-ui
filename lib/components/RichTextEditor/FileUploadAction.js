"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ToolbarButton = _interopRequireDefault(require("./ToolbarButton"));

var FileUploadAction = function FileUploadAction(_ref) {
  var onFileUpload = _ref.onFileUpload,
      fileFilter = _ref.fileFilter;

  var fileInputRef = _react.default.useRef();

  var onFileChange = function onFileChange(e) {
    if (e.target.files[0]) onFileUpload(e.target.files[0]);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ToolbarButton.default, {
    label: /*#__PURE__*/_react.default.createElement("div", {
      className: "file-download-button"
    }),
    onToggle: function onToggle() {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  }), /*#__PURE__*/_react.default.createElement("input", {
    className: "file-download-input",
    ref: fileInputRef,
    type: "file",
    onChange: onFileChange,
    accept: fileFilter
  }));
};

var _default = FileUploadAction;
exports.default = _default;
FileUploadAction.propTypes = {
  onFileUpload: _propTypes.default.func,
  fileFilter: _propTypes.default.string
};