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

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _Radio = _interopRequireDefault(require("../Radio"));

var _Empty = _interopRequireDefault(require("../Empty"));

var _Grid = _interopRequireDefault(require("../Grid"));

var _Row = _interopRequireDefault(require("../Grid/Row"));

var _Cell = _interopRequireDefault(require("../Grid/Cell"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ListPickerPure = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2.default)(ListPickerPure, _React$PureComponent);

  var _super = _createSuper(ListPickerPure);

  function ListPickerPure(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ListPickerPure);
    _this = _super.call(this, props);
    _this.state = {
      selectedItems: _this.props.selectedItems
    };
    _this.isItemSelected = _this.isItemSelected.bind((0, _assertThisInitialized2.default)(_this));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.updateSelectedItems = _this.updateSelectedItems.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(ListPickerPure, [{
    key: "isItemSelected",
    value: function isItemSelected(item) {
      return _lodash.default.some(this.state.selectedItems, {
        id: item.id
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(item) {
      var _this2 = this;

      var _this$props = this.props,
          deselectItem = _this$props.deselectItem,
          selectItem = _this$props.selectItem,
          allowMultiSelection = _this$props.allowMultiSelection;
      return function () {
        var isSelected = _this2.isItemSelected(item);

        _this2.updateSelectedItems(item, allowMultiSelection, isSelected);

        if (isSelected) {
          deselectItem(item, allowMultiSelection);
        } else {
          selectItem(item, allowMultiSelection);
        }
      };
    }
  }, {
    key: "updateSelectedItems",
    value: function updateSelectedItems(item, allowMultiSelection, isSelected) {
      var newSelectedItemsArray = _lodash.default.clone(this.state.selectedItems);

      if (allowMultiSelection) {
        if (isSelected) {
          _lodash.default.remove(newSelectedItemsArray, {
            id: item.id
          });
        } else {
          newSelectedItemsArray.push(item);
        }

        this.setState({
          selectedItems: newSelectedItemsArray
        });
      } else {
        this.setState({
          selectedItems: [item]
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          allowMultiSelection = _this$props2.allowMultiSelection,
          emptyMessage = _this$props2.emptyMessage,
          emptySvgSymbol = _this$props2.emptySvgSymbol,
          items = _this$props2.items,
          labelFormatter = _this$props2.labelFormatter,
          addonFormatter = _this$props2.addonFormatter,
          itemHeaders = _this$props2.itemHeaders,
          itemType = _this$props2.itemType;
      var ToggleComponent = allowMultiSelection ? _Checkbox.default : _Radio.default;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "listpickerpure-component",
        "data-test-selector": "listpickerpure-component-".concat(_lodash.default.kebabCase(itemType))
      }, itemHeaders ? /*#__PURE__*/_react.default.createElement(_Grid.default, null, /*#__PURE__*/_react.default.createElement(_Row.default, {
        type: "header"
      }, /*#__PURE__*/_react.default.createElement(_Cell.default, {
        stretch: true
      }, itemHeaders.label), /*#__PURE__*/_react.default.createElement(_Cell.default, {
        classSuffixes: ['header-toggle']
      }, itemHeaders.toggle), addonFormatter ? /*#__PURE__*/_react.default.createElement(_Cell.default, {
        classSuffixes: ['header-addon']
      }, itemHeaders.addon) : null)) : null, /*#__PURE__*/_react.default.createElement("div", {
        className: "listpickerpure-component-items"
      }, /*#__PURE__*/_react.default.createElement(_Grid.default, null, _lodash.default.map(items, function (item) {
        return /*#__PURE__*/_react.default.createElement(_Row.default, {
          key: item.id,
          dts: "".concat(_lodash.default.kebabCase(itemType), "-").concat(item.id)
        }, /*#__PURE__*/_react.default.createElement(_Cell.default, {
          stretch: true,
          dts: "label"
        }, labelFormatter(item)), /*#__PURE__*/_react.default.createElement(_Cell.default, {
          classSuffixes: ['toggle'],
          dts: "toggle"
        }, /*#__PURE__*/_react.default.createElement(ToggleComponent, {
          checked: _this3.isItemSelected(item),
          onChange: _this3.handleChange(item)
        })), addonFormatter ? /*#__PURE__*/_react.default.createElement(_Cell.default, {
          classSuffixes: ['addon'],
          dts: "addon"
        }, addonFormatter(item)) : null);
      }), /*#__PURE__*/_react.default.createElement(_Empty.default, {
        collection: items,
        icon: emptySvgSymbol,
        text: emptyMessage
      }))));
    }
  }]);
  return ListPickerPure;
}(_react.default.PureComponent);

var itemProps = _propTypes.default.shape({
  id: _propTypes.default.any.isRequired // id can be numeric or uuid string

});

ListPickerPure.propTypes = {
  allowMultiSelection: _propTypes.default.bool,
  deselectItem: _propTypes.default.func,
  emptyMessage: _propTypes.default.string,
  emptySvgSymbol: _propTypes.default.node,
  labelFormatter: _propTypes.default.func,
  addonFormatter: _propTypes.default.func,
  itemHeaders: _propTypes.default.shape({
    label: _propTypes.default.node,
    toggle: _propTypes.default.string,
    addon: _propTypes.default.string
  }),
  items: _propTypes.default.arrayOf(itemProps),
  itemType: _propTypes.default.string,
  selectItem: _propTypes.default.func,
  selectedItems: _propTypes.default.arrayOf(itemProps)
};
ListPickerPure.defaultProps = {
  allowMultiSelection: true,
  deselectItem: function deselectItem() {
    throw new Error('AdslotUi ListPickerPure needs a deselectItem handler');
  },
  emptyMessage: 'No items to select.',
  labelFormatter: function labelFormatter(item) {
    return item.label;
  },
  items: [],
  itemType: 'item',
  selectItem: function selectItem() {
    throw new Error('AdslotUi ListPickerPure needs a selectItem handler');
  },
  selectedItems: []
};
var _default = ListPickerPure;
exports.default = _default;