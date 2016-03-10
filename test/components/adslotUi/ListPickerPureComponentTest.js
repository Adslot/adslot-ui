import _ from 'lodash';
import Checkbox from 'react-icheck/lib/Checkbox';
import ListPickerMocks from 'mocks/ListPickerMocks';
import ListPickerPureComponent from 'components/adslotUi/ListPickerPureComponent';
import Radio from 'react-icheck/lib/Radio';
import React from 'react';
import { Empty, Grid, GridCell, GridRow } from 'alexandria-adslot';
import { createComponent } from 'testHelpers/shallowRenderHelpers';

describe('ListPickerPureComponent', () => {
  const {
    getInitialSelection,
    labelFormatter,
    userHeaders,
    users,
  } = ListPickerMocks;

  const selectedItems = getInitialSelection();

  Object.freeze(selectedItems);

  it('should render with defaults', () => {
    const component = createComponent(ListPickerPureComponent);
    expect(component.props.className).to.equal('listpickerpure-component');

    const gridElement = component.props.children[1].props.children;
    expect(gridElement.type).to.equal((<Grid />).type);

    const emptyElement = gridElement.props.children[1];
    expect(emptyElement.type).to.equal((<Empty />).type);
    expect(emptyElement.props.collection).to.have.length(0);
    expect(emptyElement.props.text).to.equal('No items to select.');
  });

  it('should render with props', () => {
    const component = createComponent(ListPickerPureComponent, {
      itemHeaders: userHeaders,
      items: users,
      labelFormatter,
      selectedItems,
    });
    expect(component.props.className).to.equal('listpickerpure-component');

    const headerGridElement = component.props.children[0];
    expect(headerGridElement.type).to.equal((<Grid />).type);

    const gridHeaderElement = headerGridElement.props.children;
    expect(gridHeaderElement.type).to.equal((<GridRow />).type);
    expect(gridHeaderElement.props.type).to.equal('header');

    const gridHeaderCellElements = gridHeaderElement.props.children;
    expect(gridHeaderCellElements[0].type).to.equal((<GridCell />).type);
    expect(gridHeaderCellElements[0].props.children).to.equal('Team');
    expect(gridHeaderCellElements[1].type).to.equal((<GridCell />).type);
    expect(gridHeaderCellElements[1].props.children).to.equal('Member');

    const gridElement = component.props.children[1].props.children;
    expect(gridElement.type).to.equal((<Grid />).type);

    const gridRowElements = gridElement.props.children[0];
    for (const index in gridRowElements) {
      if (gridRowElements[index]) {
        const gridRowElement = gridRowElements[index];
        const gridRowCellElements = gridRowElement.props.children;
        expect(gridRowCellElements[0].type).to.equal((<GridCell />).type);

        const gridRowCellLeftText = gridRowCellElements[0].props.children;
        expect(gridRowCellLeftText).to.equal(labelFormatter(users[index]));

        const gridRowCellToggleElement = gridRowCellElements[1].props.children;
        expect(gridRowCellToggleElement.type).to.equal((<Checkbox />).type);

        expect(gridRowCellToggleElement.props.checked).to.equal(_.some(selectedItems, { id: users[index].id }));
      }
    }
  });

  it('should render radio buttons with `allowMultiSelection` as false', () => {
    const component = createComponent(ListPickerPureComponent, {
      allowMultiSelection: false,
      items: users,
      selectedItems,
    });
    expect(component.props.className).to.equal('listpickerpure-component');

    const gridElement = component.props.children[1].props.children;
    expect(gridElement.type).to.equal((<Grid />).type);

    const gridRowElements = gridElement.props.children[0];

    for (const index in gridRowElements) {
      if (gridRowElements[index]) {
        const gridRowElement = gridRowElements[index];
        const gridRowCellElements = gridRowElement.props.children;
        expect(gridRowCellElements[0].type).to.equal((<GridCell />).type);

        const gridRowCellToggleElement = gridRowCellElements[1].props.children;
        expect(gridRowCellToggleElement.type).to.equal((<Radio />).type);

        expect(gridRowCellToggleElement.props.checked).to.equal(_.some(selectedItems, { id: users[index].id }));
      }
    }
  });

  it('should throw when we select without a `selectItem` handler', () => {
    const component = createComponent(ListPickerPureComponent, {
      items: users,
      selectedItems,
    });
    expect(component.props.className).to.equal('listpickerpure-component');

    const gridElement = component.props.children[1].props.children;
    const gridRowElements = gridElement.props.children[0];
    const unselectedCheckboxElement = gridRowElements[0].props.children[1].props.children;
    expect(unselectedCheckboxElement.props.checked).to.equal(false);

    expect(() => unselectedCheckboxElement.props.onChange(null, true)).to.throw(
      'AdslotUi ListPickerPure needs a selectItem handler'
    );
  });

  it('should throw when we deselect without a `deselectItem` handler', () => {
    const component = createComponent(ListPickerPureComponent, {
      items: users,
      selectedItems,
    });
    expect(component.props.className).to.equal('listpickerpure-component');

    const gridElement = component.props.children[1].props.children;
    const gridRowElements = gridElement.props.children[0];
    const selectedCheckboxElement = gridRowElements[1].props.children[1].props.children;
    expect(selectedCheckboxElement.props.checked).to.equal(true);

    expect(() => selectedCheckboxElement.props.onChange(null, false)).to.throw(
      'AdslotUi ListPickerPure needs a deselectItem handler'
    );
  });

  it('should call `selectItem` handler when we select', () => {
    let handlerCalled = 0;
    const component = createComponent(ListPickerPureComponent, {
      items: users,
      selectedItems,
      selectItem: () => handlerCalled++,
    });
    expect(component.props.className).to.equal('listpickerpure-component');

    const gridElement = component.props.children[1].props.children;
    const gridRowElements = gridElement.props.children[0];
    const unselectedCheckboxElement = gridRowElements[0].props.children[1].props.children;
    expect(unselectedCheckboxElement.props.checked).to.equal(false);

    unselectedCheckboxElement.props.onChange(null, true);
    expect(handlerCalled).to.equal(1);
  });

  it('should call `deselectItem` handler when we deselect', () => {
    let handlerCalled = 0;
    const component = createComponent(ListPickerPureComponent, {
      deselectItem: () => handlerCalled++,
      items: users,
      selectedItems,
    });
    expect(component.props.className).to.equal('listpickerpure-component');

    const gridElement = component.props.children[1].props.children;
    const gridRowElements = gridElement.props.children[0];
    const selectedCheckboxElement = gridRowElements[1].props.children[1].props.children;
    expect(selectedCheckboxElement.props.checked).to.equal(true);

    selectedCheckboxElement.props.onChange(null, false);
    expect(handlerCalled).to.equal(1);
  });
});
