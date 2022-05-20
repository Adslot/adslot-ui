import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Search from '../Search';
import Checkbox from '../Checkbox';
import CheckboxGroup from '../CheckboxGroup';

var SearchableCheckList = function SearchableCheckList(_ref) {
  var context = _ref.context,
      items = _ref.items,
      selectedItemsKeys = _ref.selectedItemsKeys,
      displayCount = _ref.displayCount,
      placeholder = _ref.placeholder,
      _onChange = _ref.onChange;

  var _React$useState = React.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      searchText = _React$useState2[0],
      setSearchText = _React$useState2[1];

  var eligibleItems = searchText ? _(items).map(function (item) {
    return item.label.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ? item : null;
  }).compact().value() : items; // Select the checked items first

  var itemsToRender = _(eligibleItems).filter(function (_ref2) {
    var value = _ref2.value;
    return _.includes(selectedItemsKeys, value);
  }).slice(0, displayCount).value(); // Fill the rest of the items to display with un-selected items


  if (itemsToRender.length < displayCount) {
    var unSelectedItemsKeys = _.difference(_.map(eligibleItems, 'value'), selectedItemsKeys);

    var unSelectedItems = _.filter(eligibleItems, function (_ref3) {
      var value = _ref3.value;
      return _.includes(unSelectedItemsKeys, value);
    });

    itemsToRender = _.union(itemsToRender, _.slice(unSelectedItems, 0, displayCount - itemsToRender.length));
  }

  var mainCheckBoxState = selectedItemsKeys.length === 0 ? false : selectedItemsKeys.length === items.length ? true : 'partial';
  var singularLabel = context.singularLabel,
      pluralLabel = context.pluralLabel;
  var remainingItemsCount = items.length - itemsToRender.length;
  return /*#__PURE__*/React.createElement("div", {
    className: "aui--searchable-checklist"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aui--searchable-list-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, pluralLabel), /*#__PURE__*/React.createElement("div", {
    className: "search-box"
  }, /*#__PURE__*/React.createElement(Search, {
    onSearch: function onSearch(value) {
      setSearchText(value);
    },
    placeholder: placeholder
  })), /*#__PURE__*/React.createElement("div", {
    className: "main-checkbox"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: mainCheckBoxState,
    value: "all-".concat(pluralLabel),
    label: "All ".concat(pluralLabel),
    onChange: function onChange(nextState) {
      _onChange(nextState ? _.map(items, 'value') : []);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "items-container"
  }, /*#__PURE__*/React.createElement(CheckboxGroup, {
    name: "".concat(pluralLabel, "-group"),
    value: selectedItemsKeys,
    onChange: function onChange(newSelectionList) {
      _onChange(newSelectionList);
    }
  }, _.map(itemsToRender, function (_ref4) {
    var value = _ref4.value,
        label = _ref4.label;
    return /*#__PURE__*/React.createElement(Checkbox, {
      key: "".concat(value, "-key"),
      label: label,
      value: value,
      dts: "".concat(value, "-dts")
    });
  }))), remainingItemsCount > 0 && /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, "".concat(remainingItemsCount.toLocaleString(), " more ").concat(_.toLower(remainingItemsCount > 1 ? pluralLabel : singularLabel)))));
};

SearchableCheckList.propTypes = {
  /**
   * 	Context of the list displayed: {singularLabel: PropTypes.string, pluralLabel: PropTypes.string}
   */
  context: PropTypes.shape({
    singularLabel: PropTypes.string.isRequired,
    pluralLabel: PropTypes.string.isRequired
  }).isRequired,

  /**
   * 	List of items: { value: PropTypes.string, label: PropTypes.string }
   */
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })),

  /**
   * 	List of checked items value
   */
  selectedItemsKeys: PropTypes.arrayOf(PropTypes.string),

  /**
   * 	Search placeholder
   */
  placeholder: PropTypes.string,

  /**
   * 	Number of checkbox items to render
   */
  displayCount: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
SearchableCheckList.defaultProps = {
  selectedItemsKeys: [],
  displayCount: 6,
  placeholder: 'Search'
};
export default SearchableCheckList;