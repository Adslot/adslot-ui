import PropTypes from 'prop-types';
import React from 'react';
import { expandDts } from '../../lib/utils';
import Popover from '../Popover';

var HelpIconPopover = function HelpIconPopover(_ref) {
  var children = _ref.children,
      id = _ref.id,
      placement = _ref.placement;
  return /*#__PURE__*/React.createElement("div", Object.assign({}, expandDts(id), {
    className: "help-icon-popover-component"
  }), /*#__PURE__*/React.createElement(Popover, {
    triggers: ['hover'],
    placement: placement,
    popoverContent: children
  }, /*#__PURE__*/React.createElement("div", {
    className: "help-icon-popover-component-trigger"
  })));
};

HelpIconPopover.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
};
HelpIconPopover.defaultProps = {
  placement: 'right'
};
export default HelpIconPopover;