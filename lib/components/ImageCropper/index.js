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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
const ImageCropper = /*#__PURE__*/(0, _react.forwardRef)(({
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
}, ref) => {
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
var _default = exports.default = ImageCropper;