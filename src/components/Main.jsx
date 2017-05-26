/* eslint-disable max-statements */

import _ from 'lodash';
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Immutable from 'seamless-immutable';
import moment from 'moment';
import {
  Accordion,
  Alert,
  Avatar,
  BorderedWell,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Checkbox,
  ConfirmModal,
  DatePicker,
  Empty,
  FlexibleSpacer,
  Grid,
  GridCell,
  GridRow,
  HelpIconPopover,
  ListPicker,
  Modal,
  PageTitle,
  PagedGrid,
  Panel,
  PrettyDiff,
  Radio,
  RadioGroup,
  SearchBar,
  SearchField,
  Slicey,
  Spinner,
  SpinnerButton,
  Statistic,
  SvgSymbol,
  SvgSymbolCircle,
  Tab,
  Tabs,
  Tag,
  TileGrid,
  Totals,
  TreePickerSimplePure,
  UserListPicker,
} from './distributionEntry';

import {
  ExampleForm,
  ExampleSelect,
  FilePickerDemo,
  TextEllipsisDemo,
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

const defaultBreadcrumbNodes = [
  { id: 'aaa-111', label: 'Australia' },
  { id: 'aaa-222', label: 'Victoria' },
  { id: 'aaa-333', label: 'Melbourne' },
];

const diffStrings = [
  '<the\n quick fox>',
  '<the\n slow fox jumped>',
];

const titleWithHelp = <div>I am a title<HelpIconPopover id="1">How does this work?</HelpIconPopover></div>;

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    for (const methodName of [
      'setPickerSearchValue',
      'setPurePickerSearchValue',
      'setSearchBarString',
      'setSelectedDate',
      'breadcrumbOnClick',
      'expandChildren',
      'performSearchBarSearch',
      'pickerBreadcrumbOnClick',
      'pickerSearchOnClear',
      'searchOnChange',
      'searchOnClear',
      'searchOnQuery',
      'toggleAccordionPanel',
      'toggleConfirmModal',
      'toggleListPickerModal',
      'togglePanel',
      'toggleSimpleModal',
      'toggleSplitListPickerModal',
      'toggleUserListPickerModal',
    ]) { this[methodName] = this[methodName].bind(this); }

    this.state = {
      itemType: 'segment value',
      showSimpleModal: false,
      pickerSearchValue: '',
      purePickerSearchValue: '',
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
          title: titleWithHelp,
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
          content: (<div>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
              <li>List item 3</li>
              <li>List item 4</li>
            </ul>
            <hr />
            <ul>
              <li>List item 5</li>
              <li>List item 6</li>
              <li>List item 7</li>
              <li>List item 8</li>
            </ul>
          </div>),
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
      pickerBreadcrumbNodes: [],
      breadcrumbNodes: defaultBreadcrumbNodes,
      searchValue: '',
    };

    this.throttledSearchOnQuery = _.throttle(() => this.searchOnQuery(this.state.searchValue), 200);
  }

  setPickerSearchValue(newValue) {
    this.setState({ pickerSearchValue: newValue });
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

  setPurePickerSearchValue(newValue) {
    this.setState({ purePickerSearchValue: newValue });
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

  setSearchBarString(searchBarString) {
    this.setState({ searchBarString });
  }

  setSelectedDate(newValue) {
    this.setState({ startDate: newValue });
  }

  breadcrumbOnClick(newActiveId) {
    const { breadcrumbNodes } = this.state;
    this.setState({
      breadcrumbNodes: _.slice(breadcrumbNodes, 0, 1 + _.findIndex(breadcrumbNodes, { id: newActiveId })),
    });
  }

  expandChildren() {
    let intervalId;

    const updateSubtree = () => {
      clearInterval(intervalId);
      this.setState({
        pickerBreadcrumbNodes: [auNode],
        simpleSubtree: [
          { id: '0', label: 'Northern Territory', path: [{ id: '10', label: 'Australia' }], type: '' },
          { id: '1', label: 'Australian Capital Territory', path: [{ id: '10', label: 'Australia' }], type: '' },
        ],
      });
    };

    intervalId = setInterval(updateSubtree, 1000);
  }

  performSearchBarSearch() {
    console.log(`Searching "${this.state.searchBarString}"...`);
  }

  pickerBreadcrumbOnClick() {
    this.setState({
      pickerBreadcrumbNodes: [],
      simpleSubtree: [auNode],
    });
  }

  pickerSearchOnClear() {
    this.setPickerSearchValue('');
  }

  searchOnChange(value) {
    this.setState({ searchValue: value }, this.throttledSearchOnQuery);
  }

  searchOnClear() {
    this.searchOnChange('');
  }

  searchOnQuery(query) {
    console.log('Query:', query); /* eslint no-console: 0 */

    const breadcrumbNodes = (query === '') ? defaultBreadcrumbNodes : [];
    this.setState({ breadcrumbNodes });
  }

  toggleAccordionPanel(panelId) {
    const nextPanels = Immutable.from(this.state.accordionPanels).asMutable({ deep: true });
    const panelToToggle = _.find(nextPanels, { id: panelId });
    panelToToggle.isCollapsed = !panelToToggle.isCollapsed;
    this.setState({ accordionPanels: nextPanels });
  }

  toggleConfirmModal() {
    this.setState({ showConfirmModal: !this.state.showConfirmModal });
  }

  toggleListPickerModal() {
    this.setState({ showListPickerModal: !this.state.showListPickerModal });
  }

  togglePanel() {
    const nextPanel = Immutable.from(this.state.panel).asMutable();
    nextPanel.isCollapsed = !nextPanel.isCollapsed;
    this.setState({ panel: nextPanel });
  }

  toggleSimpleModal() {
    this.setState({ showSimpleModal: !this.state.showSimpleModal });
  }

  toggleSplitListPickerModal() {
    this.setState({ showSplitListPickerModal: !this.state.showSplitListPickerModal });
  }

  toggleUserListPickerModal() {
    this.setState({ showUserListPickerModal: !this.state.showUserListPickerModal });
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

    const sliceyDataset = [
      { label: 'positive', value: 50 },
      { label: 'negative', value: 25 },
      { label: 'info', value: 35 },
    ];

    const cellClicked = () => console.log('Cell clicked');

    return (
      <div className="index">

        <h1>Adslot UI</h1>

        <h2>Buttons</h2>
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
          <Button bsStyle="link">
            Link
          </Button>
          <Button bsStyle="link" disabled>
            Link Disabled
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

        <h2>Spinner Buttons</h2>
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

        <FilePickerDemo />

        <h2>Tabs</h2>
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

        <h2>Modal</h2>
        <Button data-test-selector="button-modal" className="btn-inverse" onClick={this.toggleSimpleModal}>
          Open Modal
        </Button>

        <Modal show={this.state.showSimpleModal} bsSize="small" keyboard={false}>
          <Modal.Header closeButton onHide={this.toggleSimpleModal}>
            <Modal.Title>Modal Label <HelpIconPopover id="modal-title">This is my jam.</HelpIconPopover></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              All selected line items can not be <strong>Signed Off </strong>
              without targeting requirements configured. Please review your plan.
            </div>
          </Modal.Body>
          <Modal.Footer>
            <label className="pull-left">
              <strong>NOTE:</strong> This could have something useful to say.
              <HelpIconPopover placement="bottom" id="modal-example-help">
                <p><strong>Further information.</strong></p>
                <p>If you're not sure what<br />to do you may find<br />this information<br />more insightful.</p>
              </HelpIconPopover>
            </label>
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


        <h2>Checkboxes</h2>
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

        <h2>Help Icon</h2>
        <HelpIconPopover id="help-text-example">
          <p>I think <em>you</em> know what to do.</p>
          <p><Slicey dataset={sliceyDataset} diameter={150} marker={0.2} donut /></p>
          <p>Cupcake ipsum dolor sit.</p>
          <p>Amet macaroon sweet roll pastry.</p>
          <p>Cake brownie chocolate<br />cake wafer muffin cotton<br />candy.</p>
        </HelpIconPopover>

        <h2>Radio Buttons</h2>
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


        <h2>Select</h2>
        <Provider store={store}>
          <ExampleSelect />
        </Provider>

        <h2>TreePickerSimplePure with initial state</h2>

        <TreePickerSimplePure
          itemType={this.state.itemType}
          hideIcon
          selectedNodes={[]}
          subtree={this.state.treePickerPureSubtree}
          emptySelectedListText={<div><b>Choose items of interest</b></div>}
          initialStateNode={<div><b>Start by searching for items</b></div>}
          searchValue={this.state.pickerSearchValue}
          searchOnChange={this.setPickerSearchValue}
          searchOnClear={this.pickerSearchOnClear}
          additionalClassNames={this.state.pickerSearchValue ? undefined : ['background-highlighted', 'test-class']}
        />

        <h2>TreePickerSimplePure without initial state</h2>

        <TreePickerSimplePure
          groupFormatter={(node) => `${node.label.split(' ').length} words`}
          itemType={this.state.itemType}
          selectedNodes={this.state.selectedNodes}
          breadcrumbNodes={this.state.pickerBreadcrumbNodes}
          breadcrumbOnClick={this.pickerBreadcrumbOnClick}
          subtree={this.state.simpleSubtree}
          searchValue={this.state.purePickerSearchValue}
          searchOnChange={this.setPurePickerSearchValue}
          expandNode={this.expandChildren}
          includeNode={_.noop}
          removeNode={_.noop}
          nodeRenderer={nodeRenderer}
        />

        <h2>ListPicker</h2>

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

        <h2>UserListPicker</h2>

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


        <h2>PagedGrid</h2>

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


        <h2>Date Picker</h2>
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

        <h2>Forms</h2>
        <Provider store={store}>
          <ExampleForm />
        </Provider>

        <h2>Panel</h2>
        <Panel
          id={this.state.panel.id}
          title={this.state.panel.title}
          isCollapsed={this.state.panel.isCollapsed}
          onClick={this.togglePanel}
        >
          <p>{this.state.panel.content}</p>
        </Panel>

        <h2>Accordion</h2>
        <Accordion panels={this.state.accordionPanels} onPanelClick={this.toggleAccordionPanel} />

        <h2>Search Bar</h2>
        <SearchBar
          searchString={this.state.searchBarString}
          searchPlaceholder="Search for all the things."
          searchIconHref="/assets/svg-symbols.svg#search"
          onSearchStringChange={this.setSearchBarString}
          onSearch={this.performSearchBarSearch}
        />

        <h2>Carousel</h2>
        <Carousel>
          <a style={{ display: 'block' }} href="/">
            <img src="/assets/carousel/carousel-1.jpg" alt="Slide 1" />
          </a>
          <img src="/assets/carousel/carousel-2.jpg" alt="Slide 2" />
          <div style={{ position: 'relative' }}>
            <h2
              style={{
                position: 'absolute',
                right: 0,
                left: 0,
                textAlign: 'center',
                color: '#fff',
              }}
            >ＡＥＳＴＨＥＴＩＣＳ</h2>
            <img src="/assets/carousel/carousel-3.jpg" alt="Slide 3" />
          </div>
          <img src="/assets/carousel/carousel-4.jpg" alt="Slide 4" />
        </Carousel>


        <h1>Alexandria</h1>

        <h2>Alert</h2>
        <Alert type="success">You did it!</Alert>
        <Alert type="info" dts="yay">Alert with DTS</Alert>

        <h2>Avatar</h2>
        <Avatar givenName="John" surname="Smith" />
        <Avatar givenName="John" surname="Smith" color="blue" />
        <Avatar givenName="John" surname="Smith" color="green" />
        <Avatar givenName="John" surname="Smith" color="red" />
        <Avatar givenName="John" surname="Smith" color="orange" />
        <Avatar givenName="John" surname="Smith" color="cyan" />
        <Avatar givenName="John" surname="Smith" image="//lorempixel.com/35/35/people/7" />

        <h2>BorderedWell</h2>
        <BorderedWell>
          <PageTitle title={titleWithHelp} />
          <Empty
            collection={[]}
            text="Empty"
            svgSymbol={{ href: '/assets/svg-symbols.svg#checklist-incomplete' }}
          />
          <PageTitle isFooter>
            <SvgSymbol />
          </PageTitle>
        </BorderedWell>

        <h2>Breadcrumb</h2>
        <Breadcrumb nodes={this.state.breadcrumbNodes} onClick={this.breadcrumbOnClick} />

        <h2>Cards</h2>
        <Card.Container>
          <Card.Content><small>I am Cardy McCardface.</small></Card.Content>
          <Card.Content><em>I am Cardy McCardface.</em></Card.Content>
          <Card.Content><strong>I am Cardy McCardface.</strong></Card.Content>
        </Card.Container>
        <div className="card-component-grid-container">
          <Card.Container accent="0">
            <Card.Content fill><PageTitle title="Card" /></Card.Content>
            <Card.Content>I am a card with an accent.</Card.Content>
            <Card.Content><Avatar givenName="Cardy" surname="McCardface" color="green" /></Card.Content>
          </Card.Container>
          <Card.Container>
            <Card.Content fill><PageTitle title="Card" /></Card.Content>
            <Card.Content>
              <Avatar givenName="Cardy" surname="McCardface" color="red" />
              <span>&nbsp;I am a card.</span>
            </Card.Content>
          </Card.Container>
          <Card.Container className="fixed-height-card">
            <Card.Content stretch><Alert type="info">I am a fixed height card.</Alert></Card.Content>
            <FlexibleSpacer />
            <Card.Content>I have <code>flex</code> spacing.</Card.Content>
          </Card.Container>
          <Card.Container>
            <Card.Content>I am a card with a sub-note.</Card.Content>
            <Card.Content append>
              <span>Append me.</span>
            </Card.Content>
          </Card.Container>
        </div>

        <h2>Empty</h2>
        <Empty
          collection={[]}
          text="I'm hungry"
          svgSymbol={{ href: '/assets/svg-symbols.svg#checklist-incomplete' }}
        />

        <Empty
          collection={[]}
          text="Don't show the icon"
          svgSymbol={{ href: '/assets/svg-symbols.svg#checklist-incomplete' }}
          hideIcon
        />

        <h2>FlexibleSpacer</h2>
        <small>Expands to fill leftover space in a <code>display: flex;</code> container:</small>
        <FlexibleSpacer />

        <h2>Grid</h2>
        <Grid>
          <GridRow type="header">
            <GridCell>
              Header
            </GridCell>
            <GridCell>
              Header
            </GridCell>
            <GridCell>
              Header
            </GridCell>
          </GridRow>
          <GridRow verticalCellBorder>
            <GridCell stretch>
              Content
            </GridCell>
            <GridCell>
              Content
            </GridCell>
            <GridCell>
              Content
            </GridCell>
          </GridRow>
          <GridRow>
            <GridCell>
              Content
            </GridCell>
            <GridCell>
              Content
            </GridCell>
            <GridCell onClick={cellClicked}>
              This Cell logs clicks.
            </GridCell>
          </GridRow>
        </Grid>

        <h2>Spinner</h2>
        <Spinner />
        { /* Custom sizes and colour style */ }
        <Spinner size="medium" colourStyle="warning" />
        <Spinner size="small" />

        <h2>PageTitle</h2>
        <PageTitle title="Alexandria">
          <Avatar givenName="A" surname="D" />
        </PageTitle>

        <h2>Pretty Diff</h2>
        <PrettyDiff newText={diffStrings[1]} oldText={diffStrings[0]} />

        <h2>Search</h2>
        <SearchField
          onChange={this.searchOnChange}
          onClear={this.searchOnClear}
          placeholder="Cities"
          value={this.state.searchValue}
        />

        <h2>Slicey</h2>
        <Slicey dataset={sliceyDataset} diameter={150} marker={0.2} donut />

        <h2>Statistic</h2>
        <Statistic value="50 Million" label="Page Views" />
        <br />
        <Statistic value="1" label="Inline Statistic" inline />

        <h2>SvgSymbol</h2>
        <SvgSymbol href="/assets/svg-symbols.svg#checklist-incomplete" classSuffixes={['70']} />
        <SvgSymbol href="/assets/svg-symbols.svg#checklist-incomplete" />

        <h2>SvgSymbolCircle</h2>
        <SvgSymbolCircle href="/assets/svg-symbols.svg#checklist-incomplete" classSuffixes={['50']} />
        <SvgSymbolCircle href="/assets/svg-symbols.svg#checklist-incomplete" />
        <SvgSymbolCircle href="/assets/svg-symbols.svg#checklist-incomplete" classSuffixes={['70', 'inverse']} />

        <h2>Tag</h2>
        <Tag actionIconSvgHref="/assets/svg-symbols.svg#cancel">You are it!</Tag>
        <Tag actionIconSvgHref="/assets/svg-symbols.svg#cancel" inverse>Inverse</Tag>
        <Tag actionIconSvgHref="/assets/svg-symbols.svg#cancel" accent="2" inverse onAction={_.noop} id="foo">
          Inverse Clearable
        </Tag>
        <Tag actionIconSvgHref="/assets/svg-symbols.svg#cancel" accent="1">Custom Colour</Tag>
        <Tag actionIconSvgHref="/assets/svg-symbols.svg#cancel" inverse accent="1">Inverse Custom Colour</Tag>
        <Tag accent="2" onAction={_.noop} id="bar" actionIconSvgHref="/assets/svg-symbols.svg#cancel">Clearable</Tag>
        <Tag accent="2" onAction={_.noop} id="bar" actionIconSvgHref="/assets/svg-symbols.svg#cancel">
          <div style={{ width: '100px' }}>Column 1</div>
          <div style={{ width: '100px' }}>Column 2</div>
          <div style={{ width: '100px' }}>
            Column 3
            <p>multiline<br />content</p>
          </div>
        </Tag>

        <p>
          <label className="accent-0">Example</label>
          <label className="accent-1"> accent </label>
          <label className="accent-2">sharing</label>
        </p>

        <h2>TileGrid</h2>
        <TileGrid
          title="Browse by category"
          items={[
            { id: '0', classSuffix: 'news', title: 'News' },
            { id: '1', classSuffix: 'sport', title: 'Sport' },
            { id: '2', classSuffix: 'health', title: 'Health & Fitness' },
            { id: '3', classSuffix: 'tech', title: 'Technology & Computing' },
          ]}
          onItemClick={_.noop}
        />

        <h2>Totals</h2>
        <Grid>
          <GridRow>
            <GridCell stretch>In the sum but not in the Totals Component</GridCell>
            <GridCell>10</GridCell>
          </GridRow>
        </Grid>
        <Totals
          toSum={[
            { value: 10, isHidden: true },
            { label: 'Movies Category - Medium Rectangle', value: 1000 },
            { label: 'Selected', value: 36.80 },
          ]}
        />

        <TextEllipsisDemo />
      </div>
    );
  }
}

module.exports = AppComponent;
