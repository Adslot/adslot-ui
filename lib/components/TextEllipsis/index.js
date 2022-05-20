"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = _interopRequireDefault(require("lodash"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Popover = _interopRequireDefault(require("../Popover"));

var TextEllipsis = function TextEllipsis(_ref) {
  var popoverProps = _ref.popoverProps,
      children = _ref.children;

  var containerRef = _react.default.useRef();

  var _React$useState = _react.default.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      truncated = _React$useState2[0],
      setTruncated = _React$useState2[1];

  _react.default.useLayoutEffect(function () {
    var nextTruncateState = containerRef.current.scrollWidth > containerRef.current.clientWidth;

    if (truncated !== nextTruncateState) {
      setTruncated(nextTruncateState);
    }
  }, [truncated]);

  return /*#__PURE__*/_react.default.createElement(_Popover.default, Object.assign({}, popoverProps, truncated === false ? {
    triggers: 'disabled'
  } : {}, {
    popoverContent: children,
    className: "aui--text-ellipsis-wrapper"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "text-ellipsis-component",
    ref: containerRef
  }, children));
};

TextEllipsis.propTypes = {
  children: _propTypes.default.node.isRequired,
  popoverProps: _propTypes.default.shape(_lodash.default.pick(_Popover.default.propTypes, ['placement', 'trigger']))
};
TextEllipsis.defaultProps = {
  popoverProps: {
    placement: 'top',
    trigger: 'hover'
  }
};
var _default = TextEllipsis;
exports.default = _default;