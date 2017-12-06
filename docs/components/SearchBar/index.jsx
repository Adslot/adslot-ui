import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  SearchBar,
} from '../../../src/dist-entry';
import './styles.scss';

class SearchBarUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarString: '',
    };
    this.handleStringChange = (searchBarString) => {
      this.setState({ searchBarString: searchBarString.trim() });
    }
  }

  render() {
    return (
      <SearchBar
        additionalClassNames={['adslot-ui-searchbar']}
        searchString={this.state.searchBarString}
        searchPlaceholder="Search for component."
        searchIconHref="./docs/assets/svg-symbols.svg#search"
        onSearchStringChange={this.handleStringChange}
        onSearch={() => this.props.searchCB(this.state.searchBarString)}
      />
    )
  }
}

SearchBarUI.propTypes = {
  searchCB: PropTypes.func.isRequired
}

export default SearchBarUI
