import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FileSticker from './FileSticker';

const FilePreviewList = ({ files, onFileRemove, disabled }) =>
  _.isEmpty(files) ? null : (
    <div data-testid="file-preview-list" className="aui--file-preview-list">
      {_.map(files, (file, index) => (
        <FileSticker key={index} onFileRemove={onFileRemove} file={file} disabled={disabled} />
      ))}
    </div>
  );

export default FilePreviewList;

FilePreviewList.propTypes = {
  files: PropTypes.object,
  onFileRemove: PropTypes.func,
  disabled: PropTypes.bool,
};
