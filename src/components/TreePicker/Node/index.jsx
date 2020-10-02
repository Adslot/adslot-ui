import _ from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import GridCell from '../../Grid/Cell';
import GridRow from '../../Grid/Row';
import TextEllipsis from '../../TextEllipsis';
import TreePickerNodeExpander from './Expander';
import TreePickerPropTypes from '../../../prop-types/TreePickerPropTypes';
import './styles.scss';

const baseClass = 'treepickernode-component';

const printPathText = node =>
  _(node.path)
    .map('label')
    .clone()
    .reverse()
    .join(', ');

const printAncestorText = node =>
  _(node.ancestors)
    .map('label')
    .join(', ');

const pathPrefix = ({ type }) => (_.isEmpty(type) ? '' : `${type} in `);

class TreePickerNodeComponent extends React.PureComponent {
  state = {
    isLoading: false,
  };

  componentDidMount() {
    if (_.isUndefined(this.props.node.path) && _.isUndefined(this.props.node.ancestors)) {
      throw new Error(`AdslotUi TreePickerNode needs property 'path' or property 'ancestors' for ${this.props.node}`);
    }
  }

  setLoadingAndExpandNode = () => {
    this.setState({ isLoading: true }, () => this.props.expandNode(this.props.node));
  };

  handleRemove = () => this.props.removeNode(this.props.node);

  handleInclude = () => this.props.includeNode(this.props.node);

  render() {
    const { disabled, itemType, node, expandNode, nodeRenderer, selected, valueFormatter } = this.props;
    const isChildNode = !(_.isEmpty(node.path) && _.isEmpty(node.ancestors));
    const isExpandable = expandNode && node.isExpandable;

    const pathElement = isChildNode ? (
      <span className={`${baseClass}-path`}>
        {_.isEmpty(node.path) ? printAncestorText(node) : printPathText(node)}
      </span>
    ) : null;

    const labelCellProps = isExpandable && !this.state.isLoading ? { onClick: this.setLoadingAndExpandNode } : {};

    const classNames = classnames(baseClass, {
      'child-node': isChildNode,
      [`is-${node.accent}`]: node.accent,
    });

    return (
      <div data-testid="treepicker-node-wrapper" className={classNames}>
        <GridRow dts={`${_.kebabCase(itemType)}-${node.id}`}>
          {selected ? (
            <GridCell classSuffixes={['button']} dts="button-remove">
              <Button
                block
                bsSize="xsmall"
                className="btn-inverse"
                onClick={this.handleRemove}
                disabled={disabled || node.isSelectable === false}
              >
                −
              </Button>
            </GridCell>
          ) : null}
          <GridCell stretch {...labelCellProps} dts="label">
            <TextEllipsis>
              <span>{nodeRenderer(node)}</span>
              {!_.isEmpty(pathElement) ? (
                <span className={`${baseClass}-metadata`}>
                  ({pathPrefix(node)}
                  {pathElement})
                </span>
              ) : null}
            </TextEllipsis>
          </GridCell>

          {isExpandable ? (
            <TreePickerNodeExpander isLoading={this.state.isLoading} onClick={this.setLoadingAndExpandNode} />
          ) : null}

          {_.isNumber(node.value) ? <GridCell dts="value">{valueFormatter(node.value)}</GridCell> : null}
          {!selected ? (
            <GridCell classSuffixes={['button']} dts="button-add">
              <Button
                block
                bsSize="xsmall"
                className="btn-inverse"
                onClick={this.handleInclude}
                disabled={disabled || node.isSelectable === false || this.state.isLoading}
              >
                +
              </Button>
            </GridCell>
          ) : null}
        </GridRow>
      </div>
    );
  }
}

TreePickerNodeComponent.propTypes = {
  disabled: PropTypes.bool,
  expandNode: PropTypes.func,
  includeNode: PropTypes.func,
  itemType: PropTypes.string.isRequired,
  node: TreePickerPropTypes.node.isRequired,
  nodeRenderer: PropTypes.func,
  removeNode: PropTypes.func,
  selected: PropTypes.bool,
  valueFormatter: PropTypes.func,
};

TreePickerNodeComponent.defaultProps = {
  disabled: false,
  includeNode: node => {
    throw new Error(`AdslotUi TreePickerNode needs an includeNode handler for ${node}`);
  },
  removeNode: node => {
    throw new Error(`AdslotUi TreePickerNode needs a removeNode handler for ${node}`);
  },
  selected: false,
  valueFormatter: value => value,
  nodeRenderer: node => node.label,
};

export default TreePickerNodeComponent;
