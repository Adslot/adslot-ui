import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
const FileSticker = _ref => {
  let {
    onFileRemove,
    file
  } = _ref;
  const [showClose, setShowClose] = React.useState(false);
  const {
    name,
    path,
    isUploading
  } = file;
  const isImage = /\.(jpe?g|png)$/i.test(name);
  const onStickerRemove = () => {
    onFileRemove(file);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "aui--file-sticker",
    onMouseEnter: () => setShowClose(true),
    onMouseLeave: () => setShowClose(false)
  }, isImage && !isUploading ? /*#__PURE__*/React.createElement("img", {
    className: "aui--file-sticker-image",
    src: path,
    alt: ""
  }) : /*#__PURE__*/React.createElement("div", {
    className: "aui--file-sticker-file"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aui--file-sticker-file-icon"
  }), /*#__PURE__*/React.createElement("div", {
    className: "aui--file-sticker-file-name"
  }, name)), showClose && /*#__PURE__*/React.createElement("span", {
    className: "aui--file-sticker-close-button",
    onClick: onStickerRemove,
    role: "button"
  }), isUploading && /*#__PURE__*/React.createElement(Spinner, {
    className: "aui--file-sticker-spinner",
    size: "small"
  }));
};
export default FileSticker;
FileSticker.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string,
    isUploading: PropTypes.bool
  }),
  onFileRemove: PropTypes.func
};