/* eslint-disable max-statements */

import _ from 'lodash';
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Immutable from 'seamless-immutable';
import moment from 'moment';
import {
  Accordion,
  Button,
  Checkbox,
  ConfirmModal,
  DatePicker,
  FlexibleSpacer,
  ListPicker,
  Modal,
  PagedGrid,
  Panel,
  Radio,
  RadioGroup,
  SearchBar,
  SpinnerButton,
  SvgSymbol,
  Tab,
  Tabs,
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

const auNode = { id: '10', label: 'Australia', path: [], type: '', isExpandable: true };

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    for (const methodName of [
      'setSearchBarString',
      'setSearchValue',
      'searchOnClear',
      'setSelectedDate',
      'expandChildren',
      'breadcrumbOnClick',
      'setSearchTreePickerPure',
      'performSearchBarSearch',
      'toggleConfirmModal',
      'toggleListPickerModal',
      'toggleSimpleModal',
      'toggleSplitListPickerModal',
      'toggleUserListPickerModal',
      'togglePanel',
      'toggleAccordionPanel',
    ]) { this[methodName] = this[methodName].bind(this); }

    this.state = {
      itemType: 'segment value',
      showSimpleModal: false,
      searchValue: '',
      searchValueTreePickerPure: '',
      panel: {
        id: '0',
        title: 'Panel',
        isCollapsed: false,
        content: 'This is some panel content...',
      },
      accordionPanels: [
        {
          id: '1',
          icon: { href: '/assets/svg-symbols.svg#list' },
          title: 'Panel 1',
          isCollapsed: false,
          content: 'Panel 1 content. This panel is expanded by default.',
        },
        {
          id: '2',
          icon: { href: '/assets/svg-symbols.svg#list' },
          title: 'Panel 2',
          isCollapsed: true,
          content: (<Button className="btn-inverse" bsStyle="success">Button</Button>),
        },
        {
          id: '3',
          icon: { href: '/assets/svg-symbols.svg#list' },
          title: 'Panel 3',
          isCollapsed: true,
          content: (<ul>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
            <li>List item 4</li>
            <li>List item 5</li>
            <li>List item 6</li>
            <li>List item 7</li>
            <li>List item 8</li>
          </ul>),
        },
        {
          id: '4',
          icon: { href: '/assets/svg-symbols.svg#list' },
          title: 'Panel 4',
          isCollapsed: true,
          content: 'Panel 4 content',
        },
      ],
      startDate: moment(), // React datepicker expects a moment date, rather than JS date.
      subTree: [
        { id: '0', label: 'Northern Territory', path: [{ id: '10', label: 'AU' }], type: '' },
        { id: '1', label: 'Australian Capital Territory', path: [{ id: '10', label: 'AU' }], type: '' },
      ],
      simpleSubtree: [auNode],
      treePickerPureSubtree: [],
      selectedNodes: [
        { id: '2', label: 'Norfolk Island', path: [], type: '', isSelectable: false },
        { id: '3', label: 'Queensland', path: [{ id: '12', label: 'AU' }], type: '' },
      ],
      searchBarString: '',
      breadcrumbNodes: [],
    };
  }

  setSearchBarString(searchBarString) {
    this.setState({ searchBarString });
  }

  setSearchValue(newValue) {
    this.setState({ searchValue: newValue });
    this.setState({
      treePickerPureSubtree:
        _.filter(this.state.subTree, ({ label }) => {
          if (newValue) {
            return _.includes(label.toLowerCase(), newValue.toLowerCase());
          }

          return false;
        }),
    });
  }

  setSearchTreePickerPure(newValue) {
    this.setState({ searchValueTreePickerPure: newValue });
    this.setState({
      simpleSubtree:
        _.filter(this.state.subTree, ({ label }) => {
          if (newValue) {
            return _.includes(label.toLowerCase(), newValue.toLowerCase());
          }

          return true;
        }),
    });
  }

  setSelectedDate(newValue) {
    this.setState({ startDate: newValue });
  }

  expandChildren() {
    let intervalId;

    const updateSubtree = () => {
      clearInterval(intervalId);
      this.setState({
        breadcrumbNodes: [auNode],
        simpleSubtree: [
          { id: '0', label: 'Northern Territory', path: [{ id: '10', label: 'Australia' }], type: '' },
          { id: '1', label: 'Australian Capital Territory', path: [{ id: '10', label: 'Australia' }], type: '' },
        ],
      });
    };

    intervalId = setInterval(updateSubtree, 1000);
  }

  breadcrumbOnClick() {
    this.setState({
      breadcrumbNodes: [],
      simpleSubtree: [auNode],
    });
  }

  searchOnClear() {
    this.setSearchValue('');
  }

  performSearchBarSearch() {
    console.log(`Searching "${this.state.searchBarString}"...`);
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

  togglePanel() {
    const nextPanel = Immutable.from(this.state.panel).asMutable();
    nextPanel.isCollapsed = !nextPanel.isCollapsed;
    this.setState({ panel: nextPanel });
  }

  toggleAccordionPanel(panelId) {
    const nextPanels = Immutable.from(this.state.accordionPanels).asMutable({ deep: true });
    const panelToToggle = _.find(nextPanels, { id: panelId });
    panelToToggle.isCollapsed = !panelToToggle.isCollapsed;
    this.setState({ accordionPanels: nextPanels });
  }

  render() {
    const labelFormatter = (item) => `${item.givenName} ${item.surname}`;

    const addonFormatter = () => (<Checkbox />);

    const nodeRenderer = (value) => (<Checkbox label={value.label} />);

    const avatarColor = () => 'cyan';

    const teamMember1 = { avatar: '//lorempixel.com/35/35/people/7', givenName: 'John', id: 1, surname: 'Smith' };

    const teamMember2 = { givenName: 'Jane', id: 2, surname: 'Doe' };

    const teamMember3 = { givenName: 'Jack', id: 3, surname: 'White' };

    const pagedGridColumns = [
      { key: 'id', label: 'ID' },
      { key: 'givenName', label: 'Given Name', stretch: true },
      { key: 'surname', label: 'Surname', stretch: true },
    ];

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
      label: 'Team',
      toggle: 'Member',
      addon: 'Required',
    };

    const emptySvgSymbol = { href: '/assets/svg-symbols.svg#checklist-incomplete' };

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
          <Button className="btn-inverse" bsStyle="primary" disabled>
            Inverse Disabled
          </Button>
          <Button className="btn-borderless">
            Borderless
          </Button>
          <Button className="btn-borderless" disabled>
            Borderless Disabled
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
          <Button bsStyle="primary">
            <span className="flexible-wrapper-inline">
              Trailing Character<FlexibleSpacer />+
            </span>
          </Button>
          <Button bsStyle="primary">
            <span className="flexible-wrapper-inline">
              <FlexibleSpacer />+<FlexibleSpacer />
            </span>
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
          <Button bsSize="xsmall" bsStyle="primary">
            <span className="flexible-wrapper-inline">
              Trailing Character<FlexibleSpacer />+
            </span>
          </Button>
          <Button bsSize="xsmall" bsStyle="primary">
            <span className="flexible-wrapper-inline">
              <FlexibleSpacer />+<FlexibleSpacer />
            </span>
          </Button>
        </div>

        <div className="btn-panel">
          <a className="btn btn-inverse" href="#top">Anchor</a>
          <span className="btn btn-inverse btn-primary">Span</span>
          <div className="btn btn-inverse btn-success">Div</div>
        </div>

        <h3>Spinner Buttons</h3>
        <div className="btn-panel">
          <SpinnerButton isLoading className="btn-borderless" bsSize="sm">
            Small Borderless
          </SpinnerButton>
          <SpinnerButton isLoading bsStyle="success" bsSize="large">
            Big Success
          </SpinnerButton>
          <SpinnerButton
            isLoading
            bsStyle="primary"
          >
            Primary
          </SpinnerButton>
          <SpinnerButton disabled>
            Disabled
          </SpinnerButton>
          <SpinnerButton bsStyle="primary">
            Not spinning
          </SpinnerButton>
        </div>

        <h1>Tabs</h1>
        <div className="btn-panel">
          <Tabs defaultActiveKey="Audience" animation={false} id="audience-tab">
            <Tab eventKey="Targeting" title="Targeting">Targeting content</Tab>
            <Tab
              eventKey="Audience"
              title={<span className="flexible-wrapper-inline"><SvgSymbol /><FlexibleSpacer />Audience</span>}
            >
              Audience content
            </Tab>
            <Tab
              eventKey="Billing"
              title={<span className="flexible-wrapper-inline">+<FlexibleSpacer />Billing</span>}
              disabled
            >
              Billing content
            </Tab>
          </Tabs>
        </div>

        <h1>Modal</h1>
        <Button data-test-selector="button-modal" className="btn-inverse" onClick={this.toggleSimpleModal}>
          Open Modal
        </Button>

        <Modal show={this.state.showSimpleModal} bsSize="small" keyboard={false}>
          <Modal.Header closeButton onHide={this.toggleSimpleModal}>
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
        <div className="checkbox-example">
          <Checkbox label="Unchecked" />
          <br />
          <Checkbox label="Checked" checked />
          <br />
          <Checkbox label="Disabled" disabled />
          <br />
          <Checkbox label="Checked and Disabled" checked disabled />
          <br />
          <Checkbox label="A very long label that wraps around nicely" />
        </div>

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


        <h1>Select</h1>
        <Provider store={store}>
          <ExampleSelect />
        </Provider>

        <h1>TreePickerSimplePure with initial state</h1>

        <TreePickerSimplePure
          itemType={this.state.itemType}
          hideIcon
          selectedNodes={[]}
          subtree={this.state.treePickerPureSubtree}
          emptySelectedListText={<div><b>Choose items of interest</b></div>}
          initialStateNode={<div><b>Start by searching for items</b></div>}
          searchValue={this.state.searchValue}
          searchOnChange={this.setSearchValue}
          searchOnClear={this.searchOnClear}
          additionalClassNames={this.state.searchValue ? undefined : ['background-highlighted', 'test-class']}
        />

        <h1>TreePickerSimplePure without initial state</h1>

        <TreePickerSimplePure
          groupFormatter={(node) => `${node.label.split(' ').length} words`}
          itemType={this.state.itemType}
          selectedNodes={this.state.selectedNodes}
          breadcrumbNodes={this.state.breadcrumbNodes}
          breadcrumbOnClick={this.breadcrumbOnClick}
          subtree={this.state.simpleSubtree}
          searchValue={this.state.searchValueTreePickerPure}
          searchOnChange={this.setSearchTreePickerPure}
          expandNode={this.expandChildren}
          includeNode={_.noop}
          removeNode={_.noop}
          nodeRenderer={nodeRenderer}
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
          itemType="list"
          labelFormatter={labelFormatter}
          addonFormatter={addonFormatter}
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
          itemType="split-user"
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


        <h1>PagedGrid</h1>

        <PagedGrid
          columns={pagedGridColumns}
          items={listPickerItems}
          perPage={2}
        />
        <br />
        <PagedGrid
          columns={pagedGridColumns}
          items={[]}
          perPage={1}
          verticalCellBorder
        />


        <h1>Date Picker</h1>
        <div className="row">
          <div className="col-xs-3">
            <DatePicker
              className="form-control"
              dateFormat="DD MMM YYYY"
              selected={this.state.startDate}
              onChange={this.setSelectedDate}
              placeholderText="Date e.g. 03 Sep 2016"
            />
          </div>
        </div>

        <h1>Forms</h1>
        <Provider store={store}>
          <ExampleForm />
        </Provider>

        <h1>Panel</h1>
        <Panel
          id={this.state.panel.id}
          title={this.state.panel.title}
          isCollapsed={this.state.panel.isCollapsed}
          onClick={this.togglePanel}
        >
          <p>{this.state.panel.content}</p>
        </Panel>

        <h1>Accordion</h1>
        <Accordion panels={this.state.accordionPanels} onPanelClick={this.toggleAccordionPanel} />

        <h1>Search Bar</h1>
        <SearchBar
          searchString={this.state.searchBarString}
          searchPlaceholder="Search for all the things."
          onSearchStringChange={this.setSearchBarString}
          onSearch={this.performSearchBarSearch}
        />
      </div>
    );
  }
}

module.exports = AppComponent;
