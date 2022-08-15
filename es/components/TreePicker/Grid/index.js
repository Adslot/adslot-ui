import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import TreePickerNode from '../Node';
import Empty from '../../Empty';
import Grid from '../../Grid';
import GridRow from '../../Grid/Row';
import Spinner from '../../Spinner';
import { TreePickerPropTypesNode } from '../../../prop-types/TreePickerPropTypes';

const TreePickerGrid = _ref => {
  let {
    disabled,
    emptySvgSymbol,
    expandNode,
    groupFormatter,
    hideIcon,
    includeNode,
    itemType,
    isLoading,
    nodes,
    nodeRenderer,
    removeNode,
    selected,
    valueFormatter,
    emptyText,
    displayGroupHeader
  } = _ref;

  const nodesByGroupLabel = _.groupBy(nodes, groupFormatter);

  const emptySvgIcon = hideIcon ? null : emptySvgSymbol;
  return /*#__PURE__*/React.createElement(Grid, null, isLoading ? /*#__PURE__*/React.createElement("div", {
    className: "loading-nodes-container"
  }, /*#__PURE__*/React.createElement(Spinner, null), /*#__PURE__*/React.createElement("p", null, "Loading\u2026")) : _.map(nodesByGroupLabel, (groupedNodes, label) => /*#__PURE__*/React.createElement("div", {
    className: "treepickergrid-component-group",
    key: _.kebabCase(label)
  }, displayGroupHeader ? /*#__PURE__*/React.createElement("div", {
    className: "treepickergrid-component-group-label"
  }, /*#__PURE__*/React.createElement(GridRow, {
    dts: `group-label-${_.kebabCase(label)}`
  }, label)) : null, _.map(groupedNodes, node => /*#__PURE__*/React.createElement(TreePickerNode, {
    key: node.id,
    disabled,
    expandNode,
    includeNode,
    itemType,
    node,
    nodeRenderer,
    removeNode,
    selected,
    valueFormatter
  })))), nodes && !isLoading ? /*#__PURE__*/React.createElement(Empty, {
    collection: nodes,
    icon: emptySvgIcon,
    text: emptyText
  }) : null);
};

TreePickerGrid.propTypes = {
  disabled: PropTypes.bool,
  emptySvgSymbol: PropTypes.node,
  emptyText: PropTypes.node.isRequired,
  expandNode: PropTypes.func,
  groupFormatter: PropTypes.func,
  hideIcon: PropTypes.bool,
  includeNode: PropTypes.func,
  itemType: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  nodes: PropTypes.arrayOf(TreePickerPropTypesNode),
  nodeRenderer: PropTypes.func,
  removeNode: PropTypes.func,
  selected: PropTypes.bool.isRequired,
  valueFormatter: PropTypes.func,
  displayGroupHeader: PropTypes.bool
};
TreePickerGrid.defaultProps = {
  disabled: false,
  displayGroupHeader: true,
  groupFormatter: () => 'Default Group',
  hideIcon: false,
  isLoading: false
};
export default TreePickerGrid;