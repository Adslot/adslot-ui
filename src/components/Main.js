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
  TreePicker,
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
    for (const methodName of [
      'setSelectedCountry',
      'setSelectedFlavours',
      'toggleSimpleModal',
      'toggleTreePickerModal',
    ]) {this[methodName] = this[methodName].bind(this);}

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

  toggleTreePickerModal() {
    this.setState({ showTreePickerModal: !this.state.showTreePickerModal });
  }

  render() {
    const baseItem = {
      label: 'Awesome Product',
      value: 10000,
    };

    const valueFormatter = (value) => `$${Math.round(value) / 100}`;

    const rootTypes = [
      {
        label: 'Geography',
        id: '0',
        icon: 'http://placehold.it/16x16',
        emptyIcon: 'http://placehold.it/70x70',
        isRequired: true,
      },
      { label: 'Audiences', id: '1', icon: 'http://placehold.it/16x16', isRequired: false },
      { label: 'Segments', id: '2', icon: 'http://placehold.it/16x16', isRequired: true },
    ];

    const actNode =
      { id: '0', label: 'Australian Capital Territory', type: 'State', path: ['AU'], value: 1000, rootTypeId: '0' };

    const ntNode = {
      id: '1',
      label: 'Northern Territory',
      type: 'State',
      path: ['AU'],
      value: 500,
      rootTypeId: '0',
      isExpandable: true,
    };

    const qldNode =
      { id: '2', label: 'Queensland', type: 'State', path: ['AU'], value: 500, rootTypeId: '0', isExpandable: true };

    const getSelected = () => {
      return [
        actNode,
        ntNode,
      ];
    };

    const getSubtree = (rootTypeId, query) => {
      if (rootTypeId === '0' && query === '') {
        return [
          actNode,
          ntNode,
          qldNode,
          { id: '3', label: 'South Australia', type: 'State', path: ['AU'], value: 500, rootTypeId: '0' },
        ];
      }

      return [];
    };

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
        <Button className="btn-inverse" onClick={this.toggleSimpleModal}>
          Open Modal
        </Button>

        <Modal show={false} bsSize="small" keyboard={false}>
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
          noResultsText="No flavours :("
          onChange={this.setSelectedFlavours}
          options={selectFlavoursOptions}
          placeholder="Select your favourites."
          simpleValue
          value={this.state.selectedFlavours}
        />


        <h1>TreePicker</h1>

        <Button bsStyle="primary" onClick={this.toggleTreePickerModal}>
          Open TreePicker
        </Button>

        <TreePicker
          baseItem={baseItem}
          modalClose={this.toggleTreePickerModal}
          getSelected={getSelected}
          getSubtree={getSubtree}
          modalTitle="Edit Targeting"
          rootTypes={rootTypes}
          show={this.state.showTreePickerModal}
          valueFormatter={valueFormatter}
        />
      </div>
    );
  }
}

module.exports = AppComponent;
