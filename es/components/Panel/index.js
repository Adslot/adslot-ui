import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
class Panel extends React.PureComponent {
  onHeaderClick = () => this.props.onClick(this.props.id);
  render() {
    const {
      className,
      children,
      dts,
      icon,
      isCollapsed,
      title
    } = this.props;
    const classesCombined = classnames(['panel-component', {
      collapsed: isCollapsed
    }, className]);
    return /*#__PURE__*/React.createElement("div", {
      className: classesCombined,
      "data-test-selector": dts
    }, /*#__PURE__*/React.createElement("div", {
      className: "panel-component-header clearfix",
      onClick: this.onHeaderClick
    }, icon, title), /*#__PURE__*/React.createElement("div", {
      className: "panel-component-content"
    }, children));
  }
}
Panel.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  dts: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.node.isRequired,
  isCollapsed: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node
};
export default Panel;