import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import fastStatelessWrapper from 'adslot-ui/fastStatelessWrapper';
import TreePickerNode from 'adslot-ui/TreePicker/Node';
import Empty from 'alexandria/Empty';
import Grid from 'alexandria/Grid';
import GridRow from 'alexandria/Grid/Row';
import SvgSymbol from 'alexandria/SvgSymbol';
import Spinner from 'alexandria/Spinner';
import TreePickerPropTypes from '../../../prop-types/TreePickerPropTypes';

require('./styles.scss');

export const TreePickerNodeFast = fastStatelessWrapper(TreePickerNode, ['node.id', 'disabled', 'selected']);

const TreePickerGridComponent = ({
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
  displayGroupHeader,
}) => {
  const nodesByGroupLabel = _.groupBy(nodes, groupFormatter);
  return (
    <Grid>
      {isLoading ?
        <div className="loading-nodes-container">
          <Spinner /><p>Loading…</p>
        </div>
      : _.map(nodesByGroupLabel, (groupedNodes, label) => (
        <div className="treepickergrid-component-group" key={_.kebabCase(label)}>
          {(displayGroupHeader) ?
            <div className="treepickergrid-component-group-label">
              <GridRow dts={`group-label-${_.kebabCase(label)}`}>
                {label}
              </GridRow>
            </div> :
            null
          }
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
      ))}
      {nodes && !isLoading ?
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
  emptyText: PropTypes.node.isRequired,
  expandNode: PropTypes.func,
  groupFormatter: PropTypes.func,
  hideIcon: PropTypes.bool,
  includeNode: PropTypes.func,
  itemType: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  nodes: PropTypes.arrayOf(TreePickerPropTypes.node),
  nodeRenderer: PropTypes.func,
  removeNode: PropTypes.func,
  selected: PropTypes.bool.isRequired,
  valueFormatter: PropTypes.func,
  displayGroupHeader: PropTypes.bool,
};

TreePickerGridComponent.defaultProps = {
  disabled: false,
  displayGroupHeader: true,
  groupFormatter: () => 'Default Group',
  hideIcon: false,
  isLoading: false,
};

export default TreePickerGridComponent;
