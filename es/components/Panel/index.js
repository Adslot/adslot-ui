import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useCollapse } from '../../hooks/useCollapse';
const Panel = ({
  onClick,
  className,
  children,
  dts,
  icon,
  id,
  isCollapsed,
  title,
  animate = true
}) => {
  const onHeaderClick = () => {
    onClick(id);
  };
  const {
    height,
    containerRef,
    transitionState
  } = useCollapse({
    collapsed: isCollapsed,
    transitionMs: animate ? 250 : null
  });
  const classesCombined = classnames(['panel-component', {
    collapsed: isCollapsed,
    [transitionState]: transitionState
  }, className]);
  return /*#__PURE__*/React.createElement("div", {
    className: classesCombined,
    "data-test-selector": dts
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-component-header clearfix",
    onClick: onHeaderClick
  }, icon, title), /*#__PURE__*/React.createElement("div", {
    style: {
      height
    },
    className: classnames('panel-component-content-wrapper', {
      animate
    })
  }, /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: "panel-component-content"
  }, children)));
};
Panel.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  dts: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.node.isRequired,
  isCollapsed: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  animate: PropTypes.bool
};
export default Panel;