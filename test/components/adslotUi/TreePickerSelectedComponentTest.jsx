import _ from 'lodash';
import immutable from 'seamless-immutable';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import React from 'react';
import TreePickerMocks from 'mocks/TreePickerMocks';
import TreePickerSelected from 'components/adslotUi/TreePickerSelectedComponent';
import { Alert, Empty, FlexibleSpacer, Grid, GridCell, GridRow, Totals } from 'alexandria-adslot';
import { shallow } from 'enzyme';

describe('TreePickerSelectedComponent', () => {
  const gridIndices = immutable({
    firstNode: 1,
    secondNode: 2,
  });

  const {
    actNode,
    itemType,
    ntNode,
    rootTypes,
  } = TreePickerMocks;

  const selectedNodesByRootType = immutable(_.groupBy([actNode, ntNode], 'rootTypeId'));

  const checkHeader = (component, props = {}) => {
    const headerElement = component.find('.treepickerselected-component-header');
    expect(headerElement.type()).to.equal('h1');
    expect(headerElement.text()).to.equal(props.selectedLabel || 'Selected');
  };

  const checkSubFooter = ({ gridRows, mode, value }) => {
    const subFooterRowElement = gridRows.last();
    expect(subFooterRowElement.prop('type')).to.equal('subfooter');

    const subFooterFirstCell = subFooterRowElement.find(GridCell).first();
    expect(subFooterFirstCell.prop('stretch')).to.equal(true);
    expect(subFooterFirstCell.children()).to.have.length(0);

    const subFooterSecondCell = subFooterRowElement.find(GridCell).at(1);
    const overlayTriggerElement = subFooterSecondCell.find(OverlayTrigger);
    expect(overlayTriggerElement.prop('placement')).to.equal('left');

    const popoverElement = overlayTriggerElement.prop('overlay');
    expect(popoverElement.type).to.equal((<Popover id="" />).type);
    expect(popoverElement.props.id).to.equal('subtotal-a');
    const modeText = (mode === 'Average') ?
      'Selecting adjusts the set distribution, but not the set size.' :
      'Selecting adjusts the set distribution and size.';
    expect(popoverElement.props.children).to.equal(modeText);

    const subtotalTextElement = overlayTriggerElement.children();
    expect(subtotalTextElement.text()).to.equal(mode);

    const subFooterThirdCell = subFooterRowElement.find(GridCell).last();
    expect(subFooterThirdCell.children().text()).to.equal(value);
  };

  it('should render with defaults', () => {
    const component = shallow(<TreePickerSelected itemType={itemType} />);
    expect(component.prop('className')).to.equal('treepickerselected-component');

    checkHeader(component);

    const scrollableElement = component.find('.treepickerselected-component-scrollable');
    const gridElements = scrollableElement.find(Grid);
    expect(gridElements).to.have.length(0);

    const emptyElement = scrollableElement.find(Empty);
    expect(emptyElement.prop('collection')).to.have.length(0);
    expect(emptyElement.prop('svgSymbol').classSuffixes).to.deep.equal(['gray-darker', '70', 'circle']);
    expect(emptyElement.prop('text')).to.equal('Nothing selected.');

    const flexibleSpacerElement = scrollableElement.find(FlexibleSpacer);
    expect(flexibleSpacerElement).to.have.length(1);

    const alertElement = component.find(Alert);
    expect(alertElement).to.have.length(0);

    const totalsElement = component.find(Totals);
    expect(totalsElement.prop('toSum')).to.deep.equal([
      { label: 'Base', value: 0 },
      { label: 'Selected', value: 0 },
    ]);
    expect(totalsElement.prop('valueFormatter')).to.be.a('function');
    expect(totalsElement.prop('valueFormatter')(500)).to.equal(500);
  });

  it('should render with props', () => {
    const props = {
      averageWithinRootType: true,
      emptyIcon: 'awesome-url',
      emptySvgSymbol: { href: '/some.svg#id' },
      itemType,
      selectedLabel: 'Selected Targeting',
      rootTypes,
      selectedNodesByRootType,
      totalsSuffix: 'CPM',
    };
    const component = shallow(<TreePickerSelected {...props} />);
    expect(component.prop('className')).to.equal('treepickerselected-component');

    checkHeader(component, { selectedLabel: 'Selected Targeting' });

    const alertElement = component.find(Alert);
    expect(alertElement.prop('type')).to.equal('danger');
    expect(alertElement.children().map((node) => node.text())).to.deep.equal(['Required: ', 'Segments', '.']);

    const scrollableElement = component.find('.treepickerselected-component-scrollable');
    expect(scrollableElement.prop('className')).to.equal('treepickerselected-component-scrollable is-short');

    const gridElements = scrollableElement.find(Grid);
    expect(gridElements).to.have.length(1);

    const gridElement = gridElements.first();
    const gridRows = gridElement.find(GridRow);
    const headerRowElement = gridRows.first();
    expect(headerRowElement.prop('type')).to.equal('header');

    const headerFirstCell = headerRowElement.find(GridCell);
    expect(headerFirstCell.prop('stretch')).to.equal(true);
    expect(headerFirstCell.children().text()).to.equal('Geography');

    const firstNodeElement = gridElement.children().at(gridIndices.firstNode);
    expect(firstNodeElement.prop('selected')).to.equal(true);
    expect(firstNodeElement.prop('valueFormatter')).to.be.a('function');
    expect(firstNodeElement.prop('includeNode')).to.be.a('function');
    expect(firstNodeElement.prop('includeNode')()).to.be.a('null');
    expect(firstNodeElement.prop('node')).to.deep.equal(actNode);
    expect(firstNodeElement.prop('removeNode')).to.be.a('function');
    expect(firstNodeElement.prop('removeNode')()).to.be.a('null');

    const secondNodeElement = gridElement.children().at(gridIndices.secondNode);
    expect(secondNodeElement.prop('node')).to.deep.equal(ntNode);

    checkSubFooter({ gridRows, mode: 'Average', value: '750 CPM' });

    const emptyElement = scrollableElement.find(Empty);
    expect(emptyElement.prop('collection')).to.deep.equal([[actNode, ntNode]]);
    expect(emptyElement.prop('svgSymbol')).to.deep.equal({ href: '/some.svg#id' });
    expect(emptyElement.prop('text')).to.equal('Nothing selected.');

    const totalsElement = component.find(Totals);
    expect(totalsElement.prop('toSum')).to.deep.equal([
      { label: 'Base', value: 0 },
      { label: 'Selected Targeting', value: 750 },
    ]);
    expect(totalsElement.prop('valueFormatter')).to.be.a('function');
    expect(totalsElement.prop('valueFormatter')(500)).to.equal('500 CPM');
  });

  it('should render with averageWithinRootType false', () => {
    const props = {
      averageWithinRootType: false,
      itemType,
      rootTypes,
      selectedNodesByRootType,
    };
    const component = shallow(<TreePickerSelected {...props} />);

    const totalsElement = component.find(Totals);
    expect(totalsElement.prop('toSum')).to.deep.equal([
      { label: 'Base', value: 0 },
      { label: 'Selected', value: 1500 },
    ]);

    const scrollableElement = component.find('.treepickerselected-component-scrollable');
    const gridElements = scrollableElement.find(Grid);
    const gridElement = gridElements.first();
    const gridRows = gridElement.find(GridRow);

    checkSubFooter({ gridRows, mode: 'Subtotal', value: '1500' });
  });

  it('should render alert as warning when warnOnRequired is true', () => {
    const props = {
      itemType,
      rootTypes,
      selectedNodesByRootType,
      warnOnRequired: true,
    };
    const component = shallow(<TreePickerSelected {...props} />);

    const alertElement = component.find(Alert);
    expect(alertElement.prop('type')).to.equal('warning');
    expect(alertElement.children().map((node) => node.text())).to.deep.equal(['Required: ', 'Segments', '.']);
  });

  it('should error when there is a selectedNode with no corresponding rootType', () => {
    expect(() => {
      shallow(<TreePickerSelected itemType={itemType} selectedNodesByRootType={selectedNodesByRootType} />);
    }).to.throw('TreePickerSelectedComponent requires a rootType for id a');
  });
});
