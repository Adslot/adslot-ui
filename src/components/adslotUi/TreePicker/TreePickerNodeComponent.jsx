import _ from 'lodash';
import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import GridCell from 'components/alexandria/GridCell';
import GridRow from 'components/alexandria/GridRow';
import TreePickerPropTypes from 'helpers/propTypes/TreePickerPropTypes';
import TreePickerNodeExpander from './TreePickerNodeExpanderComponent';

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
    this.setLoadingAndExpandNode = this.setLoadingAndExpandNode.bind(this);
    this.includeNodeBound = this.props.includeNode.bind(this, this.props.node);
    this.removeNodeBound = this.props.removeNode.bind(this, this.props.node);
  }

  setLoadingAndExpandNode() {
    // Using intervals and setState callback to seamlessly and consistently show the spinner despite sync
    // or async expandNode method. Renders spinner even for slow DOM redraws or large lists.
    const DELAY = 25;
    const delayedExpandNode = () => {
      const intervalToClear = setInterval(() => {
        this.props.expandNode(this.props.node);
        clearInterval(intervalToClear);
      },

      DELAY);
    };

    this.setState({ isLoading: true }, delayedExpandNode);
  }

  render() {
    const {
      disabled,
      itemType,
      node,
      expandNode,
      nodeRenderer,
      selected,
      valueFormatter,
    } = this.props;

    const isChildNode = !(_.isEmpty(node.path) && _.isEmpty(node.ancestors));
    const isExpandable = expandNode && node.isExpandable;

    const pathElement = isChildNode ?
      <span className={`${baseClass}-path`}>
        { _.isEmpty(node.path) ? printAncestorText(node) : printPathText(node) }
      </span> : null;

    const labelCellProps = isExpandable && !this.state.isLoading ? { onClick: this.setLoadingAndExpandNode } : {};

    return (
      <div className={isChildNode ? `${baseClass} child-node` : `${baseClass}`}>
        <GridRow dts={`${_.kebabCase(itemType)}-${node.id}`}>
          {selected ?
            <GridCell classSuffixes={['button']} dts="button-remove">
              <Button
                block bsSize="xsmall"
                className="btn-inverse"
                onClick={this.removeNodeBound}
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

          {isExpandable ?
            <TreePickerNodeExpander isLoading={this.state.isLoading} onClick={this.setLoadingAndExpandNode} /> : null
          }

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
                onClick={this.includeNodeBound}
                disabled={disabled || node.isSelectable === false || this.state.isLoading}
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
