/* eslint-disable max-statements */

import React from 'react';

import {
  Button,
  Checkbox,
  ConfirmModal,
  ListPicker,
  Modal,
  Tabs,
  Tab,
  Radio,
  RadioGroup,
  Select,
  Toggle,
  TreePicker,
  UserListPicker,
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
      'toggleConfirmModal',
      'toggleListPickerModal',
      'toggleSimpleModal',
      'toggleSplitListPickerModal',
      'toggleTreePickerModal',
      'toggleUserListPickerModal',
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

  toggleListPickerModal() {
    this.setState({ showListPickerModal: !this.state.showListPickerModal });
  }

  toggleSplitListPickerModal() {
    this.setState({ showSplitListPickerModal: !this.state.showSplitListPickerModal });
  }

  toggleUserListPickerModal() {
    this.setState({ showUserListPickerModal: !this.state.showUserListPickerModal });
  }

  toggleSimpleModal() {
    this.setState({ showSimpleModal: !this.state.showSimpleModal });
  }

  toggleConfirmModal() {
    this.setState({ showConfirmModal: !this.state.showConfirmModal });
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

    const listPickerItemInfo = {
      label: 'User Details',
      properties: [
        { label: 'Name', value: 'Jill Smith' },
        { label: 'Age', value: '21' },
      ],
    };

    const listPickerItems = [teamMember1, teamMember2, teamMember3];

    const listPickerInitialSelection = [teamMember2];

    const listPickerItemHeaders = {
      left: 'Team',
      right: 'Member',
    };

    const emptySvgSymbol = { href: '/assets/svg-symbols.svg#checklist-incomplete' };
    const svgSymbol = { href: '/assets/svg-symbols.svg#list' };

    const rootTypes = [
      {
        label: 'Geography',
        id: '0',
        svgSymbol,
        emptySvgSymbol,
        isRequired: true,
      },
      { label: 'Gender', id: '1', svgSymbol, isRequired: false },
      { label: 'Age', id: '2', svgSymbol, isRequired: false },
    ];

    const auPath = [{ id: '10', label: 'AU' }];

    const actNode =
      { id: '0', label: 'Australian Capital Territory', type: 'State', path: auPath, value: 1000, rootTypeId: '0' };

    const ntNode = {
      id: '1',
      label: 'Northern Territory',
      type: 'State',
      path: auPath,
      value: 500,
      rootTypeId: '0',
      isExpandable: true,
    };

    const qldNode =
      { id: '2', label: 'Queensland', type: 'State', path: auPath, value: 500, rootTypeId: '0', isExpandable: true };

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
          { id: '3', label: 'South Australia', type: 'State', path: auPath, value: 500, rootTypeId: '0' },
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
        <Button data-test-selector="button-modal" className="btn-inverse" onClick={this.toggleSimpleModal}>
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

        <Button id="button-confirm-modal" className="btn-inverse" onClick={this.toggleConfirmModal}>
          Open Confirm Modal
        </Button>

        <ConfirmModal
          modalApply={this.toggleConfirmModal}
          modalClose={this.toggleConfirmModal}
          show={this.state.showConfirmModal}
        />


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
          list
          name="flavoursSelect"
          noResultsText="No flavours :("
          onChange={this.setSelectedFlavours}
          options={selectFlavoursOptions}
          placeholder="Select your favourites."
          simpleValue
          value={this.state.selectedFlavours}
        />


        <h1>TreePicker</h1>

        <Button data-test-selector="button-tree-picker" bsStyle="primary" onClick={this.toggleTreePickerModal}>
          Open TreePicker
        </Button>

        <TreePicker
          baseItem={baseItem}
          modalClose={this.toggleTreePickerModal}
          initialSelection={initialSelection}
          helpText={{
            average: `CPM line items use the average method.
              Targeting adjusts which people, but not the number of people who see your ad.`,
            sum: `CPD (Sponsorship) line items use the sum method.
              Targeting adjusts which people, and the number of people who see your ad.`,
          }}
          getSubtree={getSubtree}
          modalTitle="Edit Targeting"
          rootTypes={rootTypes}
          selectedLabel="Selected Targeting"
          show={this.state.showTreePickerModal}
          totalsSuffix="CPD"
          valueFormatter={valueFormatter}
        />


        <h1>ListPicker</h1>

        <Button data-test-selector="button-list-picker" bsStyle="primary" onClick={this.toggleListPickerModal}>
          Open ListPicker
        </Button>

        <ListPicker
          allowMultiSelection={false}
          initialSelection={listPickerInitialSelection}
          itemHeaders={listPickerItemHeaders}
          items={listPickerItems}
          labelFormatter={labelFormatter}
          modalClose={this.toggleListPickerModal}
          modalDescription="Please select the user that you want."
          modalFootnote="You can only select one user."
          modalTitle="Select User"
          show={this.state.showListPickerModal}
        />

        <Button
          data-test-selector="button-split-list-picker"
          bsStyle="primary"
          onClick={this.toggleSplitListPickerModal}
        >
          Open Split ListPicker
        </Button>

        <ListPicker
          allowMultiSelection={false}
          emptySvgSymbol={emptySvgSymbol}
          initialSelection={listPickerInitialSelection}
          itemHeaders={listPickerItemHeaders}
          itemInfo={listPickerItemInfo}
          items={listPickerItems}
          labelFormatter={labelFormatter}
          linkButtons={[{ label: 'Create User', href: '#' }]}
          modalClose={this.toggleSplitListPickerModal}
          modalDescription="Please select the user that you want."
          modalFootnote="You can only select one user."
          modalTitle="Select User"
          show={this.state.showSplitListPickerModal}
        />

        <h1>UserListPicker</h1>

        <Button
          data-test-selector="button-user-list-picker"
          bsStyle="primary"
          onClick={this.toggleUserListPickerModal}
        >
          Open UserListPicker
        </Button>

        <UserListPicker
          avatarColor={avatarColor}
          emptySvgSymbol={emptySvgSymbol}
          initialSelection={listPickerInitialSelection}
          modalClose={this.toggleUserListPickerModal}
          modalDescription="Please select the users that you want."
          modalTitle="Select Users"
          show={this.state.showUserListPickerModal}
          userHeaders={listPickerItemHeaders}
          users={listPickerItems}
        />


        <h1>Forms</h1>
        <form className="form-horizontal">
          <div className="col-xs-6">
            <fieldset className="row">
              <div className="form-group">
                <label htmlFor="exampleTextInput" className="control-label col-xs-4">Text input</label>
                <div className="col-xs-8">
                  <input type="text" className="form-control" id="exampleTextInput" placeholder="Text input" />

                  <br />

                  <div className="form-control-static">Instruction or grouped placeholder</div>
                  <div className="input-group col-xs-5">
                    <div className="input-group-addon">$</div>
                    <input type="text" className="form-control" id="exampleTextInputAddon" placeholder="w. addon" />
                    <div className="input-group-addon">value</div>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="row">
              <div className="form-group">
                <label htmlFor="exampleTextarea" className="control-label col-xs-4">Text area (optional)</label>
                <div className="col-xs-8">
                  <textarea className="form-control" id="exampleTextarea" placeholder="Text area"></textarea>
                  <p className="help-block">Help text or example.</p>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="countriesSelect" className="control-label col-xs-4">Select box</label>
                <div className="col-xs-8">
                  <Select
                    clearable={false}
                    name="countriesSelect"
                    noResultsText="Sorry, couldn't find that country."
                    onChange={this.setSelectedCountry}
                    options={selectCountriesOptions}
                    placeholder="Countries"
                    value={this.state.selectedCountry}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputFile" className="control-label col-xs-4">File input</label>
                <div className="col-xs-8">
                  <input type="file" id="exampleInputFile" className="form-control" />
                </div>
              </div>

              <div className="form-group">
                <div className="col-xs-8 col-xs-offset-4">
                  <div className="checkbox">
                    <Checkbox
                      label={<span>Checkbox.</span>}
                    />
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="row form-btn-footer">
              <Button className="btn-inverse">Cancel</Button>
              <Button bsStyle="primary">Save</Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

module.exports = AppComponent;
