import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import TreePickerPropTypes from 'helpers/propTypes/TreePickerPropTypes';
import React, { PropTypes } from 'react';
import { GridCell, GridRow, Spinner } from 'alexandria-adslot';

require('styles/adslotUi/TreePickerNode.scss');

const baseClass = 'treepickernode-component';

const printPathText = (node) => _(node.path)
  .map('label')
  .clone()
  .reverse()
  .join(', ');

const printAncestorText = (node) => _(node.ancestors)
  .map('label')
  .join(', ');

const pathPrefix = ({ type }) => (_.isEmpty(type) ? '' : `${type} in `);

class TreePickerNodeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  getExpander() {
    const {
      expandNode,
      node,
    } = this.props;

    if (expandNode && node.isExpandable) {
      const expandNodeBound = (() => {
        this.setState({ isLoading: true });
        expandNode(node);
      });

      return {
        expandNodeBound,
        expanderElement:
          <GridCell onClick={expandNodeBound} dts="expander">
            {
              this.state.isLoading ? <Spinner size="small" />
            :
              <div className={`${baseClass}-expander`} />
            }
          </GridCell>,
      };
    }

    return {};
  }

  // Bind so we can maintain context in async callbacks, and events.
  bindIncludeNode() {
    return this.props.includeNode.bind(null, this.props.node);
  }

  bindRemoveNode() {
    return this.props.removeNode.bind(null, this.props.node);
  }

  render() {
    const {
      disabled,
      itemType,
      node,
      nodeRenderer,
      selected,
      valueFormatter,
    } = this.props;

    const pathElement = !(_.isEmpty(node.path) && _.isEmpty(node.ancestors)) ?
      <span className={`${baseClass}-path`}>
        { _.isEmpty(node.path) ? printAncestorText(node) : printPathText(node) }
      </span> : null;

    const { expandNodeBound, expanderElement } = this.getExpander();

    const labelCellProps = expanderElement && !node.isLoading ? { onClick: expandNodeBound } : {};

    return (
      <div className={!_.isEmpty(node.path) || !_.isEmpty(node.ancestors) ? `${baseClass} child-node` : `${baseClass}`}>
        <GridRow dts={`${_.kebabCase(itemType)}-${node.id}`}>
          {selected ?
            <GridCell classSuffixes={['button']} dts="button-remove">
              <Button
                block bsSize="xsmall"
                className="btn-inverse"
                onClick={this.bindRemoveNode()}
                disabled={disabled || node.isSelectable === false}
              >
                −
              </Button>
            </GridCell>
          : null}
          <GridCell stretch {...labelCellProps} dts="label">
            <span>{nodeRenderer(node)}</span>
            {!_.isEmpty(pathElement) ?
              <span className={`${baseClass}-metadata`}> ({pathPrefix(node)}{pathElement})</span> :
              null
            }
          </GridCell>
          {expanderElement}
          {_.isNumber(node.value) ?
            <GridCell dts="value">
              {valueFormatter(node.value)}
            </GridCell> :
            null
          }
          {!selected ?
            <GridCell classSuffixes={['button']} dts="button-add">
              <Button
                block bsSize="xsmall"
                className="btn-inverse"
                onClick={this.bindIncludeNode()}
                disabled={disabled || node.isSelectable === false || node.isLoading}
              >
                +
              </Button>
            </GridCell>
          : null}
        </GridRow>
      </div>
    );
  }
}

TreePickerNodeComponent.displayName = 'AdslotUiTreePickerNodeComponent';

TreePickerNodeComponent.propTypes = {
  disabled: PropTypes.bool,
  expandNode: PropTypes.func,
  includeNode: PropTypes.func.isRequired,
  itemType: PropTypes.string.isRequired,
  node: TreePickerPropTypes.node.isRequired,
  nodeRenderer: PropTypes.func,
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
  nodeRenderer: (node) => node.label,
};

export default TreePickerNodeComponent;
