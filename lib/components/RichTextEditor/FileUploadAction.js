"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ToolbarButton = _interopRequireDefault(require("./ToolbarButton"));
const FileUploadAction = ({
  onFileUpload,
  fileFilter,
  disabled = false
}) => {
  const fileInputRef = _react.default.useRef();
  const onFileChange = e => {
    if (e.target.files[0]) onFileUpload(e.target.files[0]);
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ToolbarButton.default, {
    label: /*#__PURE__*/_react.default.createElement("div", {
      className: "file-upload-button"
    }),
    onToggle: () => {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    },
    "aria-label": "Upload file",
    disabled: disabled
  }), /*#__PURE__*/_react.default.createElement("input", {
    className: "file-upload-input",
    ref: fileInputRef,
    type: "file",
    onChange: onFileChange,
    accept: fileFilter,
    disabled: disabled
  }));
};
FileUploadAction.propTypes = {
  onFileUpload: _propTypes.default.func,
  fileFilter: _propTypes.default.string,
  disabled: _propTypes.default.bool
};
var _default = exports.default = FileUploadAction;