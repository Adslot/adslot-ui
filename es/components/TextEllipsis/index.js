import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Popover from '../Popover';

const TextEllipsis = _ref => {
  let {
    popoverProps,
    children
  } = _ref;
  const containerRef = React.useRef();
  const [truncated, setTruncated] = React.useState(false);
  React.useLayoutEffect(() => {
    const nextTruncateState = containerRef.current.scrollWidth > containerRef.current.clientWidth;

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