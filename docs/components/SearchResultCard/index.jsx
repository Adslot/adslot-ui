import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Card,
  Button,
  Empty,
} from '../../../src/dist-entry';
import './styles.scss';

const SearchResultCard = ({
  navigateTo,
  clearSearch,
  searchResults,
}) => (
  <Card.Container className="adslot-ui-searchresultcard">
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

SearchResultCard.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchResultCard;
