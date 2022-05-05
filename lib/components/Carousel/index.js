"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactSlick = _interopRequireDefault(require("react-slick"));

var baseClass = 'aui--carousel-component';

var Carousel = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children;
  return /*#__PURE__*/_react.default.createElement(_reactSlick.default, Object.assign({}, props, {
    ref: ref,
    className: (0, _classnames.default)(baseClass, className)
  }), children);
});

Carousel.propTypes = {
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  autoplay: _propTypes.default.bool,
  variableWidth: _propTypes.default.bool,
  autoplaySpeed: _propTypes.default.number,
  slidesToShow: _propTypes.default.number,
  dots: _propTypes.default.bool
};
Carousel.defaultProps = {
  autoplay: true,
  variableWidth: true,
  autoplaySpeed: 10000,
  slidesToShow: 2,
  dots: true
};
var SWIPE_DELTA = 3;

var usePreventCarouselSwipeClicks = function usePreventCarouselSwipeClicks() {
  var _React$useState = _react.default.useState({}),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      mousePos = _React$useState2[0],
      setMousePos = _React$useState2[1];

  var onMouseDownCapture = function onMouseDownCapture(e) {
    setMousePos({
      clientX: e.clientX,
      clientY: e.clientY
    });
  };

  var onClickCapture = function onClickCapture(e) {
    var deltaX = Math.abs(mousePos.clientX - e.clientX);
    var deltaY = Math.abs(mousePos.clientY - e.clientY);

    if (deltaX > SWIPE_DELTA || deltaY > SWIPE_DELTA) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return {
    onMouseDownCapture: onMouseDownCapture,
    onClickCapture: onClickCapture
  };
};
/**
 * A hook to prevent child click handlers from firing immediately after swiping the Carousel
 *
 * @returns {object} - to be spread onto any carousel items with `onClick` handlers
 */


Carousel.usePreventSwipeClicks = usePreventCarouselSwipeClicks;
var _default = Carousel;
exports.default = _default;