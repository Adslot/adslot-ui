require('bootstrap-sass!../../bootstrap-sass.config.js');

import React from 'react';
import {Button, Nav, NavItem} from 'react-bootstrap';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <h1>Buttons</h1>
        <div className="btn-panel">
          <Button className="btn-inverse">
            Default
          </Button>
          <Button className="btn-inverse" bsStyle="primary">
            Primary
          </Button>
          <Button className="btn-inverse" bsStyle="success">
            Success
          </Button>

        </div>
        <div className="btn-panel">
          <Button>
            Default
          </Button>
          <Button bsStyle="primary">
            Primary
          </Button>
          <Button bsStyle="success">
            Success
          </Button>
        </div>
        <div className="btn-panel">
          <Button bsSize="xsmall">
            Default
          </Button>
          <Button bsSize="xsmall" bsStyle="primary">
            Primary
          </Button>
          <Button bsSize="xsmall" bsStyle="success">
            Success
          </Button>
        </div>
        <h1>Tabs</h1>
        <div className="btn-panel">
          <Nav bsStyle="tabs">
            <NavItem active={true}>Targeting</NavItem>
            <NavItem>Audience</NavItem>
            <NavItem>Billing</NavItem>
          </Nav>
        </div>
      </div>
    );
  }
}

module.exports = AppComponent;
