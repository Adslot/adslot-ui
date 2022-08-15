"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

const isSubset = (array, subArray) => (0, _lodash.default)(subArray).difference(array).isEmpty();

const ListPicker = _ref => {
  let {
    allowMultiSelection,
    allowEmptySelection,
    emptyMessage,
    emptySvgSymbol,
    labelFormatter,
    addonFormatter,
    itemHeaders,
    items,
    itemType,
    itemInfo,
    initialSelection,
    show,
    modalClassName,
    modalTitle,
    modalDescription,
    modalFootnote,
    linkButtons,
    modalApply,
    modalClose
  } = _ref;

  const getApplyButtonState = selectedItems => {
    if (allowEmptySelection) return false;
    return _lodash.default.isEmpty(selectedItems);
  };

  const [selectedItems, setSelectedItems] = _react.default.useState(initialSelection);

  const [disableApplyButton, setDisableApplyButton] = _react.default.useState(getApplyButtonState(initialSelection));

  const selectItem = item => {
    if (!allowMultiSelection) selectedItems.length = 0;
    selectedItems.push(item);
    setSelectedItems(selectedItems);
    setDisableApplyButton(getApplyButtonState(selectedItems));
  };

  const deselectItem = item => {
    _lodash.default.remove(selectedItems, {
      id: item.id
    });

    setSelectedItems(selectedItems);
    setDisableApplyButton(getApplyButtonState(selectedItems));
  };

  const cancelAction = () => {
    modalClose();
    setSelectedItems(_lodash.default.clone(initialSelection));
    setDisableApplyButton(getApplyButtonState(initialSelection));
  };

  const applyAction = () => {
    modalApply(selectedItems);
  };

  const listPickerPureElement = /*#__PURE__*/_react.default.createElement(_ListPickerPure.default, {
    allowMultiSelection: allowMultiSelection,
    emptyMessage: emptyMessage,
    emptySvgSymbol: emptySvgSymbol,
    deselectItem: deselectItem,
    labelFormatter: labelFormatter,
    addonFormatter: addonFormatter,
    itemHeaders: itemHeaders,
    items: items,
    itemType: itemType,
    selectItem: selectItem,
    selectedItems: selectedItems
  });

  return show && /*#__PURE__*/_react.default.createElement(_ActionPanel.default, {
    isModal: true,
    className: modalClassName,
    title: modalTitle,
    onClose: cancelAction,
    actionButton: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _lodash.default.isEmpty(linkButtons) ? null : /*#__PURE__*/_react.default.createElement("div", {
      className: "pull-left"
    }, _lodash.default.map(linkButtons, (linkButton, key) => _lodash.default.isObject(linkButton) && isSubset(_lodash.default.keys(linkButton), ['label', 'href']) ? /*#__PURE__*/_react.default.createElement(_Anchor.default, {
      key: linkButton.label,
      variant: "inverse",
      href: linkButton.href
    }, linkButton.label) : /*#__PURE__*/_react.default.cloneElement(linkButton, {
      key
    }))), /*#__PURE__*/_react.default.createElement(_Button.default, {
      color: "primary",
      onClick: applyAction,
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
  }, /*#__PURE__*/_react.default.createElement(_Cell.default, null, itemInfo.label)), _lodash.default.map(itemInfo.properties, property => /*#__PURE__*/_react.default.createElement(_Row.default, {
    key: property.label,
    horizontalBorder: false
  }, /*#__PURE__*/_react.default.createElement(_Cell.default, {
    classSuffixes: ['label']
  }, property.label), /*#__PURE__*/_react.default.createElement(_Cell.default, {
    classSuffixes: ['value'],
    dts: _lodash.default.kebabCase(property.label),
    stretch: true
  }, property.value)))), /*#__PURE__*/_react.default.createElement(_FlexibleSpacer.default, null)), /*#__PURE__*/_react.default.createElement(_SplitPane.default, null, listPickerPureElement, /*#__PURE__*/_react.default.createElement(_FlexibleSpacer.default, null))), modalFootnote ? /*#__PURE__*/_react.default.createElement("div", {
    className: "listpicker-component-footnote"
  }, modalFootnote) : null);
};

const itemProps = _propTypes.default.shape({
  id: _propTypes.default.number.isRequired
});

const linkButtonsProps = _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.shape({
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
  modalApply: () => {
    throw new Error('AdslotUi ListPicker needs a modalApply handler');
  },
  modalClassName: 'listpicker-component',
  modalClose: () => {
    throw new Error('AdslotUi ListPicker needs a modalClose handler');
  },
  modalTitle: 'Select Items',
  show: false
};
var _default = ListPicker;
exports.default = _default;