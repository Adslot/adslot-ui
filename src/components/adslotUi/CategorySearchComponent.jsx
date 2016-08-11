import React, { PropTypes } from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/lib/Button';

require('styles/adslotUi/CategorySearch.scss');

const CategorySearchComponent = ({
  additionalClassNames,
  category,
  categoryOptions,
  onCategorySelect,
  searchString,
  searchPlaceholder,
  onSearchStringChange,
  onSearch,
  dts,
}) => {
  const className = ['category-search-component'].concat(additionalClassNames).join(' ');
  const placeholder = searchPlaceholder || 'Search';
  const onCategorySelectBound = (option) => onCategorySelect(option.value);
  const onSearchStringChangeBound = (event) => onSearchStringChange(event.target.value);
  const onTextInputKeyPress = (event) => {
    const ENTER_KEY = 13;

    // event.keyCode always returns 0 on Chrome (a known bug), so we must do a check
    // for event.which as well. For more info on the bug, see this SO entry:
    // http://stackoverflow.com/questions/1897333/firing-a-keyboard-event-on-chrome
    if (event.which === ENTER_KEY || event.keyCode === ENTER_KEY) {
      onSearch();
    }
  };

  return (
    <div className={className} data-test-selector={dts}>
      <Select
        className="category-search-component-dropdown"
        clearable={false}
        onChange={onCategorySelectBound}
        options={categoryOptions}
        placeholder="Category"
        value={category}
        searchable={false}
        scrollMenuIntoView={false}
      />
      <input
        className="category-search-component-text-input form-control"
        onChange={onSearchStringChangeBound}
        onKeyPress={onTextInputKeyPress}
        placeholder={placeholder}
        type="text"
        value={searchString}
      />
      <Button
        className="category-search-component-button"
        bsStyle="primary"
        onClick={onSearch}
      >&nbsp;</Button>
    </div>
  );
};

CategorySearchComponent.propTypes = {
  additionalClassNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string.isRequired,
  categoryOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  onCategorySelect: PropTypes.func.isRequired,
  searchString: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string,
  onSearchStringChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  dts: PropTypes.string,
};

CategorySearchComponent.defaultProps = {
  additionalClassNames: [],
};

export default CategorySearchComponent;
