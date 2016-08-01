import React, { PropTypes } from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/lib/Button';
import { FlexibleSpacer, SvgSymbol } from 'alexandria-adslot';

require('styles/adslotUi/CategorySearch.scss');

const CategorySearchComponent = ({
  additionalClassNames,
  category,
  categoryOptions,
  onCategorySelect,
  searchString,
  searchPlaceholder,
  onSearchStringChange,
  onSearchButtonClick,
  dts,
}) => {
  const className = ['category-search-component'].concat(additionalClassNames).join(' ');
  const placeholder = searchPlaceholder || 'Search';
  const onCategorySelectBound = (option) => onCategorySelect(option.value);
  const onSearchStringChangeBound = (event) => onSearchStringChange(event.target.value);

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
  onSearchButtonClick: PropTypes.func.isRequired,
  dts: PropTypes.string,
};

CategorySearchComponent.defaultProps = {
  additionalClassNames: [],
};

export default CategorySearchComponent;
