"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../../Button"));

var _Cell = _interopRequireDefault(require("../../Grid/Cell"));

var _Row = _interopRequireDefault(require("../../Grid/Row"));

var _TextEllipsis = _interopRequireDefault(require("../../TextEllipsis"));

var _Expander = _interopRequireDefault(require("./Expander"));

var _TreePickerPropTypes = require("../../../prop-types/TreePickerPropTypes");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var baseClass = 'treepickernode-component';

var printPathText = function printPathText(node) {
  return (0, _lodash.default)(node.path).map('label').clone().reverse().join(', ');
};

var printAncestorText = function printAncestorText(node) {
  return (0, _lodash.default)(node.ancestors).map('label').join(', ');
};

var pathPrefix = function pathPrefix(_ref) {
  var type = _ref.type;
  return _lodash.default.isEmpty(type) ? '' : "".concat(type, " in ");
};

var TreePickerNode = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2.default)(TreePickerNode, _React$PureComponent);

  var _super = _createSuper(TreePickerNode);

  function TreePickerNode() {
    var _this;

    (0, _classCallCheck2.default)(this, TreePickerNode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      isLoading: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setLoadingAndExpandNode", function () {
      _this.setState({
        isLoading: true
      }, function () {
        return _this.props.expandNode(_this.props.node);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleRemove", function () {
      return _this.props.removeNode(_this.props.node);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleInclude", function () {
      return _this.props.includeNode(_this.props.node);
    });
    return _this;
  }

  (0, _createClass2.default)(TreePickerNode, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (_lodash.default.isUndefined(this.props.node.path) && _lodash.default.isUndefined(this.props.node.ancestors)) {
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
      var isChildNode = !(_lodash.default.isEmpty(node.path) && _lodash.default.isEmpty(node.ancestors));
      var isExpandable = expandNode && node.isExpandable;
      var pathElement = isChildNode ? /*#__PURE__*/_react.default.createElement("span", {
        className: "".concat(baseClass, "-path")
      }, _lodash.default.isEmpty(node.path) ? printAncestorText(node) : printPathText(node)) : null;
      var labelCellProps = isExpandable && !this.state.isLoading ? {
        onClick: this.setLoadingAndExpandNode
      } : {};
      var classNames = (0, _classnames2.default)(baseClass, (0, _defineProperty2.default)({
        'child-node': isChildNode
      }, "is-".concat(node.accent), node.accent));
      return /*#__PURE__*/_react.default.createElement("div", {
        className: classNames
      }, /*#__PURE__*/_react.default.createElement(_Row.default, {
        dts: "".concat(_lodash.default.kebabCase(itemType), "-").concat(node.id)
      }, selected ? /*#__PURE__*/_react.default.createElement(_Cell.default, {
        classSuffixes: ['button'],
        dts: "button-remove"
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "button-xs",
        inverse: true,
        onClick: this.handleRemove,
        disabled: disabled || node.isSelectable === false
      }, "\u2212")) : null, /*#__PURE__*/_react.default.createElement(_Cell.default, Object.assign({
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
        className: "".concat(baseClass, "-metadata")
      }, "(", pathPrefix(node), pathElement, ")") : null)), isExpandable ? /*#__PURE__*/_react.default.createElement(_Expander.default, {
        isLoading: this.state.isLoading,
        onClick: this.setLoadingAndExpandNode
      }) : null, _lodash.default.isNumber(node.value) ? /*#__PURE__*/_react.default.createElement(_Cell.default, {
        dts: "value"
      }, valueFormatter(node.value)) : null, !selected ? /*#__PURE__*/_react.default.createElement(_Cell.default, {
        classSuffixes: ['button'],
        dts: "button-add"
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "button-xs",
        inverse: true,
        onClick: this.handleInclude,
        disabled: disabled || node.isSelectable === false || this.state.isLoading
      }, "+")) : null));
    }
  }]);
  return TreePickerNode;
}(_react.default.PureComponent);

TreePickerNode.propTypes = {
  disabled: _propTypes.default.bool,
  expandNode: _propTypes.default.func,
  includeNode: _propTypes.default.func,
  itemType: _propTypes.default.string.isRequired,
  node: _TreePickerPropTypes.TreePickerPropTypesNode.isRequired,
  nodeRenderer: _propTypes.default.func,
  removeNode: _propTypes.default.func,
  selected: _propTypes.default.bool,
  valueFormatter: _propTypes.default.func
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
var _default = TreePickerNode;
exports.default = _default;