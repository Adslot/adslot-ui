import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import TreePickerNode from '../Node';
import Empty from '../../Empty';
import Grid from '../../Grid';
import GridRow from '../../Grid/Row';
import Spinner from '../../Spinner';
import TreePickerPropTypes from '../../../prop-types/TreePickerPropTypes';
import './styles.scss';

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
      {isLoading ? (
        <div className="loading-nodes-container">
          <Spinner />
          <p>Loading…</p>
        </div>
      ) : (
        _.map(nodesByGroupLabel, (groupedNodes, label) => (
          <div className="treepickergrid-component-group" key={_.kebabCase(label)}>
            {displayGroupHeader ? (
              <div className="treepickergrid-component-group-label">
                <GridRow dts={`group-label-${_.kebabCase(label)}`}>{label}</GridRow>
              </div>
            ) : null}
            {_.map(groupedNodes, node => (
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
                }}
              />
            ))}
          </div>
        ))
      )}
      {nodes && !isLoading ? (
        <Empty collection={nodes} hideIcon={hideIcon} svgSymbol={emptySvgSymbol} text={emptyText} />
      ) : null}
    </Grid>
  );
};

TreePickerGridComponent.displayName = 'TreePickerGridComponent';

TreePickerGridComponent.propTypes = {
  disabled: PropTypes.bool,
  emptySvgSymbol: PropTypes.node,
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
