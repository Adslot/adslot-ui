/* eslint-env node, mocha */
/* global expect */

import _ from 'lodash';
import createComponent from 'testHelpers/shallowRenderHelper';
import Checkbox from 'react-icheck/lib/Checkbox';
import ListPickerMocks from 'mocks/ListPickerMocks';
import ListPickerPureComponent from 'components/adslotUi/ListPickerPureComponent';
import React from 'react';
import { Grid, GridCell, GridRow } from 'alexandria-adslot';

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

    const gridElement = component.props.children;
    expect(gridElement.type).to.equal((<Grid />).type);
  });

  it('should render with props', () => {
    const component = createComponent(ListPickerPureComponent, {
      itemHeaders: userHeaders,
      items: users,
      labelFormatter,
      selectedItems,
    });
    expect(component.props.className).to.equal('listpickerpure-component');

    const gridElement = component.props.children;
    expect(gridElement.type).to.equal((<Grid />).type);

    const gridHeaderElement = gridElement.props.children[0];
    expect(gridHeaderElement.type).to.equal((<GridRow />).type);
    expect(gridHeaderElement.props.type).to.equal('header');
    const gridHeaderCellElements = gridHeaderElement.props.children;
    expect(gridHeaderCellElements[0].type).to.equal((<GridCell />).type);
    expect(gridHeaderCellElements[0].props.children).to.equal('Team');
    expect(gridHeaderCellElements[1].type).to.equal((<GridCell />).type);
    expect(gridHeaderCellElements[1].props.children).to.equal('Member');

    const gridRowElements = gridElement.props.children[1];
    for (const index in gridRowElements) {
      if (gridRowElements[index]) {
        const gridRowElement = gridRowElements[index];
        const gridRowCellElements = gridRowElement.props.children;
        expect(gridRowCellElements[0].type).to.equal((<GridCell />).type);

        const gridRowCellLeftText = gridRowCellElements[0].props.children;
        expect(gridRowCellLeftText).to.equal(labelFormatter(users[index]));

        const gridRowCellCheckboxElement = gridRowCellElements[1].props.children;
        expect(gridRowCellCheckboxElement.type).to.equal((<Checkbox />).type);

        expect(gridRowCellCheckboxElement.props.checked).to.equal(_.includes(selectedItems, users[index]));
      }
    }
  });

  it('should throw when we select without a `selectItem` handler', () => {
    const component = createComponent(ListPickerPureComponent, {
      items: users,
      selectedItems,
    });
    expect(component.props.className).to.equal('listpickerpure-component');

    const gridElement = component.props.children;
    const gridRowElements = gridElement.props.children[1];
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

    const gridElement = component.props.children;
    const gridRowElements = gridElement.props.children[1];
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

    const gridElement = component.props.children;
    const gridRowElements = gridElement.props.children[1];
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

    const gridElement = component.props.children;
    const gridRowElements = gridElement.props.children[1];
    const selectedCheckboxElement = gridRowElements[1].props.children[1].props.children;
    expect(selectedCheckboxElement.props.checked).to.equal(true);

    selectedCheckboxElement.props.onChange(null, false);
    expect(handlerCalled).to.equal(1);
  });
});
