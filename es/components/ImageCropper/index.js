import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import React, { useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'cropperjs';
import Button from '../Button';
import ActionPanel from '../ActionPanel';
// https://github.com/fengyuanchen/cropperjs/blob/v2/README.md
var defaultOptions = {
  dragMode: 'move',
  viewMode: 2,
  guides: false,
  movable: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: false
};
var ImageCropper = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var title = _ref.title,
      src = _ref.src,
      alt = _ref.alt,
      onCancel = _ref.onCancel,
      onCrop = _ref.onCrop,
      width = _ref.width,
      height = _ref.height,
      aspectRatio = _ref.aspectRatio,
      isSaving = _ref.isSaving;
  var cropperRef = React.useRef();
  var imageRef = React.useRef();
  React.useEffect(function () {
    if (!cropperRef.current) return;
    cropperRef.current.setAspectRatio(aspectRatio);
  }, [cropperRef, aspectRatio]);
  React.useEffect(function () {
    cropperRef.current = new Cropper(imageRef.current, _objectSpread({
      aspectRatio: aspectRatio
    }, defaultOptions));
    return function () {
      cropperRef.current.destroy();
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useImperativeHandle(ref, function () {
    return {
      getCropper: function getCropper() {
        return cropperRef;
      }
    };
  });
  var uploadButton = /*#__PURE__*/React.createElement(Button, {
    theme: "primary",
    onClick: function onClick() {
      return onCrop(cropperRef.current.getData());
    },
    isLoading: isSaving,
    inverse: true
  }, "Upload");
  return /*#__PURE__*/React.createElement(ActionPanel, {
    title: title,
    onClose: onCancel,
    actionButton: uploadButton
  }, /*#__PURE__*/React.createElement("div", {
    className: "image-cropper",
    style: {
      width: width || '100%',
      height: height || '100%'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    ref: imageRef,
    alt: alt
  })));
});
ImageCropper.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onCrop: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  aspectRatio: PropTypes.number,
  isSaving: PropTypes.bool
};
ImageCropper.defaultProps = {
  title: 'Image Upload',
  isSaving: false
};
export default ImageCropper;