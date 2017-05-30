import _ from 'lodash';
import React, { PropTypes } from 'react';
import SvgSymbol from 'components/alexandria/SvgSymbol';
import './styles.scss';

const Search = ({
  disabled,
  onChange,
  onClear,
  placeholder,
  svgSymbolCancel,
  svgSymbolSearch,
  value,
}) => {
  const searchClassSuffixes = !disabled ? svgSymbolSearch.classSuffixes : ['color-disabled'];
  const cancelClassSuffixes = !disabled ? svgSymbolCancel.classSuffixes : ['color-disabled'];
  const onChangeBound = !disabled ? (event) => onChange(_.get(event, 'target.value')) : null;
  const mappedOnClear = !disabled ? onClear : null;

  return (
    <div className="search-component">
      <input
        autoComplete="off"
        className="search-component-input"
        disabled={disabled}
        name="search"
        onChange={onChangeBound}
        placeholder={`Search ${placeholder}`}
        type="search"
        value={value}
      />
      {_.isEmpty(value) ?
        <SvgSymbol href={svgSymbolSearch.href} classSuffixes={searchClassSuffixes} />
      :
        <SvgSymbol href={svgSymbolCancel.href} classSuffixes={cancelClassSuffixes} onClick={mappedOnClear} />
      }
    </div>
  );
};

Search.displayName = 'AlexandriaSearchComponent';

Search.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  svgSymbolCancel: PropTypes.shape(SvgSymbol.propTypes),
  svgSymbolSearch: PropTypes.shape(SvgSymbol.propTypes),
  value: PropTypes.string.isRequired,
};

Search.defaultProps = {
  disabled: false,

  onChange: () => { throw new Error('Alexandria Search needs an onChange handler'); },

  onClear: () => { throw new Error('Alexandria Search needs an onClear handler'); },

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
};

export default Search;
