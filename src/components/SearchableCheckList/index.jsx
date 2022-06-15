import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Search from '../Search';
import Checkbox from '../Checkbox';
import CheckboxGroup from '../CheckboxGroup';
import './styles.css';

const SearchableCheckList = ({ context, items, selectedItemsKeys, displayCount, placeholder, onChange }) => {
  const [searchText, setSearchText] = React.useState('');

  const eligibleItems = searchText
    ? _(items)
        .map((item) => {
          return item.label.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ? item : null;
        })
        .compact()
        .value()
    : items;

  // Select the checked items first
  let itemsToRender = _(eligibleItems)
    .filter(({ value }) => _.includes(selectedItemsKeys, value))
    .slice(0, displayCount)
    .value();

  // Fill the rest of the items to display with un-selected items
  if (itemsToRender.length < displayCount) {
    const unSelectedItemsKeys = _.difference(_.map(eligibleItems, 'value'), selectedItemsKeys);
    const unSelectedItems = _.filter(eligibleItems, ({ value }) => _.includes(unSelectedItemsKeys, value));
    itemsToRender = _.union(itemsToRender, _.slice(unSelectedItems, 0, displayCount - itemsToRender.length));
  }

  const mainCheckBoxState =
    selectedItemsKeys.length === 0 ? false : selectedItemsKeys.length === items.length ? true : 'partial';

  const { singularLabel, pluralLabel } = context;
  const remainingItemsCount = items.length - itemsToRender.length;

  return (
    <div className="aui--searchable-checklist">
      <div className="aui--searchable-list-container">
        <div className="title" data-testid="searchable-list-title">
          {pluralLabel}
        </div>
        <div className="search-box">
          <Search
            onSearch={(value) => {
              setSearchText(value);
            }}
            placeholder={placeholder}
          />
        </div>
        <div className="main-checkbox">
          <Checkbox
            checked={mainCheckBoxState}
            value={`all-${pluralLabel}`}
            label={`All ${pluralLabel}`}
            onChange={(nextState) => {
              onChange(nextState ? _.map(items, 'value') : []);
            }}
          />
        </div>
        <div className="items-container">
          <CheckboxGroup
            name={`${pluralLabel}-group`}
            value={selectedItemsKeys}
            onChange={(newSelectionList) => {
              onChange(newSelectionList);
            }}
          >
            {_.map(itemsToRender, ({ value, label }) => (
              <Checkbox key={`${value}-key`} label={label} value={value} dts={`${value}-dts`} />
            ))}
          </CheckboxGroup>
        </div>
        {remainingItemsCount > 0 && (
          <div
            className="footer"
            data-testid="footer-section"
          >{`${remainingItemsCount.toLocaleString()} more ${_.toLower(
            remainingItemsCount > 1 ? pluralLabel : singularLabel
          )}`}</div>
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
  onChange: PropTypes.func.isRequired,
};

SearchableCheckList.defaultProps = {
  selectedItemsKeys: [],
  displayCount: 6,
  placeholder: 'Search',
};

export default SearchableCheckList;
