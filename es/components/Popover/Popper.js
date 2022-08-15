import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { usePopper } from 'react-popper';
import { popoverPlacements, popoverStrategies } from './constants'; // default arrow position in pixel from the corresponding popover edge

const DEFAULT_ARROW_POSITION = 12;
/**
 *
 * @param {string} placement
 * @param {object} arrowStyles            user-defined arrow styles
 * @param {Element} container             anchor container
 */

export const renderArrowStyles = function (placement, arrowStyles) {
  let container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  const horizontalPosition = _.get(container, 'clientWidth') >= DEFAULT_ARROW_POSITION * 2 ? DEFAULT_ARROW_POSITION : null;
  const verticalPosition = _.get(container, 'clientHeight') >= DEFAULT_ARROW_POSITION * 2 ? DEFAULT_ARROW_POSITION : null;
  let calculatedArrowStyles = {};

  switch (true) {
    case _.includes(['bottom-start', 'top-start'], placement) && !_.isNull(horizontalPosition):
      calculatedArrowStyles = {
        left: horizontalPosition
      };
      break;

    case _.includes(['bottom-end', 'top-end'], placement) && !_.isNull(horizontalPosition):
      calculatedArrowStyles = {
        left: 'auto',
        right: horizontalPosition
      };
      break;

    case _.includes(['left-start', 'right-start'], placement) && !_.isNull(verticalPosition):
      calculatedArrowStyles = {
        top: verticalPosition
      };
      break;

    case _.includes(['left-end', 'right-end'], placement) && !_.isNull(verticalPosition):
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
  const [popperElement, setPopperElement] = React.useState(null);
  const [arrowElement, setArrowElement] = React.useState(null);
  React.useEffect(() => {
    if (popperElement && popperRef) popperRef(popperElement);
  }, [popperRef, popperElement]); // react-popper not using subsequent settings to overwrite preceding ones

  const defaultModifiers = [{
    name: 'arrow',
    options: {
      element: arrowElement
    }
  }];
  if (!_.find(modifiers, {
    name: 'offset'
  })) defaultModifiers.push({
    name: 'offset',
    options: {
      offset: [0, 6]
    }
  });
  if (!_.find(modifiers, {
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
  } = usePopper(refElement, popperElement, {
    modifiers: defaultModifiers.concat(modifiers),
    placement: popperPlacement,
    strategy,
    ...wrapperStyles
  });
  const calculatedArrowStyles = renderArrowStyles(popperPlacement, arrowStyles, popperElement);
  return /*#__PURE__*/React.createElement("div", Object.assign({
    placement: popperPlacement // for test only
    ,
    className: popoverClass,
    ref: setPopperElement,
    style: { ...styles.popper,
      ...wrapperStyles
    }
  }, attributes.popper, {
    "data-test-selector": dts
  }), /*#__PURE__*/React.createElement("div", {
    className: "aui--popover-container"
  }, title ? /*#__PURE__*/React.createElement("div", {
    className: "popover-title"
  }, title) : null, /*#__PURE__*/React.createElement("div", {
    className: "popover-content"
  }, _.isFunction(popoverContent) ? popoverContent({
    update
  }) : popoverContent)), /*#__PURE__*/React.createElement("div", Object.assign({
    className: "aui--popover-arrow",
    "data-placement": _.get(attributes, 'popper.data-popper-placement', popperPlacement)
  }, attributes.arrow, {
    ref: setArrowElement,
    style: { ...styles.arrow,
      ...calculatedArrowStyles
    }
  })));
};

Popper.propTypes = {
  arrowStyles: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  dts: PropTypes.string,
  modifiers: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  // eslint-disable-line react/forbid-prop-types
  placement: PropTypes.oneOf(popoverPlacements),
  strategy: PropTypes.oneOf(popoverStrategies),
  popoverClass: PropTypes.string,
  popoverContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  refElement: PropTypes.instanceOf(Element),
  boundariesElement: PropTypes.instanceOf(Element),
  title: PropTypes.string,
  wrapperStyles: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  popperRef: PropTypes.func
};
export default Popper;