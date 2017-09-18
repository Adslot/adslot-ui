import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SvgSymbol from 'components/alexandria/SvgSymbol/index';
import Spinner from 'components/alexandria/Spinner/index';
import './styles.scss';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.debounceOnSearch = _.debounce(props.onSearch, props.debounceInterval);
    this.defaultValue = props.value;

    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onChange(event) {
    const { disabled, searchOnChange, onChange } = this.props;
    if (disabled) return;

    const value = _.get(event, 'target.value');
    onChange(value);
    if (searchOnChange) this.debounceOnSearch(value);
  }

  onKeyPress(event) {
    const { disabled, searchOnEnterKey, onSearch } = this.props;
    if (disabled) return;

    if (searchOnEnterKey && event.which === 13) {
      const value = _.get(event, 'target.value');
      onSearch(value);
    }
  }

  onClear() {
    const { disabled, onChange, onClear, onSearch, searchOnChange } = this.props;
    if (disabled) return;

    const value = '';

    onChange(value);
    if (searchOnChange) {
      onSearch(value);
    }
    onClear(value);
  }

  render() {
    const { disabled, isLoading, placeholder, svgSymbolCancel, svgSymbolSearch, value } = this.props;
    const searchClassSuffixes = disabled ? ['color-disabled'] : svgSymbolSearch.classSuffixes;
    const cancelClassSuffixes = disabled ? ['color-disabled'] : svgSymbolCancel.classSuffixes;

    return (
      <div className="search-component">
        <input
          autoComplete="off"
          className="search-component-input"
          disabled={disabled}
          name="search"
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          placeholder={`Search ${placeholder}`}
          type="search"
          value={value}
          defaultValue={this.defaultValue}
        />
        {isLoading ? <Spinner size="small" /> : null}
        {_.isEmpty(value)
          ? <SvgSymbol href={svgSymbolSearch.href} classSuffixes={searchClassSuffixes} />
          : <SvgSymbol href={svgSymbolCancel.href} classSuffixes={cancelClassSuffixes} onClick={this.onClear} />
        }
      </div>
    );
  }
}

Search.displayName = 'AdslotUiSearchComponent';

Search.propTypes = {
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  svgSymbolCancel: PropTypes.shape(SvgSymbol.propTypes),
  svgSymbolSearch: PropTypes.shape(SvgSymbol.propTypes),
  value: PropTypes.string,
  searchOnChange: PropTypes.bool,
  searchOnEnterKey: PropTypes.bool,
  debounceInterval: PropTypes.number,
};

Search.defaultProps = {
  disabled: false,
  isLoading: false,
  onChange: _.noop,
  onClear: _.noop,
  onSearch: _.noop,
  placeholder: '',
  svgSymbolCancel: {
    classSuffixes: ['gray-darker'],
    href: '/assets/svg-symbols.svg#cancel',
  },
  svgSymbolSearch: {
    classSuffixes: ['gray-light'],
    href: '/assets/svg-symbols.svg#search',
  },
  value: '',
  searchOnChange: true,
  searchOnEnterKey: false,
  debounceInterval: 0,
};

