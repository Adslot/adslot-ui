"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("../../Button"));
var _Cell = _interopRequireDefault(require("../../Grid/Cell"));
var _Row = _interopRequireDefault(require("../../Grid/Row"));
var _TextEllipsis = _interopRequireDefault(require("../../TextEllipsis"));
var _Expander = _interopRequireDefault(require("./Expander"));
var _Popover = _interopRequireDefault(require("../../Popover"));
var _TreePickerPropTypes = require("../../../prop-types/TreePickerPropTypes");
const baseClass = 'treepickernode-component';
const printPathText = node => (0, _lodash.default)(node.path).map('label').clone().reverse().join(', ');
const printAncestorText = node => (0, _lodash.default)(node.ancestors).map('label').join(', ');
const pathPrefix = _ref => {
  let {
    type
  } = _ref;
  return _lodash.default.isEmpty(type) ? '' : `${type} in `;
};
const ConditionalPopoverWrapper = _ref2 => {
  let {
    condition,
    wrapper,
    children
  } = _ref2;
  return condition ? wrapper(children) : children;
};
class TreePickerNode extends _react.default.PureComponent {
  state = {
    isLoading: false
  };
  componentDidMount() {
    if (_lodash.default.isUndefined(this.props.node.path) && _lodash.default.isUndefined(this.props.node.ancestors)) {
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
    const isChildNode = !(_lodash.default.isEmpty(node.path) && _lodash.default.isEmpty(node.ancestors));
    const isExpandable = expandNode && node.isExpandable;
    const pathElement = isChildNode ? /*#__PURE__*/_react.default.createElement("span", {
      className: `${baseClass}-path`
    }, _lodash.default.isEmpty(node.path) ? printAncestorText(node) : printPathText(node)) : null;
    const labelCellProps = isExpandable && !this.state.isLoading ? {
      onClick: this.setLoadingAndExpandNode
    } : {};
    const classNames = (0, _classnames.default)(baseClass, {
      'child-node': isChildNode,
      [`is-${node.accent}`]: node.accent
    });
    return /*#__PURE__*/_react.default.createElement("div", {
      className: classNames
    }, /*#__PURE__*/_react.default.createElement(_Row.default, {
      dts: `${_lodash.default.kebabCase(itemType)}-${node.id}`
    }, selected ? /*#__PURE__*/_react.default.createElement(_Cell.default, {
      classSuffixes: ['button'],
      dts: "button-remove"
    }, /*#__PURE__*/_react.default.createElement(ConditionalPopoverWrapper, {
      condition: !_lodash.default.isEmpty(removeNodePopoverInfoProps),
      wrapper: children => /*#__PURE__*/_react.default.createElement(_Popover.default, removeNodePopoverInfoProps, children)
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      className: "button-xs",
      variant: "inverse",
      onClick: this.handleRemove,
      disabled: disabled || node.isSelectable === false
    }, "\u2212"))) : null, /*#__PURE__*/_react.default.createElement(_Cell.default, Object.assign({
      stretch: true
    }, labelCellProps, {
      dts: "label"
    }), /*#__PURE__*/_react.default.createElement(_TextEllipsis.default, {
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
    }, /*#__PURE__*/_react.default.createElement("span", null, nodeRenderer(node)), !_lodash.default.isEmpty(pathElement) ? /*#__PURE__*/_react.default.createElement("span", {
      className: `${baseClass}-metadata`
    }, "(", pathPrefix(node), pathElement, ")") : null)), isExpandable ? /*#__PURE__*/_react.default.createElement(_Expander.default, {
      isLoading: this.state.isLoading,
      onClick: this.setLoadingAndExpandNode
    }) : null, _lodash.default.isNumber(node.value) ? /*#__PURE__*/_react.default.createElement(_Cell.default, {
      dts: "value"
    }, valueFormatter(node.value)) : null, !selected ? /*#__PURE__*/_react.default.createElement(_Cell.default, {
      classSuffixes: ['button'],
      dts: "button-add"
    }, /*#__PURE__*/_react.default.createElement(ConditionalPopoverWrapper, {
      condition: !_lodash.default.isEmpty(addNodePopoverInfoProps),
      wrapper: children => /*#__PURE__*/_react.default.createElement(_Popover.default, addNodePopoverInfoProps, children)
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      className: "button-xs",
      variant: "inverse",
      onClick: this.handleInclude,
      disabled: disabled || node.isSelectable === false || this.state.isLoading
    }, "+"))) : null));
  }
}
TreePickerNode.propTypes = {
  disabled: _propTypes.default.bool,
  expandNode: _propTypes.default.func,
  includeNode: _propTypes.default.func,
  itemType: _propTypes.default.string.isRequired,
  node: _TreePickerPropTypes.TreePickerPropTypesNode.isRequired,
  nodeRenderer: _propTypes.default.func,
  removeNode: _propTypes.default.func,
  selected: _propTypes.default.bool,
  valueFormatter: _propTypes.default.func,
  addNodePopoverInfoProps: _propTypes.default.object,
  removeNodePopoverInfoProps: _propTypes.default.object
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
var _default = TreePickerNode;
exports.default = _default;