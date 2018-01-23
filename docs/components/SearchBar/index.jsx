import React from 'react';
import PropTypes from 'prop-types';
import { SearchBar } from '../../../src';
import './styles.scss';

class SearchBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarString: '',
    };
    this.handleStringChange = searchBarString => {
      this.setState({ searchBarString: searchBarString.trim() });
    };
  }

  render() {
    return (
      <SearchBar
        additionalClassNames={['adslot-ui-searchbar']}
        searchString={this.state.searchBarString}
        searchPlaceholder="Search for component."
        searchIconHref="./docs/assets/svg-symbols.svg#search"
        onSearchStringChange={this.handleStringChange}
        onSearch={() => this.props.onSearch(this.state.searchBarString)}
      />
    );
  }
}

SearchBarComponent.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBarComponent;
