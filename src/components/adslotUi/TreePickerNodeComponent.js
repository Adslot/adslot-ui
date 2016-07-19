import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import TreePickerPropTypes from 'helpers/propTypes/TreePickerPropTypes';
import React, { PropTypes } from 'react';
import { GridCell, GridRow } from 'alexandria-adslot';

require('styles/adslotUi/TreePickerNode.scss');

const baseClass = 'treepickernode-component';

const getExpander = ({ expandNode, node }) => {
  if (expandNode && node.isExpandable) {
    const expandNodeBound = expandNode.bind(null, node);
    return {
      expandNodeBound,
      expanderElement:
        <GridCell onClick={expandNodeBound}>
          <div className={`${baseClass}-expander`} />
        </GridCell>,
    };
  }

  return {};
};

const TreePickerNodeComponent = ({
  disabled,
  expandNode,
  includeNode,
  node,
  removeNode,
  selected,
  valueFormatter,
}) => {
  const pathElement = !_.isEmpty(node.path) ?
    <span className={`${baseClass}-path`}>
      {_(node.path).map('label').clone().reverse().join(', ')}
    </span> :
    null;

  const includeNodeBound = includeNode.bind(null, node);
  const removeNodeBound = removeNode.bind(null, node);

  const { expandNodeBound, expanderElement } = getExpander({ expandNode, node });

  const labelCellProps = expanderElement ?
    { onClick: expandNodeBound } :
    {};

  return (
    <div className={`${baseClass}`} data-test-selector="treepicker-grid-row">
      <GridRow>
        {selected ?
          <GridCell classSuffixes={['button']}>
            <Button
              block bsSize="xsmall"
              className="btn-inverse"
              onClick={removeNodeBound}
              disabled={disabled || node.isSelectable === false}
            >
              −
            </Button>
          </GridCell>
        : null}
        <GridCell stretch {...labelCellProps}>
          <span>{node.label}</span>
          {!_.isEmpty(node.type) && !_.isEmpty(pathElement) ?
            <span className={`${baseClass}-metadata`}> ({node.type} in {pathElement})</span> :
            null
          }
        </GridCell>
        {expanderElement}
        {_.isNumber(node.value) ?
          <GridCell>
            {valueFormatter(node.value)}
          </GridCell> :
          null
        }
        {!selected ?
          <GridCell classSuffixes={['button']}>
            <Button
              block bsSize="xsmall"
              className="btn-inverse"
              onClick={includeNodeBound}
              disabled={disabled || node.isSelectable === false}
            >
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
  disabled: PropTypes.bool,
  expandNode: PropTypes.func,
  includeNode: PropTypes.func.isRequired,
  node: TreePickerPropTypes.node.isRequired,
  removeNode: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  valueFormatter: PropTypes.func.isRequired,
};

TreePickerNodeComponent.defaultProps = {
  disabled: false,

  includeNode: (node) => { throw new Error(`AdslotUi TreePickerNode needs an includeNode handler for ${node}`); },

  removeNode: (node) => { throw new Error(`AdslotUi TreePickerNode needs a removeNode handler for ${node}`); },

  selected: false,
  valueFormatter: (value) => value,
};

export default TreePickerNodeComponent;
