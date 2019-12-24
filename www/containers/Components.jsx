import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Accordion } from '../../src';
import routes from './routes';

export class Components extends Component {
  render() {
    const activeGroup = routes.find(route => route.path === this.props.location.pathname);
    return (
      <Accordion defaultActivePanelIds={activeGroup ? [activeGroup.group] : []}>
        {_(routes)
          .groupBy('group')
          .map((components, key) => (
            <Accordion.Panel id={key} title={key} key={key}>
              {_(components)
                .orderBy('title')
                .map(component => (
                  <div
                    className={`aui--docs-panel-list${
                      this.props.location.pathname === component.path ? ' is-active' : ''
                    }`}
                    key={component.title}
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
    );
  }
}

Components.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withRouter(Components);
