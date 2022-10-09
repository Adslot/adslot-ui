import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';
import Spinner from '../Spinner';
import './styles.css';

const Search = React.forwardRef(
  (
    {
      className,
      debounceInterval,
      disabled,
      dts,
      icons,
      isLoading,
      onBlur,
      onChange,
      onClear,
      onSearch,
      placeholder,
      searchOnEnter,
      value,
      showSearchButton,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState('');

    const onInputChange = (event) => {
      const eventValue = _.get(event, 'target.value');
      if (onChange) {
        onChange(eventValue);
      } else {
        setInputValue(eventValue);
      }
      if (!searchOnEnter) {
        onInputSearch(eventValue);
      }
    };

    const onInputClear = () => {
      const emptyValue = '';

      if (onChange) {
        onChange(emptyValue);
      } else {
        setInputValue('');
      }
      if (!searchOnEnter) onInputSearch(emptyValue);
      if (onClear) onClear(emptyValue);
    };

    const onKeyPress = (event) => {
      if (searchOnEnter && event.key === 'Enter') {
        event.preventDefault();
        onInputSearch(_.get(event, 'target.value'));
      }
    };

    const onInputSearch = (searchValue) => {
      const search = debounceInterval ? _.debounce(onSearch, debounceInterval) : onSearch;
      search(searchValue);
    };

    const onSearchButtonClick = (event) => {
      event.preventDefault();
      const searchValue = value || inputValue;
      onInputSearch(searchValue);
    };

    const currentInputValue = value || inputValue;

    if (value && !onChange)
      console.warn(
        'Failed prop type: You have provided a `value` prop to Search Component without an `onChange` handler. This will render a read-only field.'
      );

    const searchIcon = icons.search ? icons.search : <div data-testid="search-icon" className="search-icon" />;
    const closeIcon = icons.close ? icons.close : <div data-testid="close-icon" className="cancel-icon" />;
    const loaderIcon = icons.loader ? icons.loader : <Spinner size="small" />;
    const isValueEmpty = _.isEmpty(value) && _.isEmpty(inputValue);
    const searchIconValue = isValueEmpty ? {} : { onClick: onInputClear };

    return (
      <div
        data-testid="search-wrapper"
        className={classnames('aui--search-component', className)}
        data-test-selector={dts}
      >
        <input
          ref={ref}
          data-testid="search-input"
          autoComplete="off"
          className="aui--search-component-input"
          disabled={disabled}
          name="search"
          onChange={onInputChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          type="search"
          value={currentInputValue}
          onBlur={onBlur}
        />
        {isLoading && !searchOnEnter && <span className="aui--search-component-spinner">{loaderIcon}</span>}

        {searchOnEnter && showSearchButton ? (
          <>
            {!isValueEmpty && (
              <span className="aui--search-component-icon with-button" onClick={onInputClear}>
                {closeIcon}
              </span>
            )}
            <Button
              data-testid="search-button"
              className="aui--search-component-button"
              aria-label="Search"
              icon={isLoading ? <span>{loaderIcon}</span> : <span>{searchIcon}</span>}
              onClick={onSearchButtonClick}
            />
          </>
        ) : (
          <span data-testid="search-icon-wrapper" className="aui--search-component-icon" {...searchIconValue}>
            {isValueEmpty ? searchIcon : closeIcon}
          </span>
        )}
      </div>
    );
  }
);

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
    close: PropTypes.node,
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
  showSearchButton: PropTypes.bool,
};

Search.defaultProps = {
  debounceInterval: 0,
  disabled: false,
  isLoading: false,
  searchOnEnter: false,
  placeholder: '',
  value: '',
  icons: {},
  showSearchButton: true,
};

export default Search;
