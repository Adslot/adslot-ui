import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import ActionPanel from '../ActionPanel';
import Button from '../Button';
import ListPickerPure from '../ListPickerPure';
import SplitPane from '../SplitPane';
import FlexibleSpacer from '../FlexibleSpacer';
import Grid from '../Grid';
import GridRow from '../Grid/Row';
import GridCell from '../Grid/Cell';
import Anchor from '../Anchor';

var isSubset = function isSubset(array, subArray) {
  return _(subArray).difference(array).isEmpty();
};

var ListPicker = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ListPicker, _React$PureComponent);

  var _super = _createSuper(ListPicker);

  function ListPicker(props) {
    var _this;

    _classCallCheck(this, ListPicker);

    _this = _super.call(this, props);
    ['applyAction', 'cancelAction', 'deselectItem', 'getApplyButtonState', 'defaultState', 'selectItem'].forEach(function (methodName) {
      _this[methodName] = _this[methodName].bind(_assertThisInitialized(_this));
    });
    _this.state = _this.defaultState();
    return _this;
  }

  _createClass(ListPicker, [{
    key: "getApplyButtonState",
    value: function getApplyButtonState(selectedItems) {
      if (this.props.allowEmptySelection) return false;
      return _.isEmpty(selectedItems);
    }
  }, {
    key: "defaultState",
    value: function defaultState() {
      var selectedItems = _.clone(this.props.initialSelection);

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

      _.remove(selectedItems, {
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
      var listPickerPureElement = /*#__PURE__*/React.createElement(ListPickerPure, {
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
      return show && /*#__PURE__*/React.createElement(ActionPanel, {
        isModal: true,
        className: modalClassName,
        title: modalTitle,
        onClose: this.cancelAction,
        actionButton: /*#__PURE__*/React.createElement(React.Fragment, null, _.isEmpty(linkButtons) ? null : /*#__PURE__*/React.createElement("div", {
          className: "pull-left"
        }, _.map(linkButtons, function (linkButton, key) {
          return _.isObject(linkButton) && isSubset(_.keys(linkButton), ['label', 'href']) ? /*#__PURE__*/React.createElement(Anchor, {
            key: linkButton.label,
            variant: "inverse",
            href: linkButton.href
          }, linkButton.label) : /*#__PURE__*/React.cloneElement(linkButton, {
            key: key
          });
        })), /*#__PURE__*/React.createElement(Button, {
          color: "primary",
          onClick: this.applyAction,
          disabled: disableApplyButton,
          "data-test-selector": "listpicker-apply-button"
        }, "Apply"))
      }, modalDescription ? /*#__PURE__*/React.createElement("p", null, modalDescription) : null, _.isEmpty(itemInfo) ? /*#__PURE__*/React.createElement("div", {
        className: "listpicker-component-body"
      }, listPickerPureElement) : /*#__PURE__*/React.createElement("div", {
        className: "listpicker-component-body-split"
      }, /*#__PURE__*/React.createElement(SplitPane, {
        dts: _.kebabCase(itemInfo.label)
      }, /*#__PURE__*/React.createElement(Grid, null, /*#__PURE__*/React.createElement(GridRow, {
        type: "header"
      }, /*#__PURE__*/React.createElement(GridCell, null, itemInfo.label)), _.map(itemInfo.properties, function (property) {
        return /*#__PURE__*/React.createElement(GridRow, {
          key: property.label,
          horizontalBorder: false
        }, /*#__PURE__*/React.createElement(GridCell, {
          classSuffixes: ['label']
        }, property.label), /*#__PURE__*/React.createElement(GridCell, {
          classSuffixes: ['value'],
          dts: _.kebabCase(property.label),
          stretch: true
        }, property.value));
      })), /*#__PURE__*/React.createElement(FlexibleSpacer, null)), /*#__PURE__*/React.createElement(SplitPane, null, listPickerPureElement, /*#__PURE__*/React.createElement(FlexibleSpacer, null))), modalFootnote ? /*#__PURE__*/React.createElement("div", {
        className: "listpicker-component-footnote"
      }, modalFootnote) : null);
    }
  }]);

  return ListPicker;
}(React.PureComponent);

var itemProps = PropTypes.shape({
  id: PropTypes.number.isRequired
});
var linkButtonsProps = PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
}), PropTypes.node]));
ListPicker.propTypes = {
  allowEmptySelection: PropTypes.bool,
  allowMultiSelection: PropTypes.bool,
  emptyMessage: PropTypes.string,
  emptySvgSymbol: PropTypes.node,
  initialSelection: PropTypes.arrayOf(itemProps),
  itemHeaders: PropTypes.shape({
    label: PropTypes.string,
    toggle: PropTypes.string,
    addon: PropTypes.string
  }),
  itemInfo: PropTypes.shape({
    label: PropTypes.string.isRequired,
    properties: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string
    })).isRequired
  }),
  items: PropTypes.arrayOf(itemProps),
  itemType: PropTypes.string,
  labelFormatter: PropTypes.func,
  addonFormatter: PropTypes.func,
  linkButtons: linkButtonsProps,
  modalApply: PropTypes.func,
  modalDescription: PropTypes.string,
  modalClassName: PropTypes.string,
  modalClose: PropTypes.func,
  modalFootnote: PropTypes.string,
  modalTitle: PropTypes.string,
  show: PropTypes.bool
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
export default ListPicker;