import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Accordion,
  Button,
} from '../../../src/dist-entry';
import './styles.scss';

const contentFactory = (navigateTo) => (componentName) => <li key={componentName}>
  <Button bsStyle="link" onClick={() => navigateTo(componentName)}>{_.startCase(componentName)}</Button>
</li>;

const panelFactory = (navigateTo) => (section, sectionName) => ({
  id: sectionName,
  title: _.startCase(sectionName),
  content: <ul className="list-unstyled">{_.map(section, contentFactory(navigateTo))}</ul>,
  isCollapsed: sectionName !== 'form-elements',
});


class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panels: _.map(props.componentsBySection, panelFactory(props.navigateTo)),
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(panelId) {
    const nextPanels = _.assign({}, this.state.panels);
    const panel = _.find(nextPanels, { id: panelId });
    panel.isCollapsed = !panel.isCollapsed;
    this.setState({ panels: nextPanels });
  }

  render() {
    return (<div className="adslot-ui-navigation">
      <Accordion onPanelClick={this.togglePanel} panels={this.state.panels} />
    </div>);
  }
}
Navigation.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  componentsBySection: PropTypes.object.isRequired,
};

export default Navigation;
