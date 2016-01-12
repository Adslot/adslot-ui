import React from 'react';

import {
  Button,
  Checkbox,
  Modal,
  Tabs,
  Tab,
  Radio,
  RadioGroup,
  Select,
  Toggle,
} from './distributionEntry';

require('styles/App.scss');

const selectCountriesOptions = [
  { value: 'au', label: 'Australia' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'jp', label: 'Japan', disabled: true },
];

const selectFlavoursOptions = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Vanilla', value: 'vanilla' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Caramel', value: 'caramel' },
  { label: 'Cookies and Cream', value: 'cookiescream' },
  { label: 'Peppermint', value: 'peppermint' },
];

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.setSelectedCountry = this.setSelectedCountry.bind(this);
    this.setSelectedFlavours = this.setSelectedFlavours.bind(this);
    this.toggleSimpleModal = this.toggleSimpleModal.bind(this);

    this.state = {
      selectedCountry: 'au',
      selectedFlavours: 'vanilla',
      showSimpleModal: false,
    };
  }

  setSelectedCountry(newValue) {
    this.setState({ selectedCountry: newValue.value });
  }

  setSelectedFlavours(newValue) {
    this.setState({ selectedFlavours: newValue });
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
        <Checkbox label="Unchecked" />
        <br />
        <Checkbox label="Checked" checked />
        <br />
        <Checkbox label="Disabled" disabled />
        <br />
        <Checkbox label="Checked and Disabled" checked disabled />


        <h1>Radio Buttons</h1>
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
        <br />
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


        <h1>Toggle</h1>
        <span>Left</span> <Toggle /> <span>Right</span>


        <h1>Select</h1>
        <Select
          clearable={false}
          name="countriesSelect"
          noResultsText="Sorry, couldn't find that country."
          onChange={this.setSelectedCountry}
          options={selectCountriesOptions}
          placeholder="Countries"
          value={this.state.selectedCountry}
        />

        <br />

        <Select
          addLabelText="Add '{label}' flavour?"
          allowCreate // Not implemented by react-select v1.0.0-beta8 TODO: When supported, check it works.
          multi
          name="flavoursSelect"
          noResultsText="Noooo, no flavours :("
          onChange={this.setSelectedFlavours}
          options={selectFlavoursOptions}
          placeholder="Select your favs."
          simpleValue
          value={this.state.selectedFlavours}
        />
      </div>
    );
  }
}

module.exports = AppComponent;
