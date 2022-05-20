import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

var FileSticker = function FileSticker(_ref) {
  var onFileRemove = _ref.onFileRemove,
      file = _ref.file;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      showClose = _React$useState2[0],
      setShowClose = _React$useState2[1];

  var name = file.name,
      path = file.path,
      isUploading = file.isUploading;
  var isImage = /\.(jpe?g|png)$/i.test(name);

  var onStickerRemove = function onStickerRemove() {
    onFileRemove(file);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "aui--file-sticker",
    onMouseEnter: function onMouseEnter() {
      return setShowClose(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setShowClose(false);
    }
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