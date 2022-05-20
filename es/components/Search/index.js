import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';
import Spinner from '../Spinner';
var Search = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      debounceInterval = _ref.debounceInterval,
      disabled = _ref.disabled,
      dts = _ref.dts,
      icons = _ref.icons,
      isLoading = _ref.isLoading,
      onBlur = _ref.onBlur,
      onChange = _ref.onChange,
      onClear = _ref.onClear,
      onSearch = _ref.onSearch,
      placeholder = _ref.placeholder,
      searchOnEnter = _ref.searchOnEnter,
      value = _ref.value,
      showSearchButton = _ref.showSearchButton;

  var _React$useState = React.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      inputValue = _React$useState2[0],
      setInputValue = _React$useState2[1];

  var onInputChange = function onInputChange(event) {
    var eventValue = _.get(event, 'target.value');

    if (onChange) {
      onChange(eventValue);
    } else {
      setInputValue(eventValue);
    }

    if (!searchOnEnter) {
      onInputSearch(eventValue);
    }
  };

  var onInputClear = function onInputClear() {
    var emptyValue = '';

    if (onChange) {
      onChange(emptyValue);
    } else {
      setInputValue('');
    }

    if (!searchOnEnter) onInputSearch(emptyValue);
    if (onClear) onClear(emptyValue);
  };

  var onKeyPress = function onKeyPress(event) {
    if (searchOnEnter && event.key === 'Enter') {
      event.preventDefault();
      onInputSearch(_.get(event, 'target.value'));
    }
  };

  var onInputSearch = function onInputSearch(searchValue) {
    var search = debounceInterval ? _.debounce(onSearch, debounceInterval) : onSearch;
    search(searchValue);
  };

  var onSearchButtonClick = function onSearchButtonClick(event) {
    event.preventDefault();
    var searchValue = value || inputValue;
    onInputSearch(searchValue);
  };

  var currentInputValue = value || inputValue;
  if (value && !onChange) console.warn('Failed prop type: You have provided a `value` prop to Search Component without an `onChange` handler. This will render a read-only field.');
  var searchIcon = icons.search ? icons.search : /*#__PURE__*/React.createElement("div", {
    className: "search-icon"
  });
  var closeIcon = icons.close ? icons.close : /*#__PURE__*/React.createElement("div", {
    className: "cancel-icon"
  });
  var loaderIcon = icons.loader ? icons.loader : /*#__PURE__*/React.createElement(Spinner, {
    size: "small"
  });

  var isValueEmpty = _.isEmpty(value) && _.isEmpty(inputValue);

  return /*#__PURE__*/React.createElement("div", {
    className: classnames('aui--search-component', className),
    "data-test-selector": dts
  }, /*#__PURE__*/React.createElement("input", {
    ref: ref,
    autoComplete: "off",
    className: "aui--search-component-input",
    disabled: disabled,
    name: "search",
    onChange: onInputChange,
    onKeyPress: onKeyPress,
    placeholder: placeholder,
    type: "search",
    value: currentInputValue,
    onBlur: onBlur
  }), isLoading && !searchOnEnter && /*#__PURE__*/React.createElement("span", {
    className: "aui--search-component-spinner"
  }, loaderIcon), searchOnEnter && showSearchButton ? /*#__PURE__*/React.createElement(React.Fragment, null, !isValueEmpty && /*#__PURE__*/React.createElement("span", {
    className: "aui--search-component-icon with-button",
    onClick: onInputClear
  }, closeIcon), /*#__PURE__*/React.createElement(Button, {
    className: "aui--search-component-button",
    "aria-label": "Search",
    icon: isLoading ? /*#__PURE__*/React.createElement("span", null, loaderIcon) : /*#__PURE__*/React.createElement("span", null, searchIcon),
    onClick: onSearchButtonClick
  })) : /*#__PURE__*/React.createElement("span", Object.assign({
    className: "aui--search-component-icon"
  }, isValueEmpty ? {} : {
    onClick: onInputClear
  }), isValueEmpty ? searchIcon : closeIcon));
});
Search.propTypes = {
  className: PropTypes.string,

  /**
   * 	Milliseconds
   */
  debounceInterval: PropTypes.number,

  /**
   * 	Determine whether the text area is disabled
   */
  disabled: PropTypes.bool,

  /**
   * 	Render `data-test-selector` onto the component. It can be useful for testing
   */
  dts: PropTypes.string,

  /**
   * 	{ search: React.Node, loader: React.Node, close: React.Node }
   */
  icons: PropTypes.shape({
    search: PropTypes.node,
    loader: PropTypes.node,
    close: PropTypes.node
  }),
  isLoading: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClear: PropTypes.func,

  /**
   * 	Required
   */
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,

  /**
   * 	Determines whether onSearch() will be fired on ENTER key press (Default behaviour is to fire onSearch() when the input changes)
   */
  searchOnEnter: PropTypes.bool,
  value: PropTypes.string,

  /**
   * 	Determines whether displaying the search button or not
   */
  showSearchButton: PropTypes.bool
};
Search.defaultProps = {
  debounceInterval: 0,
  disabled: false,
  isLoading: false,
  searchOnEnter: false,
  placeholder: '',
  value: '',
  icons: {},
  showSearchButton: true
};
export default Search;