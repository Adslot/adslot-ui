"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _cropperjs = _interopRequireDefault(require("cropperjs"));
var _Button = _interopRequireDefault(require("../Button"));
var _ActionPanel = _interopRequireDefault(require("../ActionPanel"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
const ImageCropper = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
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
  const cropperRef = _react.default.useRef();
  const imageRef = _react.default.useRef();
  _react.default.useEffect(() => {
    if (!cropperRef.current) return;
    cropperRef.current.setAspectRatio(aspectRatio);
  }, [cropperRef, aspectRatio]);
  _react.default.useEffect(() => {
    cropperRef.current = new _cropperjs.default(imageRef.current, {
      aspectRatio,
      ...defaultOptions
    });
    return () => {
      cropperRef.current.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _react.useImperativeHandle)(ref, () => ({
    getCropper: () => cropperRef
  }));
  const uploadButton = /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "primary",
    onClick: () => onCrop(cropperRef.current.getData()),
    isLoading: isSaving,
    variant: "inverse"
  }, "Upload");
  return /*#__PURE__*/_react.default.createElement(_ActionPanel.default, {
    title: title,
    onClose: onCancel,
    actionButton: uploadButton,
    dts: dts
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "image-cropper",
    style: {
      width: width || '100%',
      height: height || '100%'
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: src,
    ref: imageRef,
    alt: alt
  })));
});
ImageCropper.propTypes = {
  title: _propTypes.default.string,
  src: _propTypes.default.string.isRequired,
  alt: _propTypes.default.string,
  onCrop: _propTypes.default.func.isRequired,
  onCancel: _propTypes.default.func.isRequired,
  width: _propTypes.default.number,
  height: _propTypes.default.number,
  aspectRatio: _propTypes.default.number,
  isSaving: _propTypes.default.bool,
  dts: _propTypes.default.string
};
ImageCropper.defaultProps = {
  title: 'Image Upload',
  isSaving: false
};
var _default = ImageCropper;
exports.default = _default;