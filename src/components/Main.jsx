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
  CategorySearch,
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
  SvgSymbol,
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
      'setCategory',
      'setCategorySearchString',
      'setSearchValue',
      'searchOnClear',
      'setSelectedDate',
      'setSearchTreePickerPure',
      'performCategorySearch',
      'toggleConfirmModal',
      'toggleListPickerModal',
      'toggleSimpleModal',
      'toggleSplitListPickerModal',
      'toggleTreePickerModal',
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
      simpleSubtree: [
        { id: '0', label: 'Northern Territory', path: [{ id: '10', label: 'AU' }], type: '' },
        { id: '1', label: 'Australian Capital Territory', path: [{ id: '10', label: 'AU' }], type: '' },
      ],
      treePickerPureSubtree: [],
      selectedNodes: [
        { id: '2', label: 'Norfolk Island', path: [{ id: '11', label: 'AU' }], type: '', isSelectable: false },
        { id: '3', label: 'Queensland', path: [{ id: '12', label: 'AU' }], type: '' },
      ],
      category: '0',
      categoryOptions: [
        { value: '0', label: 'All Categories' },
        { value: '1', label: 'Arts & Entertainment' },
        { value: '2', label: 'Automotive' },
        { value: '3', label: 'Business' },
        { value: '4', label: 'Careers' },
        { value: '5', label: 'Education' },
        { value: '6', label: 'Family & Parenting' },
        { value: '7', label: 'Food & Drink' },
        { value: '8', label: 'Health & Fitness' },
        { value: '9', label: 'Hobbies & Interests' },
        { value: '10', label: 'Home & Garden' },
        { value: '11', label: 'Law, Gov\'t & Politics' },
        { value: '12', label: 'News' },
        { value: '25', label: 'Personal Finance' },
        { value: '13', label: 'Pets' },
        { value: '14', label: 'Real Estate' },
        { value: '15', label: 'Religion & Spirituality' },
        { value: '16', label: 'Science' },
        { value: '17', label: 'Shopping' },
        { value: '18', label: 'Society' },
        { value: '19', label: 'Sports' },
        { value: '24', label: 'Style & Fashion' },
        { value: '20', label: 'Technology & Computing' },
        { value: '21', label: 'Travel' },
        { value: '23', label: 'Other' },
      ],
      categorySearchString: '',
    };
  }

  searchOnClear() {
    this.setSearchValue('');
  }

  setCategory(categoryValue) {
    this.setState({ category: categoryValue });
  }

  setCategorySearchString(searchString) {
    this.setState({ categorySearchString: searchString });
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

  performCategorySearch() {
    console.log(`Searching "${this.state.categorySearchString}"...`);
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
    const baseItem = {
      label: 'Awesome Product',
      value: 10000,
    };

    const valueFormatter = (value) => `$${Math.round(value) / 100}`;

    const labelFormatter = (item) => `${item.givenName} ${item.surname}`;

    const addonFormatter = () => (<Checkbox />);

    const nodeRenderer = (value) => (<Checkbox label={value.label}/>);

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
          {
            id: '3',
            label: 'South Australia',
            isSelectable: false,
            type: 'State',
            path: auPath,
            value: 500,
            rootTypeId: '0',
          },
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
          <Button className="btn-inverse" bsStyle="primary" disabled>
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
          <a className="btn btn-inverse" href="#">Anchor</a>
          <span className="btn btn-inverse btn-primary">Span</span>
          <div className="btn btn-inverse btn-success">Div</div>
        </div>


        <h1>Tabs</h1>
        <div className="btn-panel">
          <Tabs defaultActiveKey="Audience" animation={false}>
            <Tab eventKey="Targeting" title="Targeting" active>Targeting content</Tab>
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
          itemType="segment value"
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

        <h1>TreePickerSimplePure with initial state</h1>

        <TreePickerSimplePure
          itemType={this.state.itemType}
          selectedNodes={[]}
          subtree={this.state.treePickerPureSubtree}
          initialStateNode={<div><h><b>Start by searching for items</b></h></div>}
          searchValue={this.state.searchValue}
          searchOnChange={this.setSearchValue}
          searchOnClear={this.searchOnClear}
          additionalClassNames={this.state.searchValue ? undefined : ['background-highlighted', 'test-class']}
        />

        <h1>TreePickerSimplePure without initial state</h1>

        <TreePickerSimplePure
          itemType={this.state.itemType}
          selectedNodes={this.state.selectedNodes}
          subtree={this.state.simpleSubtree}
          searchValue={this.state.searchValueTreePickerPure}
          searchOnChange={this.setSearchTreePickerPure}
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

        <h1>Category Search</h1>
        <CategorySearch
          category={this.state.category}
          categoryOptions={this.state.categoryOptions}
          onCategorySelect={this.setCategory}
          searchString={this.state.categorySearchString}
          searchPlaceholder="Search for all the things."
          onSearchStringChange={this.setCategorySearchString}
          onSearch={this.performCategorySearch}
        />
      </div>
    );
  }
}

module.exports = AppComponent;
