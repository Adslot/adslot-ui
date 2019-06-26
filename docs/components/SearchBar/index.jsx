import React from 'react';
import PropTypes from 'prop-types';
import { Search } from '../../../src';
import './styles.scss';

const SearchBarComponent = ({ onSearch }) => (
  <Search
    className="adslot-ui-searchbar"
    placeholder="Search for component"
    onSearch={value => onSearch(value.trim())}
    searchOnEnter
  />
);

SearchBarComponent.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBarComponent;
