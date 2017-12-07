import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import {
  SearchBar,
} from '../../../src/dist-entry';
import './styles.scss';

class SearchBarComponent extends React.Component {
=======
import _ from 'lodash';
import {
  SearchBar,
} from '../../../src/dist-entry';
import './styles.scss';

class SearchBarUI extends React.Component {
>>>>>>> 248c9c7... Docs: Add searchbar component
  constructor(props) {
    super(props);
    this.state = {
      searchBarString: '',
    };
<<<<<<< HEAD
<<<<<<< HEAD
    this.handleStringChange = (searchBarString) => {
      this.setState({ searchBarString: searchBarString.trim() });
    };
=======
    this.handleStringChange = this.handleStringChange.bind(this);
  }

  handleStringChange(searchBarString) {
    this.setState({ searchBarString });
>>>>>>> 248c9c7... Docs: Add searchbar component
=======
    this.handleStringChange = (searchBarString) => {
      this.setState({ searchBarString: searchBarString.trim() });
    }
>>>>>>> 38bb043... Docs: Add search result card
  }

  render() {
    return (
      <SearchBar
        additionalClassNames={['adslot-ui-searchbar']}
        searchString={this.state.searchBarString}
        searchPlaceholder="Search for component."
        searchIconHref="./docs/assets/svg-symbols.svg#search"
        onSearchStringChange={this.handleStringChange}
<<<<<<< HEAD
<<<<<<< HEAD
        onSearch={() => this.props.onSearch(this.state.searchBarString)}
      />
    );
  }
}

SearchBarComponent.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBarComponent;
=======
        onSearch={() => this.props.searchCB(this.state.searchBarString)}
=======
        onSearch={() => this.props.onSearch(this.state.searchBarString)}
>>>>>>> 71f002d... Docs: Changes based on reviews
      />
    )
  }
}

SearchBarUI.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default SearchBarUI
>>>>>>> 248c9c7... Docs: Add searchbar component
