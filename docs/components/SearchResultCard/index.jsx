<<<<<<< HEAD
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  Empty,
=======
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Card,
  Button,
>>>>>>> 38bb043... Docs: Add search result card
} from '../../../src/dist-entry';
import './styles.scss';

const SearchResultCard = ({
  navigateTo,
  clearSearch,
<<<<<<< HEAD
  searchResults,
}) => (
  <Card.Container className="search-result-card">
    <Card.Content key="search-result-card-title">
      <strong className="title">Results</strong>
      <Button
        bsStyle="link"
        onClick={clearSearch}
        className="clear-button"
      >
        Clear
      </Button>
    </Card.Content>
    {
      _.map(searchResults, (componentName) => (
        <Card.Content key={componentName}>
          <Button
            bsStyle="link"
            onClick={() => navigateTo(componentName)}
          >
            {_.startCase(componentName)}
          </Button>
        </Card.Content>
      ))
    }
    <Empty
      collection={searchResults}
      text="No results found."
      svgSymbol={{ href: './docs/assets/svg-symbols.svg#search' }}
    />
  </Card.Container>
);
=======
  searchResult
}) => {
  return (
    <Card.Container className="adslot-ui-searchresultcard">
      <Card.Content key="search-result-card-title">
        <strong className="title">Results</strong>
        <Button
          bsStyle="link"
          onClick={() => clearSearch()}
          className="clear-button"
        >
          Clear
        </Button>
      </Card.Content>
      {
        (searchResult.length > 0)
          ? React.Children.map(searchResult, (componentName) => {
            return (
              <Card.Content key={componentName}>
                <Button
                  bsStyle="link"
                  onClick={() => navigateTo(componentName)}
                >
                  {_.startCase(componentName)}
                </Button>
              </Card.Content>
            )
          })
          : (<Card.Content key={"search-result-card-empty"}>
            No results found.
          </Card.Content>)
      }
    </Card.Container>
  )
}
>>>>>>> 38bb043... Docs: Add search result card

SearchResultCard.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
<<<<<<< HEAD
  searchResults: PropTypes.arrayOf(PropTypes.string).isRequired,
};
=======
  searchResult: PropTypes.array.isRequired,
}
>>>>>>> 38bb043... Docs: Add search result card

export default SearchResultCard;
