import React, { PropTypes } from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/lib/Button';
import { FlexibleSpacer, SvgSymbol } from 'alexandria-adslot';

require('styles/adslotUi/CategorySearch.scss');

const CategorySearchComponent = ({
  category,
  categoryOptions,
  onCategorySelect,
  searchString,
  searchPlaceholder,
  onSearchStringChange,
  onSearchButtonClick,
}) => {
  const placeholder = searchPlaceholder || 'Search';
  const onCategorySelectBound = (option) => onCategorySelect(option.value);
  const onSearchStringChangeBound = (event) => onSearchStringChange(event.target.value);

  return (
    <div className="category-search-component">
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
        placeholder={placeholder}
        type="text"
        value={searchString}
      />
      <Button
        className="category-search-component-button"
        bsStyle="primary"
        onClick={onSearchButtonClick}
      >
        <span className="flexible-wrapper-inline">
          <FlexibleSpacer />
          <SvgSymbol href="/assets/svg-symbols.svg#search" />
          <FlexibleSpacer />
        </span>
      </Button>
    </div>
  );
};

CategorySearchComponent.propTypes = {
  category: PropTypes.string.isRequired,
  categoryOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  onCategorySelect: PropTypes.func.isRequired,
  searchString: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string,
  onSearchStringChange: PropTypes.func.isRequired,
  onSearchButtonClick: PropTypes.func.isRequired,
};

export default CategorySearchComponent;
