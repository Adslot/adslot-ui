import _ from 'lodash';
import fastStatelessWrapper from 'components/adslotUi/fastStatelessWrapper';
import TreePickerNode from 'components/adslotUi/TreePickerNodeComponent';
import TreePickerPropTypes from 'helpers/propTypes/TreePickerPropTypes';
import React, { PropTypes } from 'react';
import { Empty, Grid, SvgSymbol } from 'alexandria-adslot';

const TreePickerNodeFast = fastStatelessWrapper(TreePickerNode, ['node.id', 'disabled', 'selected']);

const TreePickerGridComponent = ({
  disabled,
  emptySvgSymbol,
  expandNode,
  hideIcon,
  includeNode,
  itemType,
  nodes,
  nodeRenderer,
  removeNode,
  selected,
  valueFormatter,
  emptyText,
}) => (
  <Grid>
    {_.map(nodes, (node) =>
      <TreePickerNodeFast
        key={node.id}
        {...{
          disabled,
          expandNode,
          includeNode,
          itemType,
          node,
          nodeRenderer,
          removeNode,
          selected,
          valueFormatter,
        }}
      />
    )}
    {nodes ?
      <Empty
        collection={nodes}
        hideIcon={hideIcon}
        svgSymbol={emptySvgSymbol}
        text={emptyText}
      /> :
      null}
  </Grid>
);

TreePickerGridComponent.displayName = 'AdslotUiTreePickerGridComponent';

TreePickerGridComponent.propTypes = {
  disabled: PropTypes.bool,
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  emptyText: PropTypes.any.isRequired,
  expandNode: PropTypes.func,
  hideIcon: PropTypes.bool,
  includeNode: PropTypes.func,
  itemType: PropTypes.string.isRequired,
  nodes: PropTypes.arrayOf(TreePickerPropTypes.node),
  nodeRenderer: PropTypes.func,
  removeNode: PropTypes.func,
  selected: PropTypes.bool.isRequired,
  valueFormatter: PropTypes.func,
};

TreePickerGridComponent.defaultProps = {
  disabled: false,
  hideIcon: false,
};

export default TreePickerGridComponent;
