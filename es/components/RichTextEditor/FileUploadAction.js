import React from 'react';
import PropTypes from 'prop-types';
import ToolbarButton from './ToolbarButton';
const FileUploadAction = ({
  onFileUpload,
  fileFilter,
  disabled = false
}) => {
  const fileInputRef = React.useRef();
  const onFileChange = e => {
    if (e.target.files[0]) onFileUpload(e.target.files[0]);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ToolbarButton, {
    label: /*#__PURE__*/React.createElement("div", {
      className: "file-upload-button"
    }),
    onToggle: () => {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    },
    "aria-label": "Upload file",
    disabled: disabled
  }), /*#__PURE__*/React.createElement("input", {
    className: "file-upload-input",
    ref: fileInputRef,
    type: "file",
    onChange: onFileChange,
    accept: fileFilter,
    disabled: disabled
  }));
};
FileUploadAction.propTypes = {
  onFileUpload: PropTypes.func,
  fileFilter: PropTypes.string,
  disabled: PropTypes.bool
};
export default FileUploadAction;