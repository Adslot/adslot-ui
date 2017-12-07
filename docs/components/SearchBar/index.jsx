import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
<<<<<<< HEAD
import {
  SearchBar,
} from '../../../src/dist-entry';
import './styles.scss';

class SearchBarComponent extends React.Component {
=======
import _ from 'lodash';
=======
>>>>>>> 64ae14f... Docs: Changes based on eslint
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
<<<<<<< HEAD
    }
>>>>>>> 38bb043... Docs: Add search result card
=======
    };
>>>>>>> 64ae14f... Docs: Changes based on eslint
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
    );
  }
}

SearchBarUI.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

<<<<<<< HEAD
export default SearchBarUI
>>>>>>> 248c9c7... Docs: Add searchbar component
=======
export default SearchBarUI;
>>>>>>> 64ae14f... Docs: Changes based on eslint
