import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Card,
  Button,
} from '../../../src/dist-entry';
import './styles.scss';

const SearchResultCard = ({
  navigateTo,
  clearSearch,
  searchResult
}) => {
  return (
    <Card.Container className="adslot-ui-searchresultcard">
      <Card.Content key="search-result-card-title">
        <pre><b>Results</b></pre>
        <Button
          bsStyle="link"
          onClick={() => clearSearch()}
          className="clear-button"
        >
          Clear
        </Button>
      </Card.Content>
      {
        React.Children.map(searchResult, (componentName) => {
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
      }
    </Card.Container>
  )
}

SearchResultCard.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  searchResult: PropTypes.array.isRequired,
}

export default SearchResultCard;
