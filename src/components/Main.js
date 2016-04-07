/* eslint-disable max-statements */

import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import moment from 'moment';
import {
  Button,
  Checkbox,
  ConfirmModal,
  DatePicker,
  ListPicker,
  Modal,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  Toggle,
  TreePicker,
  TreePickerSimplePure,
  UserListPicker,
} from './distributionEntry';

import {
  ExampleForm,
  ExampleSelect,
} from '../examples/exampleEntry';

import {
  formReducer,
  visibilityReducer,
} from '../examples/redux/reducers';

require('styles/App.scss');

const reducer = combineReducers({
  form: formReducer,
  visibility: visibilityReducer,
});

const store = createStore(reducer); // One store per app.

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    for (const methodName of [
      'setSelectedDate',
      'toggleConfirmModal',
      'toggleListPickerModal',
      'toggleSimpleModal',
      'toggleSplitListPickerModal',
      'toggleTreePickerModal',
      'toggleUserListPickerModal',
    ]) { this[methodName] = this[methodName].bind(this); }

    this.state = {
      showSimpleModal: false,
      startDate: moment(), // React datepicker expects a moment date, rather than JS date.
    };
  }

  setSelectedDate(newValue) {
    this.setState({ startDate: newValue });
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

    const controllerFormatter = () => (<Checkbox />);

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
      addon: 'Required',
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
      { id: '0', label: 'Australian Capital Territory', type: 'State', path: auPath, rootTypeId: '0' };

    const ntNode = {
      id: '1',
      isExpandable: true,
      label: 'Northern Territory',
      path: auPath,
      rootTypeId: '0',
      type: 'State',
      value: 500,
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

    let simpleSubtree = [];
    getSubtree({ rootTypeId: '0' }, (data) => { simpleSubtree = data; });

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

        <br />
        <p>RadioGroup Stacked: </p>

        <RadioGroup className="radiogroup-stacked" name="testRadioGroup">
          <Radio
            label="Geography"
            value="geography"
          />
          <Radio
            label="Contextual"
            value="contextual"
          />
          <Radio
            label="Audience"
            value="audience"
          />
        </RadioGroup>


        <h1>Toggle</h1>
        <span>Left</span> <Toggle /> <span>Right</span>


        <h1>Select</h1>
        <Provider store={store}>
          <ExampleSelect />
        </Provider>

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

        <h1>TreePickerSimplePure</h1>

        <TreePickerSimplePure
          selectedNodes={initialSelection}
          subtree={simpleSubtree}
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
          controllerFormatter={controllerFormatter}
          modalClose={this.toggleListPickerModal}
          modalDescription="Please select the user that you want."
          modalFootnote="You can select one user."
          modalTitle="Select User"
          show={this.state.showListPickerModal}
        />

        <Button
          bsStyle="primary"
          data-test-selector="button-split-list-picker"
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
          modalFootnote="You can select one user."
          modalTitle="Select User"
          show={this.state.showSplitListPickerModal}
        />

        <h1>UserListPicker</h1>

        <Button
          bsStyle="primary"
          data-test-selector="button-user-list-picker"
          onClick={this.toggleUserListPickerModal}
        >
          Open UserListPicker
        </Button>

        <UserListPicker
          avatarColor={avatarColor}
          emptySvgSymbol={emptySvgSymbol}
          initialSelection={listPickerInitialSelection}
          modalClose={this.toggleUserListPickerModal}
          modalDescription="Please select the users you want."
          modalTitle="Select Users"
          show={this.state.showUserListPickerModal}
          userHeaders={listPickerItemHeaders}
          users={listPickerItems}
        />

        <h1>Date Picker</h1>
        <DatePicker
          className="form-control"
          dateFormat="DD MMM YYYY"
          selected={this.state.startDate}
          onChange={this.setSelectedDate}
        />

        <h1>Forms</h1>
        <Provider store={store}>
          <ExampleForm />
        </Provider>
      </div>
    );
  }
}

module.exports = AppComponent;
