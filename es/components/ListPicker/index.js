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

const isSubset = (array, subArray) => _(subArray).difference(array).isEmpty();

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
    return _.isEmpty(selectedItems);
  };

  const [selectedItems, setSelectedItems] = React.useState(initialSelection);
  const [disableApplyButton, setDisableApplyButton] = React.useState(getApplyButtonState(initialSelection));

  const selectItem = item => {
    const newSelectedItems = allowMultiSelection ? [...selectedItems, item] : [item];
    setSelectedItems(newSelectedItems);
    setDisableApplyButton(getApplyButtonState(newSelectedItems));
  };

  const deselectItem = item => {
    const updatedItems = _.reject(selectedItems, {
      id: item.id
    });

    setSelectedItems(updatedItems);
    setDisableApplyButton(getApplyButtonState(selectedItems));
  };

  const cancelAction = () => {
    modalClose();
    setSelectedItems(_.clone(initialSelection));
    setDisableApplyButton(getApplyButtonState(initialSelection));
  };

  const applyAction = () => {
    modalApply(selectedItems);
  };

  const listPickerPureElement = /*#__PURE__*/React.createElement(ListPickerPure, {
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
  return show && /*#__PURE__*/React.createElement(ActionPanel, {
    isModal: true,
    className: modalClassName,
    title: modalTitle,
    onClose: cancelAction,
    actionButton: /*#__PURE__*/React.createElement(React.Fragment, null, _.isEmpty(linkButtons) ? null : /*#__PURE__*/React.createElement("div", {
      className: "pull-left"
    }, _.map(linkButtons, (linkButton, key) => _.isObject(linkButton) && isSubset(_.keys(linkButton), ['label', 'href']) ? /*#__PURE__*/React.createElement(Anchor, {
      key: linkButton.label,
      variant: "inverse",
      href: linkButton.href
    }, linkButton.label) : /*#__PURE__*/React.cloneElement(linkButton, {
      key
    }))), /*#__PURE__*/React.createElement(Button, {
      color: "primary",
      onClick: applyAction,
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
  }, /*#__PURE__*/React.createElement(GridCell, null, itemInfo.label)), _.map(itemInfo.properties, property => /*#__PURE__*/React.createElement(GridRow, {
    key: property.label,
    horizontalBorder: false
  }, /*#__PURE__*/React.createElement(GridCell, {
    classSuffixes: ['label']
  }, property.label), /*#__PURE__*/React.createElement(GridCell, {
    classSuffixes: ['value'],
    dts: _.kebabCase(property.label),
    stretch: true
  }, property.value)))), /*#__PURE__*/React.createElement(FlexibleSpacer, null)), /*#__PURE__*/React.createElement(SplitPane, null, listPickerPureElement, /*#__PURE__*/React.createElement(FlexibleSpacer, null))), modalFootnote ? /*#__PURE__*/React.createElement("div", {
    className: "listpicker-component-footnote"
  }, modalFootnote) : null);
};

const itemProps = PropTypes.shape({
  id: PropTypes.number.isRequired
});
const linkButtonsProps = PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
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
export default ListPicker;