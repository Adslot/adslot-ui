import _ from 'lodash';
import React, { PropTypes } from 'react';
import fastStatelessWrapper from 'components/adslotUi/fastStatelessWrapper';
import TreePickerNode from 'components/adslotUi/TreePicker/TreePickerNodeComponent';
import TreePickerPropTypes from 'helpers/propTypes/TreePickerPropTypes';
import Empty from 'components/alexandria/Empty';
import Grid from 'components/alexandria/Grid';
import GridRow from 'components/alexandria/GridRow';
import SvgSymbol from 'components/alexandria/SvgSymbol';

require('styles/adslotUi/TreePickerGrid.scss');

export const TreePickerNodeFast = fastStatelessWrapper(TreePickerNode, ['node.id', 'disabled', 'selected']);

const TreePickerGridComponent = ({
  disabled,
  emptySvgSymbol,
  expandNode,
  groupFormatter,
  hideIcon,
  includeNode,
  itemType,
  nodes,
  nodeRenderer,
  removeNode,
  selected,
  valueFormatter,
  emptyText,
}) => {
  const nodesByGroupLabel = _.groupBy(nodes, groupFormatter);
  return (
    <Grid>
      {_.map(nodesByGroupLabel, (groupedNodes, label) =>
        <div className="treepickergrid-component-group" key={_.kebabCase(label)}>
          {_.size(nodesByGroupLabel) > 1 ?
            <div className="treepickergrid-component-group-label">
              <GridRow dts={`group-label-${_.kebabCase(label)}`}>
                {label}
              </GridRow>
            </div> :
            null}
          {_.map(groupedNodes, (node) =>
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
        </div>
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
};

TreePickerGridComponent.displayName = 'AdslotUiTreePickerGridComponent';

TreePickerGridComponent.propTypes = {
  disabled: PropTypes.bool,
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  emptyText: PropTypes.any.isRequired,
  expandNode: PropTypes.func,
  groupFormatter: PropTypes.func,
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
  groupFormatter: () => 'Default Group',
};

export default TreePickerGridComponent;
