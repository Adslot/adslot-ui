import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from '../../../src/dist-entry';

import './styles.scss';

class NotePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }

  render() {
    const { componentName, title, notes } = this.props;

    return (
      <div className="note-panel">
        <Panel
          id={`${_.kebabCase(componentName)}-${title}`}
          title={title}
          isCollapsed={this.state.isCollapsed}
          onClick={this.toggle}
        >
          {notes}
        </Panel>
      </div>
    );
  }
}

NotePanel.propTypes = {
  componentName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  notes: PropTypes.node.isRequired,
};

export default NotePanel;
