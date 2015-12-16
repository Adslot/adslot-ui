require('bootstrap-sass!../../bootstrap-sass.config.js');

import React from 'react';
import {
  Button,
  Modal,
  Nav,
  NavItem,
} from 'react-bootstrap';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSimpleModal: false,
    };
  }

  toggleSimpleModal() {
    this.setState({ showSimpleModal: !this.state.showSimpleModal });
  }

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
            <NavItem active>Targeting</NavItem>
            <NavItem>Audience</NavItem>
            <NavItem>Billing</NavItem>
          </Nav>
        </div>


        <h1>Modal</h1>
        <div className="btn-panel">
          <Button onClick={this.toggleSimpleModal.bind(this)}>
            Open Modal
          </Button>
        </div>

        <Modal show={this.state.showSimpleModal} bsSize="small" keyboard={false}>
          <Modal.Header>
            <Modal.Title>Modal Label</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              All selected line items can not be <strong>Signed Off </strong>
              without targeting requirements configured. Please review your plan.
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleSimpleModal.bind(this)}>
              Standard
            </Button>
            <Button onClick={this.toggleSimpleModal.bind(this)} bsStyle="primary">
              Primary
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

module.exports = AppComponent;
