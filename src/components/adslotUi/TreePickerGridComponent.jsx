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
  itemType,
  nodes,
  nodeRenderer,
  removeNode,
  selected,
  valueFormatter,
  emptyText,
  hideIcon,
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
        svgSymbol={emptySvgSymbol}
        text={emptyText}
        hideIcon={hideIcon}
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
  includeNode: PropTypes.func,
  itemType: PropTypes.string.isRequired,
  nodes: PropTypes.arrayOf(TreePickerPropTypes.node),
  nodeRenderer: PropTypes.func,
  removeNode: PropTypes.func,
  selected: PropTypes.bool.isRequired,
  valueFormatter: PropTypes.func,
  hideIcon: PropTypes.bool,
};

TreePickerGridComponent.defaultProps = {
  disabled: false,
  hideIcon: true,
};

export default TreePickerGridComponent;
