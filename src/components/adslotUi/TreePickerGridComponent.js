import _ from 'lodash';
import fastStatelessWrapper from 'components/adslotUi/fastStatelessWrapper';
import TreePickerNode from 'components/adslotUi/TreePickerNodeComponent';
import TreePickerPropTypes from 'helpers/propTypes/TreePickerPropTypes';
import React, { PropTypes } from 'react';
import { Empty, Grid, SvgSymbol } from 'alexandria-adslot';

const TreePickerNodeFast = fastStatelessWrapper(TreePickerNode, ['node.id', 'selected']);

const TreePickerGridComponent = ({
  emptySvgSymbol,
  expandNode,
  includeNode,
  nodes,
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
          expandNode,
          includeNode,
          node,
          removeNode,
          selected,
          valueFormatter,
        }}
      />
    )}
    {nodes ?
      <Empty
        collection={nodes}
        svgSymbol={emptySvgSymbol}
        text={emptyText}
      /> :
      null}
  </Grid>
);

TreePickerGridComponent.displayName = 'AdslotUiTreePickerGridComponent';

TreePickerGridComponent.propTypes = {
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  emptyText: PropTypes.string.isRequired,
  expandNode: PropTypes.func,
  includeNode: PropTypes.func,
  nodes: PropTypes.arrayOf(TreePickerPropTypes.node),
  removeNode: PropTypes.func,
  selected: PropTypes.bool.isRequired,
  valueFormatter: PropTypes.func,
};

export default TreePickerGridComponent;
