import _ from 'lodash';
import { Spinner } from 'adslot-ui';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.debounceOnSearch = _.debounce(props.onSearch, props.debounceInterval);
  }

  onChange(event) {
    const eventValue = _.get(event, 'target.value');
    const { onChange, searchOnEnter } = this.props;
    if (onChange) {
      onChange(eventValue);
    } else {
      this.setState({ value: eventValue });
    }
    if (!searchOnEnter) {
      this.onSearch(eventValue);
    }
  }

  onClear() {
    const { onChange, searchOnEnter, onClear } = this.props;
    const emptyValue = '';

    if (onChange) {
      onChange(emptyValue);
    } else {
      this.setState({ value: '' });
    }
    if (!searchOnEnter) this.onSearch(emptyValue);
    if (onClear) onClear(emptyValue);
  }

  onKeyPress(event) {
    const { searchOnEnter } = this.props;
    if (searchOnEnter && event.key === 'Enter') {
      event.preventDefault();
      this.onSearch(_.get(event, 'target.value'));
    }
  }

  onSearch(searchValue) {
    const { onSearch, debounceInterval } = this.props;
    const search = debounceInterval ? this.debounceOnSearch : onSearch;
    search(searchValue);
  }

  onSearchButtonClick(event) {
    event.preventDefault();
    const searchValue = this.props.value || this.state.value;
    this.onSearch(searchValue);
  }

  render() {
    const { className, disabled, dts, icons, isLoading, onChange, placeholder, searchOnEnter, value } = this.props;

    const inputValue = value || this.state.value;

    if (value && !onChange)
      console.warn(
        'Failed prop type: You have provided a `value` prop to Search Component without an `onChange` handler. This will render a read-only field.'
      );

    const searchIcon = icons.search ? icons.search : <div className="search-icon" />;
    const closeIcon = icons.close ? icons.close : <div className="cancel-icon" />;
    const loaderIcon = icons.loader ? icons.loader : <Spinner size="small" />;
    const isValueEmpty = _.isEmpty(value) && _.isEmpty(this.state.value);

    return (
      <div className={classnames('aui--search-component', className)} data-test-selector={dts}>
        <input
          autoComplete="off"
          className="aui--search-component-input"
          disabled={disabled}
          name="search"
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          placeholder={placeholder}
          type="search"
          value={inputValue}
        />
        {isLoading && !searchOnEnter && <span className="aui--search-component-spinner">{loaderIcon}</span>}
        {searchOnEnter && !isValueEmpty && (
          <span className="aui--search-component-icon with-button" onClick={this.onClear}>
            {closeIcon}
          </span>
        )}
        {searchOnEnter ? (
          <button className="aui--search-component-button" onClick={this.onSearchButtonClick}>
            {isLoading ? <span>{loaderIcon}</span> : <span>{searchIcon}</span>}
          </button>
        ) : (
          <span className="aui--search-component-icon" {...(isValueEmpty ? {} : { onClick: this.onClear })}>
            {isValueEmpty ? searchIcon : closeIcon}
          </span>
        )}
      </div>
    );
  }
}

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
};

Search.defaultProps = {
  debounceInterval: 0,
  disabled: false,
  isLoading: false,
  searchOnEnter: false,
  placeholder: '',
  value: '',
  icons: {},
};

export default Search;
