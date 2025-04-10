import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classnames';
import { TreePickerProvider } from './TreePickerContext';
import TreePickerTree from './TreePickerTree';
import TreePickerHeader from './TreePickerHeader';
import TreePickerNode from './TreePickerNode';
import TreePickerNav from './TreePickerNav';
import TreePickerSearch from './TreePickerSearch';
const TreePicker = ({
  children,
  renderNode,
  className
}) => {
  const renderNodeWithKey = React.useCallback((node, index) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: node.id
  }, renderNode(node, index)), [renderNode]);
  return /*#__PURE__*/React.createElement(TreePickerProvider, {
    renderNode: renderNodeWithKey
  }, /*#__PURE__*/React.createElement("div", {
    className: cc('tree-picker', className)
  }, children));
};
TreePicker.propTypes = {
  children: PropTypes.node.isRequired,
  renderNode: PropTypes.func.isRequired,
  className: PropTypes.string
};
TreePicker.Tree = TreePickerTree;
TreePicker.Header = TreePickerHeader;
TreePicker.Node = TreePickerNode;
TreePicker.Nav = TreePickerNav;
TreePicker.Search = TreePickerSearch;
export default TreePicker;