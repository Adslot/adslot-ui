import React from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import { Accordion } from '../../src';
import SearchBar from './components/SearchBar';
import routes from './routes';

const groupedRoutes = _.groupBy(routes, 'group');
const activeGroup = _.keys(groupedRoutes);

const SidePanel = () => {
  const [searchText, setSearchText] = React.useState('');

  return (
    <React.Fragment>
      <SearchBar onSearch={setSearchText} />
      <Accordion defaultActivePanelIds={activeGroup}>
        {_(groupedRoutes)
          .pickBy((components) => _.some(_.map(components, (entry) => new RegExp(searchText, 'gi').test(entry.title))))
          .map((components, key) => (
            <Accordion.Panel id={key} title={key} key={key}>
              {_(components)
                .orderBy(key === 'Getting Started' ? null : 'title')
                .pickBy((entry) => new RegExp(searchText, 'gi').test(entry.title))
                .map((component) => (
                  <NavLink
                    className={({ isActive }) =>
                      ['aui--docs-panel-list', isActive && 'is-active'].filter(Boolean).join(' ')
                    }
                    key={component.path}
                    to={component.path}
                  >
                    {component.title}
                  </NavLink>
                ))
                .value()}
            </Accordion.Panel>
          ))
          .value()}
      </Accordion>
    </React.Fragment>
  );
};

export default SidePanel;
