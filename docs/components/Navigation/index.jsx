import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Accordion, Button } from '../../../src';
import './styles.scss';

const initialOpenPanel = 'form-elements';

const contentFactory = navigateTo => componentName => (
  <li key={componentName}>
    <Button bsStyle="link" onClick={() => navigateTo(componentName)}>
      {_.startCase(componentName)}
    </Button>
  </li>
);

const panelFactory = navigateTo => (section, sectionName) => ({
  id: sectionName,
  title: _.startCase(sectionName),
  content: <ul className="list-unstyled">{_.map(section, contentFactory(navigateTo))}</ul>,
});

class Navigation extends React.Component {
  togglePanel = panelId => {
    const nextPanel = panelId === this.state.currentOpenPanel ? '' : panelId;
    this.setState({ currentOpenPanel: nextPanel });
  };

  render() {
    const panels = _.map(this.props.componentsBySection, panelFactory(this.props.navigateTo));
    return (
      <div className="adslot-ui-navigation">
        <Accordion defaultActivePanelIds={[initialOpenPanel]} maxExpand={1}>
          {_.map(panels, panel => (
            <Accordion.Panel {...panel} key={panel.id}>
              {panel.content}
            </Accordion.Panel>
          ))}
        </Accordion>
      </div>
    );
  }
}
Navigation.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  componentsBySection: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string.isRequired)).isRequired,
};

export default Navigation;
