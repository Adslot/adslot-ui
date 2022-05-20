import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import _ from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import React from 'react';
import Button from '../../Button';
import GridCell from '../../Grid/Cell';
import GridRow from '../../Grid/Row';
import TextEllipsis from '../../TextEllipsis';
import TreePickerNodeExpander from './Expander';
import { TreePickerPropTypesNode } from '../../../prop-types/TreePickerPropTypes';
var baseClass = 'treepickernode-component';

var printPathText = function printPathText(node) {
  return _(node.path).map('label').clone().reverse().join(', ');
};

var printAncestorText = function printAncestorText(node) {
  return _(node.ancestors).map('label').join(', ');
};

var pathPrefix = function pathPrefix(_ref) {
  var type = _ref.type;
  return _.isEmpty(type) ? '' : "".concat(type, " in ");
};

var TreePickerNode = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(TreePickerNode, _React$PureComponent);

  var _super = _createSuper(TreePickerNode);

  function TreePickerNode() {
    var _this;

    _classCallCheck(this, TreePickerNode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoading: false
    });

    _defineProperty(_assertThisInitialized(_this), "setLoadingAndExpandNode", function () {
      _this.setState({
        isLoading: true
      }, function () {
        return _this.props.expandNode(_this.props.node);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleRemove", function () {
      return _this.props.removeNode(_this.props.node);
    });

    _defineProperty(_assertThisInitialized(_this), "handleInclude", function () {
      return _this.props.includeNode(_this.props.node);
    });

    return _this;
  }

  _createClass(TreePickerNode, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (_.isUndefined(this.props.node.path) && _.isUndefined(this.props.node.ancestors)) {
        throw new Error("AdslotUi TreePickerNode needs property 'path' or property 'ancestors' for ".concat(this.props.node));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          disabled = _this$props.disabled,
          itemType = _this$props.itemType,
          node = _this$props.node,
          expandNode = _this$props.expandNode,
          nodeRenderer = _this$props.nodeRenderer,
          selected = _this$props.selected,
          valueFormatter = _this$props.valueFormatter;
      var isChildNode = !(_.isEmpty(node.path) && _.isEmpty(node.ancestors));
      var isExpandable = expandNode && node.isExpandable;
      var pathElement = isChildNode ? /*#__PURE__*/React.createElement("span", {
        className: "".concat(baseClass, "-path")
      }, _.isEmpty(node.path) ? printAncestorText(node) : printPathText(node)) : null;
      var labelCellProps = isExpandable && !this.state.isLoading ? {
        onClick: this.setLoadingAndExpandNode
      } : {};
      var classNames = classnames(baseClass, _defineProperty({
        'child-node': isChildNode
      }, "is-".concat(node.accent), node.accent));
      return /*#__PURE__*/React.createElement("div", {
        className: classNames
      }, /*#__PURE__*/React.createElement(GridRow, {
        dts: "".concat(_.kebabCase(itemType), "-").concat(node.id)
      }, selected ? /*#__PURE__*/React.createElement(GridCell, {
        classSuffixes: ['button'],
        dts: "button-remove"
      }, /*#__PURE__*/React.createElement(Button, {
        className: "button-xs",
        variant: "inverse",
        onClick: this.handleRemove,
        disabled: disabled || node.isSelectable === false
      }, "\u2212")) : null, /*#__PURE__*/React.createElement(GridCell, Object.assign({
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
        className: "".concat(baseClass, "-metadata")
      }, "(", pathPrefix(node), pathElement, ")") : null)), isExpandable ? /*#__PURE__*/React.createElement(TreePickerNodeExpander, {
        isLoading: this.state.isLoading,
        onClick: this.setLoadingAndExpandNode
      }) : null, _.isNumber(node.value) ? /*#__PURE__*/React.createElement(GridCell, {
        dts: "value"
      }, valueFormatter(node.value)) : null, !selected ? /*#__PURE__*/React.createElement(GridCell, {
        classSuffixes: ['button'],
        dts: "button-add"
      }, /*#__PURE__*/React.createElement(Button, {
        className: "button-xs",
        variant: "inverse",
        onClick: this.handleInclude,
        disabled: disabled || node.isSelectable === false || this.state.isLoading
      }, "+")) : null));
    }
  }]);

  return TreePickerNode;
}(React.PureComponent);

TreePickerNode.propTypes = {
  disabled: PropTypes.bool,
  expandNode: PropTypes.func,
  includeNode: PropTypes.func,
  itemType: PropTypes.string.isRequired,
  node: TreePickerPropTypesNode.isRequired,
  nodeRenderer: PropTypes.func,
  removeNode: PropTypes.func,
  selected: PropTypes.bool,
  valueFormatter: PropTypes.func
};
TreePickerNode.defaultProps = {
  disabled: false,
  includeNode: function includeNode(node) {
    throw new Error("AdslotUi TreePickerNode needs an includeNode handler for ".concat(node));
  },
  removeNode: function removeNode(node) {
    throw new Error("AdslotUi TreePickerNode needs a removeNode handler for ".concat(node));
  },
  selected: false,
  valueFormatter: function valueFormatter(value) {
    return value;
  },
  nodeRenderer: function nodeRenderer(node) {
    return node.label;
  }
};
export default TreePickerNode;