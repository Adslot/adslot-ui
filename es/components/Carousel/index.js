import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
var baseClass = 'aui--carousel-component';
var Carousel = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children;
  return /*#__PURE__*/React.createElement(Slider, Object.assign({}, props, {
    ref: ref,
    className: classNames(baseClass, className)
  }), children);
});
Carousel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  autoplay: PropTypes.bool,
  variableWidth: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  slidesToShow: PropTypes.number,
  dots: PropTypes.bool
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
  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
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
export default Carousel;