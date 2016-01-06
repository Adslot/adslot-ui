import React from 'react';

import {
  Button,
  Checkbox,
  Modal,
  Tabs,
  Tab,
  Radio,
  RadioGroup,
  Toggle,
} from './distributionEntry';

require('styles/App.scss');

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSimpleModal = this.toggleSimpleModal.bind(this);

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
            Inverse
          </Button>
          <Button className="btn-inverse" bsStyle="primary">
            Inverse Primary
          </Button>
          <Button className="btn-inverse" bsStyle="success">
            Inverse Success
          </Button>
          <Button className="btn-inverse" disabled>
            Inverse Disabled
          </Button>
        </div>

        <div className="btn-panel">
          <Button bsStyle="primary">
            Primary
          </Button>
          <Button bsStyle="info">
            Info
          </Button>
          <Button bsStyle="primary" disabled>
            Disabled
          </Button>
        </div>

        <div className="btn-panel">
          <Button bsSize="xsmall" bsStyle="warning">
            Warning
          </Button>
          <Button bsSize="xsmall" bsStyle="danger">
            Danger
          </Button>
          <Button bsSize="xsmall" bsStyle="primary" disabled>
            Disabled
          </Button>
        </div>


        <h1>Tabs</h1>
        <div className="btn-panel">
          <Tabs defaultActiveKey="Audience" animation={false}>
            <Tab eventKey="Targeting" title="Targeting" active>Targeting content</Tab>
            <Tab eventKey="Audience" title="Audience">Audience content</Tab>
            <Tab eventKey="Billing" title="Billing" disabled>Billing content</Tab>
          </Tabs>
        </div>

        <h1>Modal</h1>
        <div className="btn-panel">
          <Button className="btn-inverse" onClick={this.toggleSimpleModal}>
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
            <Button className="btn-inverse" onClick={this.toggleSimpleModal}>
              Standard
            </Button>
            <Button onClick={this.toggleSimpleModal} bsStyle="primary">
              Primary
            </Button>
          </Modal.Footer>
        </Modal>

        <h1>Checkboxes</h1>
        <div className="example-component-panel">
          <Checkbox label="Unchecked" />
        </div>
        <div className="example-component-panel">
          <Checkbox label="Checked" checked />
        </div>
        <div className="example-component-panel">
          <Checkbox label="Disabled" disabled />
        </div>
        <div className="example-component-panel">
          <Checkbox label="Checked and Disabled" checked disabled />
        </div>
        <h1>Radio Buttons</h1>
        <div className="example-component-panel">
          <RadioGroup name="testRadio" value="2">
            <Radio
              label="Unchecked"
              value="1"
            />
            <Radio
              label="Checked"
              value="2"
            />
          </RadioGroup>
        </div>
        <div className="example-component-panel">
          <RadioGroup name="testRadio" value="2">
            <Radio
              label="Disabled"
              value="1"
              disabled
            />
            <Radio
              label="Checked and Disabled"
              value="2"
              disabled
              checked
            />
          </RadioGroup>
        </div>

        <h1>Toggle</h1>
        <div className="example-component-panel">
          <Toggle />
        </div>
      </div>
    );
  }
}

module.exports = AppComponent;
