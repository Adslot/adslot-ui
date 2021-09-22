import React from 'react';
import PropTypes from 'prop-types';
import ToolbarButton from './ToolbarButton';

const FileUploadAction = ({ onFileUpload, fileFilter }) => {
  const fileInputRef = React.useRef();

  const onFileChange = (e) => {
    if (e.target.files[0]) onFileUpload(e.target.files[0]);
  };

  return (
    <>
      <ToolbarButton
        label={<div data-testid="file-download-button" className="file-download-button" />}
        onToggle={() => {
          fileInputRef.current.value = '';
          fileInputRef.current.click();
        }}
      />
      <input
        data-testid="file-download-input"
        className="file-download-input"
        ref={fileInputRef}
        type="file"
        onChange={onFileChange}
        accept={fileFilter}
      />
    </>
  );
};

export default FileUploadAction;

FileUploadAction.propTypes = {
  onFileUpload: PropTypes.func,
  fileFilter: PropTypes.string,
};
