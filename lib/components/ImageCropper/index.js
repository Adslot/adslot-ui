"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _cropperjs = _interopRequireDefault(require("cropperjs"));

var _Button = _interopRequireDefault(require("../Button"));

var _ActionPanel = _interopRequireDefault(require("../ActionPanel"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
var ImageCropper = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var title = _ref.title,
      src = _ref.src,
      alt = _ref.alt,
      onCancel = _ref.onCancel,
      onCrop = _ref.onCrop,
      width = _ref.width,
      height = _ref.height,
      aspectRatio = _ref.aspectRatio,
      isSaving = _ref.isSaving;

  var cropperRef = _react.default.useRef();

  var imageRef = _react.default.useRef();

  _react.default.useEffect(function () {
    if (!cropperRef.current) return;
    cropperRef.current.setAspectRatio(aspectRatio);
  }, [cropperRef, aspectRatio]);

  _react.default.useEffect(function () {
    cropperRef.current = new _cropperjs.default(imageRef.current, _objectSpread({
      aspectRatio: aspectRatio
    }, defaultOptions));
    return function () {
      cropperRef.current.destroy();
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getCropper: function getCropper() {
        return cropperRef;
      }
    };
  });

  var uploadButton = /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "primary",
    onClick: function onClick() {
      return onCrop(cropperRef.current.getData());
    },
    isLoading: isSaving,
    inverse: true
  }, "Upload");

  return /*#__PURE__*/_react.default.createElement(_ActionPanel.default, {
    title: title,
    onClose: onCancel,
    actionButton: uploadButton
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
  isSaving: _propTypes.default.bool
};
ImageCropper.defaultProps = {
  title: 'Image Upload',
  isSaving: false
};
var _default = ImageCropper;
exports.default = _default;