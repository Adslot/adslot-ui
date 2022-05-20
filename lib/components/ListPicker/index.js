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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _ActionPanel = _interopRequireDefault(require("../ActionPanel"));

var _Button = _interopRequireDefault(require("../Button"));

var _ListPickerPure = _interopRequireDefault(require("../ListPickerPure"));

var _SplitPane = _interopRequireDefault(require("../SplitPane"));

var _FlexibleSpacer = _interopRequireDefault(require("../FlexibleSpacer"));

var _Grid = _interopRequireDefault(require("../Grid"));

var _Row = _interopRequireDefault(require("../Grid/Row"));

var _Cell = _interopRequireDefault(require("../Grid/Cell"));

var _Anchor = _interopRequireDefault(require("../Anchor"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var isSubset = function isSubset(array, subArray) {
  return (0, _lodash.default)(subArray).difference(array).isEmpty();
};

var ListPicker = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2.default)(ListPicker, _React$PureComponent);

  var _super = _createSuper(ListPicker);

  function ListPicker(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ListPicker);
    _this = _super.call(this, props);
    ['applyAction', 'cancelAction', 'deselectItem', 'getApplyButtonState', 'defaultState', 'selectItem'].forEach(function (methodName) {
      _this[methodName] = _this[methodName].bind((0, _assertThisInitialized2.default)(_this));
    });
    _this.state = _this.defaultState();
    return _this;
  }

  (0, _createClass2.default)(ListPicker, [{
    key: "getApplyButtonState",
    value: function getApplyButtonState(selectedItems) {
      if (this.props.allowEmptySelection) return false;
      return _lodash.default.isEmpty(selectedItems);
    }
  }, {
    key: "defaultState",
    value: function defaultState() {
      var selectedItems = _lodash.default.clone(this.props.initialSelection);

      return {
        selectedItems: selectedItems,
        disableApplyButton: this.getApplyButtonState(selectedItems)
      };
    }
  }, {
    key: "selectItem",
    value: function selectItem(item) {
      var selectedItems = this.state.selectedItems;
      if (!this.props.allowMultiSelection) selectedItems.length = 0;
      selectedItems.push(item);
      this.setState({
        selectedItems: selectedItems,
        disableApplyButton: this.getApplyButtonState(selectedItems)
      });
    }
  }, {
    key: "deselectItem",
    value: function deselectItem(item) {
      var selectedItems = this.state.selectedItems;

      _lodash.default.remove(selectedItems, {
        id: item.id
      });

      this.setState({
        selectedItems: selectedItems,
        disableApplyButton: this.getApplyButtonState(selectedItems)
      });
    }
  }, {
    key: "cancelAction",
    value: function cancelAction() {
      this.props.modalClose();
      this.setState(this.defaultState());
    }
  }, {
    key: "applyAction",
    value: function applyAction() {
      this.props.modalApply(this.state.selectedItems);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          selectedItems = _this$state.selectedItems,
          disableApplyButton = _this$state.disableApplyButton;
      var _this$props = this.props,
          allowMultiSelection = _this$props.allowMultiSelection,
          emptyMessage = _this$props.emptyMessage,
          emptySvgSymbol = _this$props.emptySvgSymbol,
          labelFormatter = _this$props.labelFormatter,
          addonFormatter = _this$props.addonFormatter,
          itemHeaders = _this$props.itemHeaders,
          items = _this$props.items,
          itemType = _this$props.itemType,
          itemInfo = _this$props.itemInfo,
          show = _this$props.show,
          modalClassName = _this$props.modalClassName,
          modalTitle = _this$props.modalTitle,
          modalDescription = _this$props.modalDescription,
          modalFootnote = _this$props.modalFootnote,
          linkButtons = _this$props.linkButtons;

      var listPickerPureElement = /*#__PURE__*/_react.default.createElement(_ListPickerPure.default, {
        allowMultiSelection: allowMultiSelection,
        emptyMessage: emptyMessage,
        emptySvgSymbol: emptySvgSymbol,
        deselectItem: this.deselectItem,
        labelFormatter: labelFormatter,
        addonFormatter: addonFormatter,
        itemHeaders: itemHeaders,
        items: items,
        itemType: itemType,
        selectItem: this.selectItem,
        selectedItems: selectedItems
      });

      return show && /*#__PURE__*/_react.default.createElement(_ActionPanel.default, {
        isModal: true,
        className: modalClassName,
        title: modalTitle,
        onClose: this.cancelAction,
        actionButton: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _lodash.default.isEmpty(linkButtons) ? null : /*#__PURE__*/_react.default.createElement("div", {
          className: "pull-left"
        }, _lodash.default.map(linkButtons, function (linkButton, key) {
          return _lodash.default.isObject(linkButton) && isSubset(_lodash.default.keys(linkButton), ['label', 'href']) ? /*#__PURE__*/_react.default.createElement(_Anchor.default, {
            key: linkButton.label,
            variant: "inverse",
            href: linkButton.href
          }, linkButton.label) : /*#__PURE__*/_react.default.cloneElement(linkButton, {
            key: key
          });
        })), /*#__PURE__*/_react.default.createElement(_Button.default, {
          color: "primary",
          onClick: this.applyAction,
          disabled: disableApplyButton,
          "data-test-selector": "listpicker-apply-button"
        }, "Apply"))
      }, modalDescription ? /*#__PURE__*/_react.default.createElement("p", null, modalDescription) : null, _lodash.default.isEmpty(itemInfo) ? /*#__PURE__*/_react.default.createElement("div", {
        className: "listpicker-component-body"
      }, listPickerPureElement) : /*#__PURE__*/_react.default.createElement("div", {
        className: "listpicker-component-body-split"
      }, /*#__PURE__*/_react.default.createElement(_SplitPane.default, {
        dts: _lodash.default.kebabCase(itemInfo.label)
      }, /*#__PURE__*/_react.default.createElement(_Grid.default, null, /*#__PURE__*/_react.default.createElement(_Row.default, {
        type: "header"
      }, /*#__PURE__*/_react.default.createElement(_Cell.default, null, itemInfo.label)), _lodash.default.map(itemInfo.properties, function (property) {
        return /*#__PURE__*/_react.default.createElement(_Row.default, {
          key: property.label,
          horizontalBorder: false
        }, /*#__PURE__*/_react.default.createElement(_Cell.default, {
          classSuffixes: ['label']
        }, property.label), /*#__PURE__*/_react.default.createElement(_Cell.default, {
          classSuffixes: ['value'],
          dts: _lodash.default.kebabCase(property.label),
          stretch: true
        }, property.value));
      })), /*#__PURE__*/_react.default.createElement(_FlexibleSpacer.default, null)), /*#__PURE__*/_react.default.createElement(_SplitPane.default, null, listPickerPureElement, /*#__PURE__*/_react.default.createElement(_FlexibleSpacer.default, null))), modalFootnote ? /*#__PURE__*/_react.default.createElement("div", {
        className: "listpicker-component-footnote"
      }, modalFootnote) : null);
    }
  }]);
  return ListPicker;
}(_react.default.PureComponent);

