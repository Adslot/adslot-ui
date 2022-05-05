import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import TreePickerNode from '../Node';
import Empty from '../../Empty';
import Grid from '../../Grid';
import GridRow from '../../Grid/Row';
import Spinner from '../../Spinner';
import { TreePickerPropTypesNode } from '../../../prop-types/TreePickerPropTypes';

var TreePickerGrid = function TreePickerGrid(_ref) {
  var disabled = _ref.disabled,
      emptySvgSymbol = _ref.emptySvgSymbol,
      expandNode = _ref.expandNode,
      groupFormatter = _ref.groupFormatter,
      hideIcon = _ref.hideIcon,
      includeNode = _ref.includeNode,
      itemType = _ref.itemType,
      isLoading = _ref.isLoading,
      nodes = _ref.nodes,
      nodeRenderer = _ref.nodeRenderer,
      removeNode = _ref.removeNode,
      selected = _ref.selected,
      valueFormatter = _ref.valueFormatter,
      emptyText = _ref.emptyText,
      displayGroupHeader = _ref.displayGroupHeader;

  var nodesByGroupLabel = _.groupBy(nodes, groupFormatter);

  var emptySvgIcon = hideIcon ? null : emptySvgSymbol;
  return /*#__PURE__*/React.createElement(Grid, null, isLoading ? /*#__PURE__*/React.createElement("div", {
    className: "loading-nodes-container"
  }, /*#__PURE__*/React.createElement(Spinner, null), /*#__PURE__*/React.createElement("p", null, "Loading\u2026")) : _.map(nodesByGroupLabel, function (groupedNodes, label) {
    return /*#__PURE__*/React.createElement("div", {
      className: "treepickergrid-component-group",
      key: _.kebabCase(label)
    }, displayGroupHeader ? /*#__PURE__*/React.createElement("div", {
      className: "treepickergrid-component-group-label"
    }, /*#__PURE__*/React.createElement(GridRow, {
      dts: "group-label-".concat(_.kebabCase(label))
    }, label)) : null, _.map(groupedNodes, function (node) {
      return /*#__PURE__*/React.createElement(TreePickerNode, {
        key: node.id,
        disabled: disabled,
        expandNode: expandNode,
        includeNode: includeNode,
        itemType: itemType,
        node: node,
        nodeRenderer: nodeRenderer,
        removeNode: removeNode,
        selected: selected,
        valueFormatter: valueFormatter
      });
    }));
  }), nodes && !isLoading ? /*#__PURE__*/React.createElement(Empty, {
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
  groupFormatter: function groupFormatter() {
    return 'Default Group';
  },
  hideIcon: false,
  isLoading: false
};
export default TreePickerGrid;