import _ from 'lodash';
import React from 'react';
import { render, screen, user, within } from 'testing';
import Empty from '../Empty';
import ListPickerPure from '.';
import ListPickerMocks from '../ListPicker/mocks';

const { getInitialSelection, labelFormatter, teamMember4, userHeaders, nodeUserHeaders, users, usersWithUuid } =
  ListPickerMocks;

const selectedItems = getInitialSelection();

Object.freeze(selectedItems);

it('should render with defaults', () => {
  render(<ListPickerPure deselectItem={jest.fn()} selectItem={jest.fn()} />);

  expect(screen.getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');
  expect(screen.getByTestId('listpickerpure-wrapper')).toHaveAttribute(
    'data-test-selector',
    'listpickerpure-component-item'
  );
  expect(screen.getByTestId('grid-wrapper')).toBeInTheDocument();

  expect(screen.getByTestId('empty-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('empty-wrapper')).not.toBeEmptyDOMElement();
  expect(screen.getByTestId('empty-wrapper')).toHaveTextContent('No items to select.');
});

it('should render with props', () => {
  const props = {
    items: users,
    itemHeaders: userHeaders,
    itemType: 'user',
    labelFormatter,
    selectedItems,
  };
  render(<ListPickerPure {...props} deselectItem={jest.fn()} selectItem={jest.fn()} />);

  expect(screen.getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');
  expect(screen.getByTestId('listpickerpure-wrapper')).toHaveAttribute(
    'data-test-selector',
    'listpickerpure-component-user'
  );

  expect(screen.queryAllByTestId('grid-row-wrapper')[0]).toHaveClass('grid-component-row-header');
  expect(screen.queryAllByTestId('grid-row-wrapper')[0]).toContainElement(screen.getByText('Team'));
  expect(screen.queryAllByTestId('grid-row-wrapper')[0]).toContainElement(screen.getByText('Member'));
  expect(screen.getByText('Team')).toHaveClass('grid-component-cell');
  expect(screen.getByText('Member')).toHaveClass('grid-component-cell');

  screen.queryAllByTestId('grid-row-wrapper').forEach((each) => expect(each).toHaveClass('grid-component-row'));
  expect(screen.queryAllByTestId('grid-row-wrapper')[1]).toContainElement(screen.getByText('John Smith'));
  expect(screen.queryAllByTestId('grid-row-wrapper')[2]).toContainElement(screen.getByText('Jane Doe'));
  expect(screen.queryAllByTestId('grid-row-wrapper')[3]).toContainElement(screen.getByText('Jack White'));

  expect(screen.getByText('John Smith').parentElement).toHaveAttribute('data-test-selector', 'label');
  expect(screen.getByText('John Smith').parentElement).toHaveClass('grid-component-cell-stretch');
  expect(screen.getByText('Jane Doe').parentElement).toHaveAttribute('data-test-selector', 'label');
  expect(screen.getByText('Jane Doe').parentElement).toHaveClass('grid-component-cell-stretch');
  expect(screen.getByText('Jack White').parentElement).toHaveAttribute('data-test-selector', 'label');
  expect(screen.getByText('Jack White').parentElement).toHaveClass('grid-component-cell-stretch');

  expect(screen.getByDts('user-1')).toHaveTextContent('John Smith');
  expect(screen.getByDts('user-2')).toHaveTextContent('Jane Doe');
  expect(screen.getByDts('user-3')).toHaveTextContent('Jack White');

  const toggles = screen.queryAllByDts('toggle');
  expect(toggles).toHaveLength(3);
  expect(within(toggles[0]).getByTestId('checkbox-input')).not.toBeChecked();
  expect(within(toggles[1]).getByTestId('checkbox-input')).toBeChecked();
  expect(within(toggles[2]).getByTestId('checkbox-input')).not.toBeChecked();
});

it('should render with props including items and selectItems with uuids', () => {
  const selectedItemsWithUuid = [teamMember4];
  const props = {
    items: usersWithUuid,
    itemHeaders: userHeaders,
    labelFormatter,
    selectedItems: selectedItemsWithUuid,
  };

  render(<ListPickerPure {...props} deselectItem={jest.fn()} selectItem={jest.fn()} />);

  expect(screen.getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');

  expect(screen.queryAllByTestId('grid-row-wrapper')[0]).toHaveClass('grid-component-row-header');
  expect(screen.queryAllByTestId('grid-row-wrapper')[0]).toContainElement(screen.getByText('Team'));
  expect(screen.queryAllByTestId('grid-row-wrapper')[0]).toContainElement(screen.getByText('Member'));

  screen.queryAllByTestId('grid-row-wrapper').forEach((each) => expect(each).toHaveClass('grid-component-row'));
  expect(screen.queryAllByTestId('grid-row-wrapper')[1]).toContainElement(screen.getByText('Jones Cheng'));
  expect(screen.queryAllByTestId('grid-row-wrapper')[2]).toContainElement(screen.getByText('Joe Huang'));

  expect(screen.getByText('Jones Cheng').parentElement).toHaveAttribute('data-test-selector', 'label');
  expect(screen.getByText('Jones Cheng').parentElement).toHaveClass('grid-component-cell-stretch');
  expect(screen.getByText('Joe Huang').parentElement).toHaveAttribute('data-test-selector', 'label');
  expect(screen.getByText('Joe Huang').parentElement).toHaveClass('grid-component-cell-stretch');

  const toggles = screen.queryAllByDts('toggle');
  expect(toggles).toHaveLength(2);
  expect(within(toggles[0]).getByTestId('checkbox-input')).toBeChecked();
  expect(within(toggles[1]).getByTestId('checkbox-input')).not.toBeChecked();
});

it('should render with props including addonFormatter', () => {
  const addonFormatter = () => <Empty />;
  const itemHeaders = _.assign({}, ListPickerMocks.userHeaders, {
    addon: 'Required',
  });
  const props = {
    items: users,
    itemHeaders,
    labelFormatter,
    selectedItems,
    addonFormatter,
  };
  render(<ListPickerPure {...props} deselectItem={jest.fn()} selectItem={jest.fn()} />);
  expect(screen.getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');

  expect(screen.queryAllByTestId('grid-row-wrapper')[0]).toHaveClass('grid-component-row-header');
  expect(screen.queryAllByTestId('grid-row-wrapper')[0]).toContainElement(screen.getByText('Team'));
  expect(screen.queryAllByTestId('grid-row-wrapper')[0]).toContainElement(screen.getByText('Member'));
  expect(screen.queryAllByTestId('grid-row-wrapper')[0]).toContainElement(screen.getByText('Required'));
  expect(screen.getByText('Required')).toHaveClass('grid-component-cell grid-component-cell-header-addon');

  expect(screen.queryAllByDts('addon')).toHaveLength(3);
  screen.queryAllByDts('addon').forEach((each) => {
    expect(each).toHaveClass('grid-component-cell-addon');
    expect(each).toHaveTextContent('Nothing to show.');
  });
});

it('should allow user to render node type label', () => {
  const props = {
    itemType: 'group-user',
    items: users,
    itemHeaders: nodeUserHeaders,
    labelFormatter,
    selectedItems,
  };
  render(<ListPickerPure {...props} deselectItem={jest.fn()} selectItem={jest.fn()} />);

  expect(screen.getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');
  expect(screen.getByTestId('listpickerpure-wrapper')).toHaveAttribute(
    'data-test-selector',
    'listpickerpure-component-group-user'
  );

  expect(screen.queryAllByTestId('grid-row-wrapper')[0]).toHaveClass('grid-component-row-header');
  expect(screen.queryAllByTestId('grid-row-wrapper')[0]).toContainElement(screen.getByText('Group'));
  expect(screen.queryAllByTestId('grid-row-wrapper')[0]).toContainElement(screen.getByText('Team'));
  expect(screen.queryAllByTestId('grid-row-wrapper')[0]).toContainElement(screen.getByText('Member'));
});

it('should render radio buttons with `allowMultiSelection` as false', () => {
  const props = { allowMultiSelection: false, items: users, selectedItems };
  render(<ListPickerPure {...props} deselectItem={jest.fn()} selectItem={jest.fn()} />);

  expect(screen.getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');

  expect(screen.getByDts('item-1')).toContainElement(screen.queryAllByDts('toggle')[0]);
  expect(screen.getByDts('item-2')).toContainElement(screen.queryAllByDts('toggle')[1]);
  expect(screen.getByDts('item-3')).toContainElement(screen.queryAllByDts('toggle')[2]);

  const toggles = screen.queryAllByDts('toggle');
  expect(toggles).toHaveLength(3);
  expect(within(toggles[0]).getByTestId('radio-input')).not.toBeChecked();
  expect(within(toggles[1]).getByTestId('radio-input')).toBeChecked();
  expect(within(toggles[2]).getByTestId('radio-input')).not.toBeChecked();
});

it('should call `selectItem` handler when we select', async () => {
  let handlerCalled = 0;
  let isAllowMultiSelection;
  const props = {
    allowMultiSelection: false,
    items: users,
    selectedItems,
    selectItem: (_item, allowMultiSelection) => {
      handlerCalled++;
      isAllowMultiSelection = allowMultiSelection;
    },
    deselectItem: jest.fn(),
  };
  render(<ListPickerPure {...props} />);

  expect(screen.getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');
  expect(screen.queryAllByTestId('radio-input')[0]).not.toBeChecked();

  await user.click(screen.queryAllByTestId('radio-input')[0]);
  expect(handlerCalled).toEqual(1);
  expect(isAllowMultiSelection).toEqual(false);
});

it('should call `deselectItem` handler when we deselect', async () => {
  let handlerCalled = 0;
  let isAllowMultiSelection;
  const props = {
    items: users,
    selectedItems,
    deselectItem: (_item, allowMultiSelection) => {
      handlerCalled++;
      isAllowMultiSelection = allowMultiSelection;
    },
    selectItem: jest.fn(),
  };
  render(<ListPickerPure {...props} />);

  expect(screen.getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');
  expect(screen.queryAllByTestId('checkbox-input')[1]).toBeChecked();

  await user.click(screen.queryAllByTestId('checkbox-input')[1]);
  expect(handlerCalled).toEqual(1);
  expect(isAllowMultiSelection).toEqual(true);
});

it('should be keyboard navigable', async () => {
  let handlerCalled = 0;
  let isAllowMultiSelection;
  const props = {
    allowMultiSelection: false,
    items: users,
    selectedItems,
    selectItem: (_item, allowMultiSelection) => {
      handlerCalled++;
      isAllowMultiSelection = allowMultiSelection;
    },
    deselectItem: jest.fn(),
  };
  render(<ListPickerPure {...props} />);

  expect(screen.getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');
  expect(screen.queryAllByTestId('radio-input')[0]).not.toBeChecked();
  await user.tab();
  await user.keyboard(' ');
  expect(handlerCalled).toEqual(1);
  expect(isAllowMultiSelection).toEqual(false);
  await user.keyboard('[ArrowDown][ArrowDown]');
  expect(screen.getAllByTestId('radio-wrapper')[2]).toHaveFocus();
});
