import React from 'react';
import PropTypes from 'prop-types';
import ToolbarButton from './ToolbarButton';

var FileUploadAction = function FileUploadAction(_ref) {
  var onFileUpload = _ref.onFileUpload,
      fileFilter = _ref.fileFilter;
  var fileInputRef = React.useRef();

  var onFileChange = function onFileChange(e) {
    if (e.target.files[0]) onFileUpload(e.target.files[0]);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ToolbarButton, {
    label: /*#__PURE__*/React.createElement("div", {
      className: "file-download-button"
    }),
    onToggle: function onToggle() {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  }), /*#__PURE__*/React.createElement("input", {
    className: "file-download-input",
    ref: fileInputRef,
    type: "file",
    onChange: onFileChange,
    accept: fileFilter
  }));
};

export default FileUploadAction;
FileUploadAction.propTypes = {
  onFileUpload: PropTypes.func,
  fileFilter: PropTypes.string
};