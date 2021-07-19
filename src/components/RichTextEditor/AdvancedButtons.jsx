import React from 'react';
import PropTypes from 'prop-types';
import ToolbarButton from './ToolbarButton';

const AdvancedButtons = ({ mentionEnabled, onMentionToggle, fileUploadEnabled, onFileUpload, fileFilter }) => {
  const fileInputRef = React.createRef();

  const onFileChange = (e) => {
    if (e.target.files[0]) onFileUpload(e.target.files[0]);
  };

  return (
    <>
      {mentionEnabled && (
        <ToolbarButton label={<div className="mention-button">@</div>} onToggle={() => onMentionToggle()} />
      )}
      {fileUploadEnabled && (
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
            ref={fileInputRef}
            type="file"
            onChange={onFileChange}
            accept={fileFilter}
            style={{ display: 'none' }}
          />
        </>
      )}
    </>
  );
};

export default AdvancedButtons;

AdvancedButtons.propTypes = {
  mentionEnabled: PropTypes.bool,
  onMentionToggle: PropTypes.func,
  fileUploadEnabled: PropTypes.bool,
  onFileUpload: PropTypes.func,
  onFileRemove: PropTypes.func,
  fileFilter: PropTypes.string,
};
