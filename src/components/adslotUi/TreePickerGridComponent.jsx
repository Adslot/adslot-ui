import _ from 'lodash';
import fastStatelessWrapper from 'components/adslotUi/fastStatelessWrapper';
import TreePickerNode from 'components/adslotUi/TreePickerNodeComponent';
import TreePickerPropTypes from 'helpers/propTypes/TreePickerPropTypes';
import React, { PropTypes } from 'react';
import { Empty, Grid, SvgSymbol } from 'alexandria-adslot';

const TreePickerNodeFast = fastStatelessWrapper(TreePickerNode, ['node.id', 'disabled', 'selected']);

const getRootTypeLabel = ({ rootTypes, rootTypeId }) => {
  const rootTypeMatchingId = _.find(rootTypes, { id: rootTypeId });
  if (rootTypeMatchingId) return rootTypeMatchingId.label;
};

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

  // from TreePickerSelectedComponent
  // nodeGrouper,
  rootTypes,
  selectedNodesByRootType,
}) => {

  return (
    <div>
      {_.map(selectedNodesByRootType, (val, rootTypeId) => {
        const rootTypeLabel = getRootTypeLabel({ rootTypes, rootTypeId });

        return (
          <Grid key={rootTypeId}>
            <GridRow type="header">
              <GridCell stretch>{rootTypeLabel}</GridCell>
            </GridRow>

            {_.map(selectedNodesByRootType[rootTypeId], (node) =>
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
          </Grid>
        );
      })}
      {nodes ?
        <Empty
          collection={nodes}
          svgSymbol={emptySvgSymbol}
          text="hardcoded empty state."
        /> :
        null}
    </div>
  );
};

// TODO: revert empty text above..

TreePickerGridComponent.displayName = 'AdslotUiTreePickerGridComponent';

TreePickerGridComponent.propTypes = {
  disabled: PropTypes.bool,
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  emptyText: PropTypes.any.isRequired,
  expandNode: PropTypes.func,
  includeNode: PropTypes.func,
  itemType: PropTypes.string.isRequired,
  nodes: PropTypes.arrayOf(TreePickerPropTypes.node),
  // nodeGrouper: PropTypes.array,
  nodeRenderer: PropTypes.func,
  removeNode: PropTypes.func,
  selected: PropTypes.bool.isRequired,
  valueFormatter: PropTypes.func,

  rootTypes: PropTypes.arrayOf(TreePickerPropTypes.rootType).isRequired,
  selectedNodesByRootType: PropTypes.shape().isRequired,
};

TreePickerGridComponent.defaultProps = {
  disabled: false,

  rootTypes: [],
  selectedNodesByRootType: {},
};

export default TreePickerGridComponent;