var itemProps = _propTypes.default.shape({
  id: _propTypes.default.number.isRequired
});

var linkButtonsProps = _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.shape({
  label: _propTypes.default.string.isRequired,
  href: _propTypes.default.string.isRequired
}), _propTypes.default.node]));

ListPicker.propTypes = {
  allowEmptySelection: _propTypes.default.bool,
  allowMultiSelection: _propTypes.default.bool,
  emptyMessage: _propTypes.default.string,
  emptySvgSymbol: _propTypes.default.node,
  initialSelection: _propTypes.default.arrayOf(itemProps),
  itemHeaders: _propTypes.default.shape({
    label: _propTypes.default.string,
    toggle: _propTypes.default.string,
    addon: _propTypes.default.string
  }),
  itemInfo: _propTypes.default.shape({
    label: _propTypes.default.string.isRequired,
    properties: _propTypes.default.arrayOf(_propTypes.default.shape({
      label: _propTypes.default.string.isRequired,
      value: _propTypes.default.string
    })).isRequired
  }),
  items: _propTypes.default.arrayOf(itemProps),
  itemType: _propTypes.default.string,
  labelFormatter: _propTypes.default.func,
  addonFormatter: _propTypes.default.func,
  linkButtons: linkButtonsProps,
  modalApply: _propTypes.default.func,
  modalDescription: _propTypes.default.string,
  modalClassName: _propTypes.default.string,
  modalClose: _propTypes.default.func,
  modalFootnote: _propTypes.default.string,
  modalTitle: _propTypes.default.string,
  show: _propTypes.default.bool
};
ListPicker.defaultProps = {
  allowEmptySelection: true,
  allowMultiSelection: true,
  initialSelection: [],
  items: [],
  itemType: 'item',
  linkButtons: [],
  modalApply: function modalApply() {
    throw new Error('AdslotUi ListPicker needs a modalApply handler');
  },
  modalClassName: 'listpicker-component',
  modalClose: function modalClose() {
    throw new Error('AdslotUi ListPicker needs a modalClose handler');
  },
  modalTitle: 'Select Items',
  show: false
};
var _default = ListPicker;
exports.default = _default;