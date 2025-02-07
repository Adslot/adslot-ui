import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import TreePickerNode from '../Node';
import Empty from '../../Empty';
import Grid from '../../Grid';
import GridRow from '../../Grid/Row';
import Spinner from '../../Spinner';
import { TreePickerPropTypesNode } from '../../../prop-types/TreePickerPropTypes';
import './styles.css';

const TreePickerGrid = ({
  disabled = false,
  emptySvgSymbol,
  expandNode,
  groupFormatter = () => 'Default Group',
  hideIcon = false,
  includeNode,
  itemType,
  isLoading = false,
  nodes,
  nodeRenderer,
  removeNode,
  selected,
  valueFormatter,
  emptyText,
  displayGroupHeader = true,
  addNodePopoverInfoProps,
  removeNodePopoverInfoProps,
}) => {
  const nodesByGroupLabel = _.groupBy(nodes, groupFormatter);
  const emptySvgIcon = hideIcon ? null : emptySvgSymbol;

  return (
    <Grid>
      {isLoading ? (
        <div className="loading-nodes-container">
          <Spinner />
          <p>Loading…</p>
        </div>
      ) : (
        _.map(nodesByGroupLabel, (groupedNodes, label) => (
          <div
            data-testid="treepicker-grid-node-wrapper"
            className="treepickergrid-component-group"
            key={_.kebabCase(label)}
          >
            {displayGroupHeader ? (
              <div className="treepickergrid-component-group-label">
                <GridRow dts={`group-label-${_.kebabCase(label)}`}>{label}</GridRow>
              </div>
            ) : null}
            {_.map(groupedNodes, (node) => (
              <TreePickerNode
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
                  addNodePopoverInfoProps,
                  removeNodePopoverInfoProps,
                }}
              />
            ))}
          </div>
        ))
      )}
      {nodes && !isLoading ? <Empty collection={nodes} icon={emptySvgIcon} text={emptyText} /> : null}
    </Grid>
  );
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
  displayGroupHeader: PropTypes.bool,
  addNodePopoverInfoProps: PropTypes.object,
  removeNodePopoverInfoProps: PropTypes.object,
};

export default TreePickerGrid;
