import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Search from '../Search';
import Checkbox from '../Checkbox';
import CheckboxGroup from '../CheckboxGroup';

const SearchableCheckList = _ref => {
  let {
    context,
    items,
    selectedItemsKeys,
    displayCount,
    hideTitle,
    placeholder,
    onChange,
    onSearch,
    searchOnEnter,
    onClear,
    showSearchButton,
    footerText
  } = _ref;
  const [searchText, setSearchText] = React.useState('');
  const eligibleItems = searchText ? _(items).map(item => {
    return item.label.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ? item : null;
  }).compact().value() : items; // Select the checked items first

  let itemsToRender = _(eligibleItems).filter(_ref2 => {
    let {
      value
    } = _ref2;
    return _.includes(selectedItemsKeys, value);
  }).slice(0, displayCount).value(); // Fill the rest of the items to display with un-selected items


  if (itemsToRender.length < displayCount) {
    const unSelectedItemsKeys = _.difference(_.map(eligibleItems, 'value'), selectedItemsKeys);

    const unSelectedItems = _.filter(eligibleItems, _ref3 => {
      let {
        value
      } = _ref3;
      return _.includes(unSelectedItemsKeys, value);
    });

    itemsToRender = _.union(itemsToRender, _.slice(unSelectedItems, 0, displayCount - itemsToRender.length));
  }

  const selectedItemsKeysLength = selectedItemsKeys.length === items.length ? true : 'partial';
  const mainCheckBoxState = selectedItemsKeys.length === 0 ? false : selectedItemsKeysLength;
  const {
    singularLabel,
    pluralLabel
  } = context;
  const remainingItemsCount = items.length - itemsToRender.length;
  const footerLabel = remainingItemsCount > 1 ? pluralLabel : singularLabel;
  return /*#__PURE__*/React.createElement("div", {
    className: "aui--searchable-checklist"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aui--searchable-list-container"
  }, !hideTitle && /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, pluralLabel), /*#__PURE__*/React.createElement("div", {
    className: "search-box"
  }, /*#__PURE__*/React.createElement(Search, {
    showSearchButton: showSearchButton,
    searchOnEnter: searchOnEnter,
    onClear: onClear,
    onSearch: value => {
      if (_.isNil(onSearch)) {
        setSearchText(value);
      } else {
        onSearch(value);
      }
    },
    placeholder: placeholder
  })), /*#__PURE__*/React.createElement("div", {
    className: "main-checkbox"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: mainCheckBoxState,
    value: `all-${pluralLabel}`,
    label: `All ${pluralLabel}`,
    onChange: nextState => {
      onChange(nextState ? _.map(items, 'value') : []);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "items-container"
  }, /*#__PURE__*/React.createElement(CheckboxGroup, {
    name: `${pluralLabel}-group`,
    value: selectedItemsKeys,
    onChange: newSelectionList => {
      onChange(newSelectionList);
    }
  }, _.map(itemsToRender, _ref4 => {
    let {
      value,
      label
    } = _ref4;
    return /*#__PURE__*/React.createElement(CheckboxGroup.Item, {
      key: `${value}-key`,
      label: label,
      value: value,
      dts: `${value}-dts`
    });
  }))), (!_.isEmpty(footerText) || remainingItemsCount > 0) && /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, !_.isEmpty(footerText) ? footerText : `${remainingItemsCount.toLocaleString()} more ${_.toLower(footerLabel)}`)));
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

  /**
   * 	Hides the title
   */
  hideTitle: PropTypes.bool,
  onChange: PropTypes.func.isRequired,

  /**
   * 	Determines whether onSearch() will be fired on ENTER key press (Default behaviour is to fire onSearch() when the input changes)
   */
  searchOnEnter: PropTypes.bool,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
  showSearchButton: PropTypes.bool,
  footerText: PropTypes.string
};
SearchableCheckList.defaultProps = {
  selectedItemsKeys: [],
  displayCount: 6,
  hideTitle: false,
  placeholder: 'Search',
  searchOnEnter: false,
  onClear: _.noOp,
  showSearchButton: true
};
export default SearchableCheckList;