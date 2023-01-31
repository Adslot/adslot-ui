import _ from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import React from 'react';
import Button from '../../Button';
import GridCell from '../../Grid/Cell';
import GridRow from '../../Grid/Row';
import TextEllipsis from '../../TextEllipsis';
import TreePickerNodeExpander from './Expander';
import Popover from '../../Popover';
import { TreePickerPropTypesNode } from '../../../prop-types/TreePickerPropTypes';
const baseClass = 'treepickernode-component';
const printPathText = node => _(node.path).map('label').clone().reverse().join(', ');
const printAncestorText = node => _(node.ancestors).map('label').join(', ');
const pathPrefix = _ref => {
  let {
    type
  } = _ref;
  return _.isEmpty(type) ? '' : `${type} in `;
};
const ConditionalPopoverWrapper = _ref2 => {
  let {
    condition,
    wrapper,
    children
  } = _ref2;
  return condition ? wrapper(children) : children;
};
class TreePickerNode extends React.PureComponent {
  state = {
    isLoading: false
  };
  componentDidMount() {
    if (_.isUndefined(this.props.node.path) && _.isUndefined(this.props.node.ancestors)) {
      throw new Error(`AdslotUi TreePickerNode needs property 'path' or property 'ancestors' for ${this.props.node}`);
    }
  }
  setLoadingAndExpandNode = () => {
    this.setState({
      isLoading: true
    }, () => this.props.expandNode(this.props.node));
  };
  handleRemove = () => this.props.removeNode(this.props.node);
  handleInclude = () => this.props.includeNode(this.props.node);
  render() {
    const {
      disabled,
      itemType,
      node,
      expandNode,
      nodeRenderer,
      selected,
      valueFormatter,
      addNodePopoverInfoProps,
      removeNodePopoverInfoProps
    } = this.props;
    const isChildNode = !(_.isEmpty(node.path) && _.isEmpty(node.ancestors));
    const isExpandable = expandNode && node.isExpandable;
    const pathElement = isChildNode ? /*#__PURE__*/React.createElement("span", {
      className: `${baseClass}-path`
    }, _.isEmpty(node.path) ? printAncestorText(node) : printPathText(node)) : null;
    const labelCellProps = isExpandable && !this.state.isLoading ? {
      onClick: this.setLoadingAndExpandNode
    } : {};
    const classNames = classnames(baseClass, {
      'child-node': isChildNode,
      [`is-${node.accent}`]: node.accent
    });
    return /*#__PURE__*/React.createElement("div", {
      className: classNames
    }, /*#__PURE__*/React.createElement(GridRow, {
      dts: `${_.kebabCase(itemType)}-${node.id}`
    }, selected ? /*#__PURE__*/React.createElement(GridCell, {
      classSuffixes: ['button'],
      dts: "button-remove"
    }, /*#__PURE__*/React.createElement(ConditionalPopoverWrapper, {
      condition: !_.isEmpty(removeNodePopoverInfoProps),
      wrapper: children => /*#__PURE__*/React.createElement(Popover, removeNodePopoverInfoProps, children)
    }, /*#__PURE__*/React.createElement(Button, {
      className: "button-xs",
      variant: "inverse",
      onClick: this.handleRemove,
      disabled: disabled || node.isSelectable === false
    }, "\u2212"))) : null, /*#__PURE__*/React.createElement(GridCell, Object.assign({
      stretch: true
    }, labelCellProps, {
      dts: "label"
    }), /*#__PURE__*/React.createElement(TextEllipsis, {
      popoverProps: {
        strategy: 'fixed',
        placement: 'bottom',
        modifiers: [{
          name: 'flip',
          enabled: false
        }, {
          name: 'preventOverflow',
          enabled: false
        }, {
          name: 'hide',
          enabled: false
        }]
      }
    }, /*#__PURE__*/React.createElement("span", null, nodeRenderer(node)), !_.isEmpty(pathElement) ? /*#__PURE__*/React.createElement("span", {
      className: `${baseClass}-metadata`
    }, "(", pathPrefix(node), pathElement, ")") : null)), isExpandable ? /*#__PURE__*/React.createElement(TreePickerNodeExpander, {
      isLoading: this.state.isLoading,
      onClick: this.setLoadingAndExpandNode
    }) : null, _.isNumber(node.value) ? /*#__PURE__*/React.createElement(GridCell, {
      dts: "value"
    }, valueFormatter(node.value)) : null, !selected ? /*#__PURE__*/React.createElement(GridCell, {
      classSuffixes: ['button'],
      dts: "button-add"
    }, /*#__PURE__*/React.createElement(ConditionalPopoverWrapper, {
      condition: !_.isEmpty(addNodePopoverInfoProps),
      wrapper: children => /*#__PURE__*/React.createElement(Popover, addNodePopoverInfoProps, children)
    }, /*#__PURE__*/React.createElement(Button, {
      className: "button-xs",
      variant: "inverse",
      onClick: this.handleInclude,
      disabled: disabled || node.isSelectable === false || this.state.isLoading
    }, "+"))) : null));
  }
}
TreePickerNode.propTypes = {
  disabled: PropTypes.bool,
  expandNode: PropTypes.func,
  includeNode: PropTypes.func,
  itemType: PropTypes.string.isRequired,
  node: TreePickerPropTypesNode.isRequired,
  nodeRenderer: PropTypes.func,
  removeNode: PropTypes.func,
  selected: PropTypes.bool,
  valueFormatter: PropTypes.func,
  addNodePopoverInfoProps: PropTypes.object,
  removeNodePopoverInfoProps: PropTypes.object
};
TreePickerNode.defaultProps = {
  disabled: false,
  includeNode: node => {
    throw new Error(`AdslotUi TreePickerNode needs an includeNode handler for ${node}`);
  },
  removeNode: node => {
    throw new Error(`AdslotUi TreePickerNode needs a removeNode handler for ${node}`);
  },
  selected: false,
  valueFormatter: value => value,
  nodeRenderer: node => node.label
};
export default TreePickerNode;