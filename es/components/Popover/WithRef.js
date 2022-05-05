import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Popper from './Popper';
import { themes, popoverPlacements, popoverStrategies } from './constants';

var WithRefM = function WithRefM(_ref) {
  var theme = _ref.theme,
      title = _ref.title,
      dts = _ref.dts,
      popoverClassNames = _ref.popoverClassNames,
      popoverContent = _ref.popoverContent,
      refElement = _ref.refElement,
      modifiers = _ref.modifiers,
      wrapperStyles = _ref.wrapperStyles,
      placement = _ref.placement,
      strategy = _ref.strategy,
      isOpen = _ref.isOpen,
      arrowStyles = _ref.arrowStyles,
      getContainer = _ref.getContainer,
      popperRef = _ref.popperRef;
  var themeClass = _.includes(themes, theme) ? "popover-".concat(theme) : 'popover-light';
  var popoverClass = classnames('aui--popover-wrapper', themeClass, popoverClassNames);
  var boundariesElement = getContainer ? getContainer() : document.body;
  if (!isOpen) return null;
  return /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement(Popper, {
    refElement: refElement,
    popoverClass: popoverClass,
    wrapperStyles: wrapperStyles,
    dts: dts,
    title: title,
    popoverContent: popoverContent,
    boundariesElement: boundariesElement,
    arrowStyles: arrowStyles,
    placement: placement,
    strategy: strategy,
    modifiers: modifiers,
    popperRef: popperRef
  }), boundariesElement);
};

var WithRef = /*#__PURE__*/React.memo(WithRefM);
WithRef.propTypes = {
  refElement: PropTypes.instanceOf(HTMLElement),
  title: PropTypes.string,
  theme: PropTypes.oneOf(themes),
  popoverClassNames: PropTypes.string,
  getContainer: PropTypes.func,
  arrowStyles: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  wrapperStyles: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  modifiers: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  // eslint-disable-line react/forbid-prop-types
  placement: PropTypes.oneOf(popoverPlacements),
  strategy: PropTypes.oneOf(popoverStrategies),
  popoverContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  isOpen: PropTypes.bool,
  popperRef: PropTypes.func,
  dts: PropTypes.string
};
WithRef.defaultProps = {
  theme: 'light',
  placement: 'auto'
};
export default WithRef;