import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Popover from '../Popover';

var TextEllipsis = function TextEllipsis(_ref) {
  var popoverProps = _ref.popoverProps,
      children = _ref.children;
  var containerRef = React.useRef();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      truncated = _React$useState2[0],
      setTruncated = _React$useState2[1];

  React.useLayoutEffect(function () {
    var nextTruncateState = containerRef.current.scrollWidth > containerRef.current.clientWidth;

    if (truncated !== nextTruncateState) {
      setTruncated(nextTruncateState);
    }
  }, [truncated]);
  return /*#__PURE__*/React.createElement(Popover, Object.assign({}, popoverProps, truncated === false ? {
    triggers: 'disabled'
  } : {}, {
    popoverContent: children,
    className: "aui--text-ellipsis-wrapper"
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-ellipsis-component",
    ref: containerRef
  }, children));
};

TextEllipsis.propTypes = {
  children: PropTypes.node.isRequired,
  popoverProps: PropTypes.shape(_.pick(Popover.propTypes, ['placement', 'trigger']))
};
TextEllipsis.defaultProps = {
  popoverProps: {
    placement: 'top',
    trigger: 'hover'
  }
};
export default TextEllipsis;