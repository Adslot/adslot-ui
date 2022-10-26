import React from 'react';
import PropTypes from 'prop-types';
import ToolbarButton from './ToolbarButton';

const FileUploadAction = _ref => {
  let {
    onFileUpload,
    fileFilter
  } = _ref;
  const fileInputRef = React.useRef();

  const onFileChange = e => {
    if (e.target.files[0]) onFileUpload(e.target.files[0]);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ToolbarButton, {
    label: /*#__PURE__*/React.createElement("div", {
      className: "file-download-button"
    }),
    onToggle: () => {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    },
    "aria-label": "Download file"
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