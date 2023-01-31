import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
const defaultComponentClass = 'tag-component';
export const ActionButton = _ref => {
  let {
    onAction,
    id,
    actionIcon
  } = _ref;
  return /*#__PURE__*/React.createElement("span", {
    className: "action-button",
    onClick: () => onAction(id)
  }, actionIcon || /*#__PURE__*/React.createElement("span", {
    className: "action-icon"
  }, "\u2715"));
};
ActionButton.propTypes = {
  id: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  actionIcon: PropTypes.node
};
const Tag = _ref2 => {
  let {
    children,
    inverse,
    id,
    onAction,
    accent,
    className,
    actionIcon,
    dts: customDts
  } = _ref2;
  const classes = classnames([defaultComponentClass, {
    [`${defaultComponentClass}-inverse`]: inverse,
    [`${defaultComponentClass}-accent accent-${accent}`]: accent,
    [`${defaultComponentClass}-actionable`]: onAction
  }, className]);
  const dts = customDts || `tag-${id}`;
  return /*#__PURE__*/React.createElement("span", {
    className: classes,
    "data-test-selector": dts
  }, children, onAction ? /*#__PURE__*/React.createElement(ActionButton, {
    onAction,
    id,
    actionIcon
  }) : null);
};
Tag.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  accent: PropTypes.string,
  className: PropTypes.string,
  inverse: PropTypes.bool,
  onAction: PropTypes.func,
  actionIcon: PropTypes.node,
  dts: PropTypes.string
};
Tag.defaultProps = {
  id: 'default'
};
export default Tag;