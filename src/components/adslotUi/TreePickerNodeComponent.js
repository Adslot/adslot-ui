import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import TreePickerPropTypes from 'helpers/propTypes/TreePickerPropTypes';
import React, { PropTypes } from 'react';
import { GridCell, GridRow } from 'alexandria-adslot';

require('styles/adslotUi/TreePickerNode.scss');

const TreePickerNodeComponent = ({
  expandNode,
  includeNode,
  node,
  removeNode,
  selected,
  valueFormatter,
}) => {
  const pathElement = !_.isEmpty(node.path) ?
    <span className="treepickernode-component-path">
      {_(node.path).map('label').clone().reverse().join(', ')}
    </span> :
    null;

  const includeNodeBound = includeNode.bind(null, node);
  const removeNodeBound = removeNode.bind(null, node);

  let expanderElement;
  if (expandNode && node.isExpandable) {
    const expandNodeBound = expandNode.bind(null, node);
    expanderElement = (
      <GridCell>
        <div className="treepickernode-component-expander" onClick={expandNodeBound} />
      </GridCell>
    );
  }

  return (
    <div className="treepickernode-component">
      <GridRow>
        {selected ?
          <GridCell classSuffixes={['button']}>
            <Button block bsSize="xsmall" className="btn-inverse" onClick={removeNodeBound}>
              −
            </Button>
          </GridCell>
        : null}
        <GridCell stretch>
          <span>{node.label}</span>
          {!_.isEmpty(node.type) && !_.isEmpty(pathElement) ?
            <span className="treepickernode-component-metadata"> ({node.type} in {pathElement})</span> :
            null
          }
        </GridCell>
        {expanderElement}
        <GridCell>
          {valueFormatter(node.value)}
        </GridCell>
        {!selected ?
          <GridCell classSuffixes={['button']}>
            <Button block bsSize="xsmall" className="btn-inverse" onClick={includeNodeBound}>
              +
            </Button>
          </GridCell>
        : null}
      </GridRow>
    </div>
  );
};

TreePickerNodeComponent.displayName = 'AdslotUiTreePickerNodeComponent';

TreePickerNodeComponent.propTypes = {
  includeNode: PropTypes.func.isRequired,
  expandNode: PropTypes.func,
  node: TreePickerPropTypes.node.isRequired,
  removeNode: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  valueFormatter: PropTypes.func.isRequired,
};

TreePickerNodeComponent.defaultProps = {
  includeNode: (node) => {throw new Error(`AdslotUi TreePickerNode needs an includeNode handler for ${node}`);},

  removeNode: (node) => {throw new Error(`AdslotUi TreePickerNode needs a removeNode handler for ${node}`);},

  selected: false,
  valueFormatter: (value) => value,
};

export default TreePickerNodeComponent;
