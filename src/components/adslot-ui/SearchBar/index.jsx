import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import SvgSymbol from 'alexandria/SvgSymbol';

require('./styles.scss');

const SearchBarComponent = ({
  additionalClassNames,
  searchString,
  searchPlaceholder,
  searchIconHref,
  onSearchStringChange,
  onSearch,
  dts,
}) => {
  const className = ['search-bar-component'].concat(additionalClassNames).join(' ');
  const placeholder = searchPlaceholder || 'Search';
  const onSearchStringChangeBound = event => onSearchStringChange(event.target.value);
  const onTextInputKeyPress = event => {
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
      <input
        className="search-bar-component-text-input form-control"
        onChange={onSearchStringChangeBound}
        onKeyPress={onTextInputKeyPress}
        placeholder={placeholder}
        type="text"
        value={searchString}
      />
      <Button className="search-bar-component-button btn-inverse" bsStyle="primary" onClick={onSearch}>
        <SvgSymbol classSuffixes={['search-icon']} href={searchIconHref} />
      </Button>
    </div>
  );
};

SearchBarComponent.propTypes = {
  additionalClassNames: PropTypes.arrayOf(PropTypes.string),
  searchString: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string,
  searchIconHref: PropTypes.string.isRequired,
  onSearchStringChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  dts: PropTypes.string,
};

SearchBarComponent.defaultProps = {
  additionalClassNames: [],
};

export default SearchBarComponent;
