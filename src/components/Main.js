import React from 'react';

import {
  Button,
  Checkbox,
  Modal,
  MultiPicker,
  Tabs,
  Tab,
  Radio,
  RadioGroup,
  Select,
  Toggle,
  TreePicker,
  UserMultiPicker,
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
      'toggleMultiPickerModal',
      'toggleSimpleModal',
      'toggleTreePickerModal',
      'toggleUserMultiPickerModal',
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

  toggleMultiPickerModal() {
    this.setState({ showMultiPickerModal: !this.state.showMultiPickerModal });
  }

  toggleUserMultiPickerModal() {
    this.setState({ showUserMultiPickerModal: !this.state.showUserMultiPickerModal });
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

    const labelFormatter = (item) => `${item.givenName} ${item.surname}`;

    const avatarColor = () => 'cyan';

    const teamMember1 = { avatar: '//lorempixel.com/35/35/people/7', givenName: 'John', id: 1, surname: 'Smith' };

    const teamMember2 = { givenName: 'Jane', id: 2, surname: 'Doe' };

    const teamMember3 = { givenName: 'Jack', id: 3, surname: 'White' };

    const multiPickerItems = [teamMember1, teamMember2, teamMember3];

    const multiPickerInitialSelection = [teamMember2];

    const multiPickerItemHeaders = {
      left: 'Team',
      right: 'Member',
    };

    const rootTypes = [
      {
        label: 'Geography',
        id: '0',
        icon: 'http://placehold.it/16x16',
        emptyIcon: 'http://placehold.it/70x70',
        isRequired: true,
      },
      { label: 'Gender', id: '1', icon: 'http://placehold.it/16x16', isRequired: false },
      { label: 'Age', id: '2', icon: 'http://placehold.it/16x16', isRequired: false },
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

    const initialSelection = [
      actNode,
      ntNode,
    ];

    const getSubtree = ({ rootTypeId, query, nodeId }, cb) => {
      if (rootTypeId === '0' && !query && !nodeId) {
        return cb([
          actNode,
          ntNode,
          qldNode,
          { id: '3', label: 'South Australia', type: 'State', path: ['AU'], value: 500, rootTypeId: '0' },
        ]);
      }

      return cb([]);
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
          initialSelection={initialSelection}
          getSubtree={getSubtree}
          modalTitle="Edit Targeting"
          rootTypes={rootTypes}
          show={this.state.showTreePickerModal}
          valueFormatter={valueFormatter}
        />


        <h1>MultiPicker</h1>

        <Button bsStyle="primary" onClick={this.toggleMultiPickerModal}>
          Open MultiPicker
        </Button>

        <MultiPicker
          initialSelection={multiPickerInitialSelection}
          itemHeaders={multiPickerItemHeaders}
          items={multiPickerItems}
          labelFormatter={labelFormatter}
          modalClose={this.toggleMultiPickerModal}
          modalDescription="Please select the users that you want."
          modalTitle="Select Users"
          show={this.state.showMultiPickerModal}
        />


        <h1>UserMultiPicker</h1>

        <Button bsStyle="primary" onClick={this.toggleUserMultiPickerModal}>
          Open UserMultiPicker
        </Button>

        <UserMultiPicker
          avatarColor={avatarColor}
          initialSelection={multiPickerInitialSelection}
          modalClose={this.toggleUserMultiPickerModal}
          modalDescription="Please select the users that you want."
          modalTitle="Select Users"
          show={this.state.showUserMultiPickerModal}
          userHeaders={multiPickerItemHeaders}
          users={multiPickerItems}
        />

      </div>
    );
  }
}

module.exports = AppComponent;
