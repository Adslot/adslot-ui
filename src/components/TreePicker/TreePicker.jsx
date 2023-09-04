import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classnames';
import { TreePickerProvider } from './TreePickerContext';
import TreePickerTree from './TreePickerTree';
import TreePickerHeader from './TreePickerHeader';
import TreePickerNode from './TreePickerNode';
import TreePickerNav from './TreePickerNav';
import TreePickerSearch from './TreePickerSearch';

import './TreePicker.css';

const TreePicker = ({ children, renderNode, className }) => {
  const renderNodeWithKey = React.useCallback(
    (node, index) => <React.Fragment key={node.id}>{renderNode(node, index)}</React.Fragment>,
    [renderNode]
  );

  return (
    <TreePickerProvider renderNode={renderNodeWithKey}>
      <div className={cc('tree-picker', className)}>{children}</div>
    </TreePickerProvider>
  );
};

TreePicker.propTypes = {
  children: PropTypes.node.isRequired,
  renderNode: PropTypes.func.isRequired,
  className: PropTypes.string,
};

TreePicker.Tree = TreePickerTree;
TreePicker.Header = TreePickerHeader;
TreePicker.Node = TreePickerNode;
TreePicker.Nav = TreePickerNav;
TreePicker.Search = TreePickerSearch;

export default TreePicker;
