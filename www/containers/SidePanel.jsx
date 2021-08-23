import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Accordion } from '../../src';
import SearchBar from './components/SearchBar';
import routes from './routes';

export class SidePanel extends Component {
  state = {
    searchText: '',
  };

  onSearch = (searchText) => {
    this.setState({ searchText });
  };

  render() {
    const groupedRoutes = _.groupBy(routes, 'group');
    const activeGroup = _.keys(groupedRoutes);
    const { searchText } = this.state;
    return (
      <React.Fragment>
        <SearchBar onSearch={this.onSearch} />
        <Accordion defaultActivePanelIds={activeGroup}>
          {_(groupedRoutes)
            .pickBy((components) =>
              _.some(_.map(components, (entry) => new RegExp(searchText, 'gi').test(entry.title)))
            )
            .map((components, key) => (
              // eslint-disable-next-line
              <Accordion.Panel id={key} title={key} key={key}>
                {_(components)
                  .orderBy(key === 'Getting Started' ? null : 'title')
                  .pickBy((entry) => new RegExp(searchText, 'gi').test(entry.title))
                  .map((component) => (
                    <div
                      className={`aui--docs-panel-list${
                        this.props.location.pathname === component.path ? ' is-active' : ''
                      }`}
                      key={component.path}
                      onClick={() => this.props.history.push(component.path)}
                    >
                      {component.title}
                    </div>
                  ))
                  .value()}
              </Accordion.Panel>
            ))
            .value()}
        </Accordion>
      </React.Fragment>
    );
  }
}

SidePanel.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withRouter(SidePanel);
