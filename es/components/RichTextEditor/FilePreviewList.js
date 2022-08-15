import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FileSticker from './FileSticker';

const FilePreviewList = _ref => {
  let {
    files,
    onFileRemove
  } = _ref;
  return _.isEmpty(files) ? null : /*#__PURE__*/React.createElement("div", {
    className: "aui--file-preview-list"
  }, _.map(files, (file, index) => /*#__PURE__*/React.createElement(FileSticker, {
    key: index,
    onFileRemove: onFileRemove,
    file: file
  })));
};

export default FilePreviewList;
FilePreviewList.propTypes = {
  files: PropTypes.object,
  onFileRemove: PropTypes.func
};