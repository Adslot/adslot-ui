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
          disabled,
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
  disabled: PropTypes.bool,
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  emptyText: PropTypes.string.isRequired,
  expandNode: PropTypes.func,
  includeNode: PropTypes.func,
  nodes: PropTypes.arrayOf(TreePickerPropTypes.node),
  removeNode: PropTypes.func,
  selected: PropTypes.bool.isRequired,
  valueFormatter: PropTypes.func,
};

TreePickerGridComponent.defaultProps = {
  disabled: false,
};

export default TreePickerGridComponent;
