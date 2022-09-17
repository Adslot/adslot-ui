import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Search from '../Search';
import Checkbox from '../Checkbox';
import CheckboxGroup from '../CheckboxGroup';
import TextEllipsis from '../TextEllipsis';
import './styles.css';

const ALL_OPTION = {
  value: 'all-option',
  label: 'All',
};

const SearchableCheckList = ({
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
  footerText,
}) => {
  const [searchText, setSearchText] = React.useState('');

  const eligibleItems = _.reject(items, (item) => _.isEqual(item.value, ALL_OPTION.value)); // all-value is a reserved checkbox value;
  const itemKeys = _.includes(selectedItemsKeys, ALL_OPTION.value) ? [ALL_OPTION.value] : selectedItemsKeys;

  const filteredItems = searchText
    ? _(eligibleItems)
        .map((item) => {
          return item.label.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ? item : null;
        })
        .compact()
        .value()
    : eligibleItems;

  // Select the checked items first
  let itemsToRender = _(filteredItems)
    .filter(({ value }) => _.includes(itemKeys, value))
    .slice(0, displayCount)
    .value();

  // Fill the rest of the items to display with un-selected items
  if (itemsToRender.length < displayCount) {
    const unSelectedItemsKeys = _.difference(_.map(filteredItems, 'value'), itemKeys);
    const unSelectedItems = _.filter(filteredItems, ({ value }) => _.includes(unSelectedItemsKeys, value));
    itemsToRender = _.union(itemsToRender, _.slice(unSelectedItems, 0, displayCount - itemsToRender.length));
  }

  const { singularLabel, pluralLabel } = context;
  const remainingItemsCount = eligibleItems.length - itemsToRender.length;

  return (
    <div className="aui--searchable-checklist">
      <div className="aui--searchable-list-container">
        {!hideTitle && (
          <div className="title" data-testid="searchable-list-title">
            {pluralLabel}
          </div>
        )}
        <div className="search-box">
          <Search
            showSearchButton={showSearchButton}
            searchOnEnter={searchOnEnter}
            onClear={onClear}
            onSearch={(value) => {
              if (_.isNil(onSearch)) {
                setSearchText(value);
              } else {
                onSearch(value);
              }
            }}
            placeholder={placeholder}
          />
        </div>
        <div className="main-checkbox">
          <Checkbox
            checked={_.includes(itemKeys, ALL_OPTION.value)}
            value={ALL_OPTION.value}
            label={ALL_OPTION.label}
            onChange={(nextState) => {
              onChange(nextState ? [ALL_OPTION.value] : []);
            }}
          />
        </div>
        <div className="items-container">
          <CheckboxGroup
            name={`${pluralLabel}-group`}
            value={itemKeys}
            onChange={(newSelectionList) => {
              onChange(_.reject(newSelectionList, (value) => value === ALL_OPTION.value));
            }}
          >
            {_.map(itemsToRender, ({ value, label }) => (
              <Checkbox
                key={`${value}-key`}
                label={<TextEllipsis>{label}</TextEllipsis>}
                value={value}
                dts={`${value}-dts`}
              />
            ))}
          </CheckboxGroup>
        </div>
        {(!_.isEmpty(footerText) || remainingItemsCount > 0) && (
          <div className="footer" data-testid="footer-section">
            {!_.isEmpty(footerText)
              ? footerText
              : `${remainingItemsCount.toLocaleString()} more ${_.toLower(
                  remainingItemsCount > 1 ? pluralLabel : singularLabel
                )}`}
          </div>
        )}
      </div>
    </div>
  );
};

SearchableCheckList.propTypes = {
  /**
   * 	Context of the list displayed: {singularLabel: PropTypes.string, pluralLabel: PropTypes.string}
   */
  context: PropTypes.shape({
    singularLabel: PropTypes.string.isRequired,
    pluralLabel: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * 	List of items: { value: PropTypes.string, label: PropTypes.string }
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
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
  footerText: PropTypes.string,
};

SearchableCheckList.defaultProps = {
  selectedItemsKeys: [],
  displayCount: 6,
  hideTitle: false,
  placeholder: 'Search',
  searchOnEnter: false,
  onClear: _.noOp,
  showSearchButton: true,
};

export default SearchableCheckList;
