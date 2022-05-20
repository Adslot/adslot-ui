import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FileSticker from './FileSticker';

var FilePreviewList = function FilePreviewList(_ref) {
  var files = _ref.files,
      onFileRemove = _ref.onFileRemove;
  return _.isEmpty(files) ? null : /*#__PURE__*/React.createElement("div", {
    className: "aui--file-preview-list"
  }, _.map(files, function (file, index) {
    return /*#__PURE__*/React.createElement(FileSticker, {
      key: index,
      onFileRemove: onFileRemove,
      file: file
    });
  }));
};

export default FilePreviewList;
FilePreviewList.propTypes = {
  files: PropTypes.object,
  onFileRemove: PropTypes.func
};