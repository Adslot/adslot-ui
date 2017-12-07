import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Accordion,
  Button,
} from '../../../src/dist-entry';
import './styles.scss';

const initialOpenPanel = 'form-elements';

const contentFactory = (navigateTo) => (componentName) => <li key={componentName}>
  <Button bsStyle="link" onClick={() => navigateTo(componentName)}>{_.startCase(componentName)}</Button>
</li>;

const panelFactory = (navigateTo, currentOpenPanel) => (section, sectionName) => ({
  id: sectionName,
  title: _.startCase(sectionName),
  content: <ul className="list-unstyled">{_.map(section, contentFactory(navigateTo))}</ul>,
  isCollapsed: sectionName !== currentOpenPanel,
});

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOpenPanel: initialOpenPanel,
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(panelId) {
    const nextPanel = panelId === this.state.currentOpenPanel ? '' : panelId;
    this.setState({ currentOpenPanel: nextPanel });
  }

  render() {
    const panels = _.map(
      this.props.componentsBySection,
      panelFactory(this.props.navigateTo, this.state.currentOpenPanel)
    );
    return (<div className="adslot-ui-navigation">
      <Accordion onPanelClick={this.togglePanel} panels={panels} />
    </div>);
  }
}
Navigation.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  componentsBySection: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string.isRequired)).isRequired,
};

export default Navigation;
