"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderArrowStyles = exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactPopper = require("react-popper");

var _constants = require("./constants");

// default arrow position in pixel from the corresponding popover edge
const DEFAULT_ARROW_POSITION = 12;
/**
 *
 * @param {string} placement
 * @param {object} arrowStyles            user-defined arrow styles
 * @param {Element} container             anchor container
 */

const renderArrowStyles = function (placement, arrowStyles) {
  let container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  const horizontalPosition = _lodash.default.get(container, 'clientWidth') >= DEFAULT_ARROW_POSITION * 2 ? DEFAULT_ARROW_POSITION : null;
  const verticalPosition = _lodash.default.get(container, 'clientHeight') >= DEFAULT_ARROW_POSITION * 2 ? DEFAULT_ARROW_POSITION : null;
  let calculatedArrowStyles = {};

  switch (true) {
    case _lodash.default.includes(['bottom-start', 'top-start'], placement) && !_lodash.default.isNull(horizontalPosition):
      calculatedArrowStyles = {
        left: horizontalPosition
      };
      break;

    case _lodash.default.includes(['bottom-end', 'top-end'], placement) && !_lodash.default.isNull(horizontalPosition):
      calculatedArrowStyles = {
        left: 'auto',
        right: horizontalPosition
      };
      break;

    case _lodash.default.includes(['left-start', 'right-start'], placement) && !_lodash.default.isNull(verticalPosition):
      calculatedArrowStyles = {
        top: verticalPosition
      };
      break;

    case _lodash.default.includes(['left-end', 'right-end'], placement) && !_lodash.default.isNull(verticalPosition):
      calculatedArrowStyles = {
        top: 'auto',
        bottom: verticalPosition
      };
      break;

    default:
      calculatedArrowStyles = {};
  }

  return { ...calculatedArrowStyles,
    ...arrowStyles // let user override default configuration

  };
};

exports.renderArrowStyles = renderArrowStyles;

const Popper = _ref => {
  let {
    arrowStyles,
    dts,
    placement: popperPlacement,
    strategy,
    popoverClass,
    popoverContent,
    title,
    wrapperStyles,
    refElement,
    modifiers = [],
    popperRef
  } = _ref;

  const [popperElement, setPopperElement] = _react.default.useState(null);

  const [arrowElement, setArrowElement] = _react.default.useState(null);

  _react.default.useEffect(() => {
    if (popperElement && popperRef) popperRef(popperElement);
  }, [popperRef, popperElement]); // react-popper not using subsequent settings to overwrite preceding ones


  const defaultModifiers = [{
    name: 'arrow',
    options: {
      element: arrowElement
    }
  }];
  if (!_lodash.default.find(modifiers, {
    name: 'offset'
  })) defaultModifiers.push({
    name: 'offset',
    options: {
      offset: [0, 6]
    }
  });
  if (!_lodash.default.find(modifiers, {
    name: 'flip'
  })) defaultModifiers.push({
    name: 'flip',
    options: {
      altBoundary: true
    }
  });
  const {
    styles,
    attributes,
    update
  } = (0, _reactPopper.usePopper)(refElement, popperElement, {
    modifiers: defaultModifiers.concat(modifiers),
    placement: popperPlacement,
    strategy,
    ...wrapperStyles
  });
  const calculatedArrowStyles = renderArrowStyles(popperPlacement, arrowStyles, popperElement);
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    placement: popperPlacement // for test only
    ,
    className: popoverClass,
    ref: setPopperElement,
    style: { ...styles.popper,
      ...wrapperStyles
    }
  }, attributes.popper, {
    "data-test-selector": dts
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--popover-container"
  }, title ? /*#__PURE__*/_react.default.createElement("div", {
    className: "popover-title"
  }, title) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "popover-content"
  }, _lodash.default.isFunction(popoverContent) ? popoverContent({
    update
  }) : popoverContent)), /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: "aui--popover-arrow",
    "data-placement": _lodash.default.get(attributes, 'popper.data-popper-placement', popperPlacement)
  }, attributes.arrow, {
    ref: setArrowElement,
    style: { ...styles.arrow,
      ...calculatedArrowStyles
    }
  })));
};

Popper.propTypes = {
  arrowStyles: _propTypes.default.object,
  // eslint-disable-line react/forbid-prop-types
  dts: _propTypes.default.string,
  modifiers: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.arrayOf(_propTypes.default.object)]),
  // eslint-disable-line react/forbid-prop-types
  placement: _propTypes.default.oneOf(_constants.popoverPlacements),
  strategy: _propTypes.default.oneOf(_constants.popoverStrategies),
  popoverClass: _propTypes.default.string,
  popoverContent: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]).isRequired,
  refElement: _propTypes.default.instanceOf(Element),
  boundariesElement: _propTypes.default.instanceOf(Element),
  title: _propTypes.default.string,
  wrapperStyles: _propTypes.default.object,
  // eslint-disable-line react/forbid-prop-types
  popperRef: _propTypes.default.func
};
var _default = Popper;
exports.default = _default;