import React, { useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'cropperjs';
import Button from '../Button';
import ActionPanel from '../ActionPanel';
// https://github.com/fengyuanchen/cropperjs/blob/v2/README.md
const defaultOptions = {
  dragMode: 'move',
  viewMode: 2,
  guides: false,
  movable: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: false
};
const ImageCropper = /*#__PURE__*/forwardRef((_ref, ref) => {
  let {
    title,
    src,
    alt,
    onCancel,
    onCrop,
    width,
    height,
    aspectRatio,
    isSaving,
    dts
  } = _ref;
  const cropperRef = React.useRef();
  const imageRef = React.useRef();
  React.useEffect(() => {
    if (!cropperRef.current) return;
    cropperRef.current.setAspectRatio(aspectRatio);
  }, [cropperRef, aspectRatio]);
  React.useEffect(() => {
    cropperRef.current = new Cropper(imageRef.current, {
      aspectRatio,
      ...defaultOptions
    });
    return () => {
      cropperRef.current.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useImperativeHandle(ref, () => ({
    getCropper: () => cropperRef
  }));
  const uploadButton = /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    onClick: () => onCrop(cropperRef.current.getData()),
    isLoading: isSaving,
    variant: "inverse"
  }, "Upload");
  return /*#__PURE__*/React.createElement(ActionPanel, {
    title: title,
    onClose: onCancel,
    actionButton: uploadButton,
    dts: dts
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
  isSaving: PropTypes.bool,
  dts: PropTypes.string
};
ImageCropper.defaultProps = {
  title: 'Image Upload',
  isSaving: false
};
export default ImageCropper;