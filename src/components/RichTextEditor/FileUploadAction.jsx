import React from 'react';
import PropTypes from 'prop-types';
import ToolbarButton from './ToolbarButton';

const FileUploadAction = ({ onFileUpload, fileFilter, disabled }) => {
  const fileInputRef = React.useRef();

  const onFileChange = (e) => {
    if (e.target.files[0]) onFileUpload(e.target.files[0]);
  };

  return (
    <>
      <ToolbarButton
        label={<div data-testid="file-upload-button" className="file-upload-button" />}
        onToggle={() => {
          fileInputRef.current.value = '';
          fileInputRef.current.click();
        }}
        aria-label="Upload file"
        disabled={disabled}
      />
      <input
        data-testid="file-upload-input"
        className="file-upload-input"
        ref={fileInputRef}
        type="file"
        onChange={onFileChange}
        accept={fileFilter}
        disabled={disabled}
      />
    </>
  );
};

FileUploadAction.defaultProps = {
  disabled: false,
};

FileUploadAction.propTypes = {
  onFileUpload: PropTypes.func,
  fileFilter: PropTypes.string,
  disabled: PropTypes.bool,
};

export default FileUploadAction;
