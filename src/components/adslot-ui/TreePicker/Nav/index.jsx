import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Search from 'adslot-ui/Search';
import Breadcrumb from 'alexandria/Breadcrumb';
import SvgSymbol from 'alexandria/SvgSymbol';
import TreePickerPropTypes from '../../../prop-types/TreePickerPropTypes';

require('./styles.scss');

const TreePickerNavComponent = ({
  breadcrumbNodes,
  breadcrumbOnClick,
  debounceInterval,
  disabled,
  isLoading,
  onClear,
  onChange,
  onSearch,
  searchOnEnter,
  searchPlaceholder,
  searchValue,
  svgSymbolCancel,
  svgSymbolSearch,
}) => {
  const icons = {};
  if (svgSymbolSearch)
    icons.search = <SvgSymbol href={svgSymbolSearch.href} classSuffixes={svgSymbolSearch.classSuffixes} />;
  if (svgSymbolCancel)
    icons.close = <SvgSymbol href={svgSymbolCancel.href} classSuffixes={svgSymbolCancel.classSuffixes} />;

  return (
    <div className={`treepickernav-component ${disabled ? 'disabled' : ''}`} data-test-selector="treepicker-nav-search">
      <Search
        disabled={disabled}
        debounceInterval={debounceInterval}
        isLoading={isLoading}
        onClear={onClear}
        onChange={onChange}
        onSearch={onSearch}
        searchOnEnter={searchOnEnter}
        icons={icons}
        value={searchValue}
        placeholder={searchPlaceholder || 'Search'}
      />
      <Breadcrumb disabled={disabled} nodes={breadcrumbNodes} onClick={breadcrumbOnClick} />
    </div>
  );
};

TreePickerNavComponent.displayName = 'AdslotUiTreePickerNavComponent';
TreePickerNavComponent.propTypes = {
  breadcrumbNodes: PropTypes.arrayOf(TreePickerPropTypes.breadCrumbNode),
  breadcrumbOnClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onSearch: PropTypes.func,
  debounceInterval: PropTypes.number,
  searchOnEnter: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  svgSymbolCancel: PropTypes.shape(SvgSymbol.propTypes),
  svgSymbolSearch: PropTypes.shape(SvgSymbol.propTypes),
};

TreePickerNavComponent.defaultProps = {
  debounceInterval: 0,
  disabled: false,
  isLoading: false,
  searchOnEnter: false,
  searchPlaceholder: '',
  onSearch: _.noop,
};

export default TreePickerNavComponent;
