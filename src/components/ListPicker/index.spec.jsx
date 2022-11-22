import React from 'react';
import { render, screen, user } from 'testing';
import Radio from '../Radio';
import SvgSymbol from '../SvgSymbol';
import ListPicker from '.';
import ListPickerMocks from '../ListPicker/mocks';

const { getInitialSelection, userHeaders, users, labelFormatter, teamMember2 } = ListPickerMocks;

it('should render with defaults', () => {
  render(
    <ListPicker itemInfo={{ label: 'Label', properties: [] }} show modalApply={jest.fn()} modalClose={jest.fn()} />
  );
  expect(screen.getByTestId('action-panel-wrapper')).toHaveClass('listpicker-component');
  expect(screen.getByText('Select Items')).toHaveClass('title');

  const listpickerPure = screen.getByTestId('listpickerpure-wrapper');
  expect(listpickerPure).toContainElement(screen.getByTestId('empty-wrapper'));
  expect(screen.getByTestId('empty-wrapper').children).toHaveLength(1); //undefined emptyIcon
  expect(screen.getByTestId('empty-wrapper')).toContainElement(screen.getByTestId('empty-text'));
  expect(screen.getByTestId('empty-text')).toHaveTextContent('No items to select.');

  expect(screen.getByTestId('action-panel-header')).toHaveClass('has-actions');
  expect(screen.getByTestId('action-panel-header')).toContainElement(screen.getByText('Cancel'));
  expect(screen.getByTestId('action-panel-header')).toContainElement(screen.getByText('Apply'));
});

it('should render with props', () => {
  const initialSelection = getInitialSelection();
  const items = users;
  const props = {
    emptyMessage: 'No users.',
    emptySvgSymbol: <SvgSymbol href="/some.svg#id" />,
    initialSelection,
    itemHeaders: userHeaders,
    itemType: 'user',
    labelFormatter,
    linkButtons: [{ label: 'Create User', href: '#' }],
    modalDescription: 'Select users.',
    modalFootnote: 'You can select multiple users.',
    modalTitle: 'Select Users',
    modalApply: jest.fn(),
    modalClose: jest.fn(),
  };
  const view = render(<ListPicker {...props} items={items} show />);

  expect(screen.getByTestId('action-panel-wrapper')).toHaveClass('listpicker-component');
  expect(screen.getByText('Select Users')).toHaveClass('title');

  expect(screen.getByText('You can select multiple users.')).toHaveClass('listpicker-component-footnote');

  // items
  expect(screen.getByText('John Smith').parentElement.parentElement).toHaveAttribute('data-test-selector', 'user-1');
  expect(screen.getByText('Jane Doe').parentElement.parentElement).toHaveAttribute('data-test-selector', 'user-2');
  expect(screen.getByText('Jack White').parentElement.parentElement).toHaveAttribute('data-test-selector', 'user-3');

  expect(screen.getAllByTestId('checkbox-input')).toHaveLength(3);
  expect(screen.getAllByTestId('checkbox-input')[0]).not.toBeChecked();
  expect(screen.getAllByTestId('checkbox-input')[1]).toBeChecked(); // selectedItems
  expect(screen.getAllByTestId('checkbox-input')[2]).not.toBeChecked();

  expect(screen.getByTestId('action-panel-header')).toHaveClass('has-actions');
  expect(screen.getByTestId('action-panel-header')).toContainElement(screen.getByText('Cancel'));
  expect(screen.getByTestId('action-panel-header')).toContainElement(screen.getByText('Create User'));

  expect(screen.getByText('Create User').parentElement).toHaveAttribute('href', '#');
  expect(screen.getByText('Create User').parentElement).toHaveClass('aui--anchor aui-default aui-inverse');

  expect(screen.getByTestId('listpickerpure-wrapper')).toHaveAttribute(
    'data-test-selector',
    'listpickerpure-component-user'
  ); // itemType: 'user'

  expect(screen.getByText('Team')).toHaveClass('grid-component-cell-stretch'); // itemHeaders: userHeaders
  expect(screen.getByText('Member')).toHaveClass('grid-component-cell-header-toggle');

  expect(screen.queryByTestId('svg-symbol-wrapper')).not.toBeInTheDocument();

  view.rerender(<ListPicker {...props} show />);
  expect(screen.getByTestId('svg-symbol-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('svg-symbol-use')).toHaveAttribute('href', '/some.svg#id'); // emptySvgSymbol
  expect(screen.getByTestId('empty-text')).toHaveTextContent('No users.'); //emptyMessage
});

it('should render with props for split pane', () => {
  const itemInfo = {
    label: 'User Details',
    properties: [
      { label: 'Name', value: 'Jill Smith' },
      { label: 'Age', value: '21' },
    ],
  };
  const initialSelection = getInitialSelection();
  const emptySvgSymbol = <div data-testid="testing-empty-svgsymbol" />;
  const props = {
    emptySvgSymbol,
    emptyMessage: 'No users.',
    initialSelection,
    items: users,
    itemHeaders: userHeaders,
    itemInfo,
    itemType: 'user',
    labelFormatter,
    modalDescription: 'Select users.',
    modalFootnote: 'You can select multiple users.',
    modalTitle: 'Select Users',
    modalApply: jest.fn(),
    modalClose: jest.fn(),
  };
  render(<ListPicker {...props} show />);
  expect(screen.getByTestId('action-panel-wrapper')).toHaveClass('listpicker-component');

  expect(screen.getByText('Select Users')).toHaveClass('title');

  expect(screen.getByText('Select users.').tagName).toEqual('P');
  expect(screen.getByText('Select users.').parentElement).toHaveClass('aui--action-panel-body');

  expect(screen.getByText('You can select multiple users.')).toHaveClass('listpicker-component-footnote');

  expect(screen.getAllByTestId('split-panel-wrapper')).toHaveLength(2);
  expect(screen.getAllByTestId('split-panel-wrapper')[0]).toHaveAttribute('data-test-selector', 'user-details');
  expect(screen.getAllByTestId('split-panel-wrapper')[0]).toContainElement(screen.getByText('User Details'));

  expect(screen.getByText('Name')).toHaveClass('grid-component-cell');
  expect(screen.getByText('Jill Smith')).toHaveClass('grid-component-cell');
  expect(screen.getByText('Jill Smith')).toHaveAttribute('data-test-selector', 'name');

  expect(screen.getByText('Age')).toHaveClass('grid-component-cell');
  expect(screen.getByText('21')).toHaveClass('grid-component-cell');
  expect(screen.getByText('21')).toHaveAttribute('data-test-selector', 'age');

  expect(screen.getAllByTestId('split-panel-wrapper')[1]).toContainElement(
    screen.getByTestId('listpickerpure-wrapper')
  );

  // items
  expect(screen.getByText('John Smith').parentElement.parentElement).toHaveAttribute('data-test-selector', 'user-1');
  expect(screen.getByText('Jane Doe').parentElement.parentElement).toHaveAttribute('data-test-selector', 'user-2');
  expect(screen.getByText('Jack White').parentElement.parentElement).toHaveAttribute('data-test-selector', 'user-3');

  expect(screen.getAllByTestId('checkbox-input')).toHaveLength(3);
  expect(screen.getAllByTestId('checkbox-input')[0]).not.toBeChecked();
  expect(screen.getAllByTestId('checkbox-input')[1]).toBeChecked(); // selectedItems
  expect(screen.getAllByTestId('checkbox-input')[2]).not.toBeChecked();

  expect(screen.getByTestId('listpickerpure-wrapper')).toHaveAttribute(
    'data-test-selector',
    'listpickerpure-component-user'
  ); // itemType: 'user'

  expect(screen.getByText('Team')).toHaveClass('grid-component-cell-stretch'); // itemHeaders: userHeaders
  expect(screen.getByText('Member')).toHaveClass('grid-component-cell-header-toggle');
});

it('should disable apply button for empty selection if `allowEmptySelection` is false', () => {
  const props = { allowEmptySelection: false, items: users };
  render(<ListPicker {...props} show modalApply={jest.fn()} modalClose={jest.fn()} />);
  expect(screen.getByTestId('action-panel-header')).toContainElement(screen.getByText('Apply'));
  expect(screen.getByText('Apply').parentElement).toBeDisabled();
});

it('should change `selectedItems` state after a `selectItem` action', async () => {
  const props = { initialSelection: getInitialSelection(), labelFormatter, items: users };
  render(<ListPicker {...props} show modalApply={jest.fn()} modalClose={jest.fn()} />);

  expect(screen.getByText('John Smith').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-1');
  expect(screen.getByText('Jane Doe').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-2');
  expect(screen.getByText('Jack White').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-3');

  expect(screen.getAllByTestId('checkbox-input')).toHaveLength(3);
  expect(screen.getAllByTestId('checkbox-input')[0]).not.toBeChecked();
  expect(screen.getAllByTestId('checkbox-input')[1]).toBeChecked();
  expect(screen.getAllByTestId('checkbox-input')[2]).not.toBeChecked();

  await user.click(screen.getAllByTestId('checkbox-input')[0]);
  expect(screen.getAllByTestId('checkbox-input')[0]).toBeChecked();
});

it('should only allow one selection if `allowMultiSelection` is false', async () => {
  const props = {
    allowMultiSelection: false,
    initialSelection: getInitialSelection(),
    labelFormatter,
    items: users,
  };
  render(<ListPicker {...props} show modalApply={jest.fn()} modalClose={jest.fn()} />);

  expect(screen.getByText('John Smith').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-1');
  expect(screen.getByText('Jane Doe').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-2');
  expect(screen.getByText('Jack White').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-3');

  expect(screen.queryByTestId('checkbox-input')).not.toBeInTheDocument();
  expect(screen.getAllByTestId('radio-input')).toHaveLength(3);

  expect(screen.getAllByTestId('radio-input')[0]).not.toBeChecked();
  expect(screen.getAllByTestId('radio-input')[1]).toBeChecked();
  expect(screen.getAllByTestId('radio-input')[2]).not.toBeChecked();

  await user.click(screen.getAllByTestId('radio-input')[0]);
  expect(screen.getAllByTestId('radio-input')[0]).toBeChecked();
  expect(screen.getAllByTestId('radio-input')[1]).not.toBeChecked();
});

it('should change `selectedItems` state after a `deselectItem` action', async () => {
  const props = { initialSelection: getInitialSelection(), labelFormatter, items: users };
  render(<ListPicker {...props} show modalApply={jest.fn()} modalClose={jest.fn()} />);

  expect(screen.getByText('John Smith').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-1');
  expect(screen.getByText('Jane Doe').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-2');
  expect(screen.getByText('Jack White').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-3');

  expect(screen.getAllByTestId('checkbox-input')).toHaveLength(3);
  expect(screen.getAllByTestId('checkbox-input')[0]).not.toBeChecked();
  expect(screen.getAllByTestId('checkbox-input')[1]).toBeChecked();
  expect(screen.getAllByTestId('checkbox-input')[2]).not.toBeChecked();

  await user.click(screen.getAllByTestId('checkbox-input')[1]);
  expect(screen.getAllByTestId('checkbox-input')[1]).not.toBeChecked();
});

it('should show modal when `show` is true', () => {
  render(<ListPicker show modalApply={jest.fn()} modalClose={jest.fn()} />);
  expect(screen.getByTestId('action-panel-wrapper')).toBeInTheDocument();
});

it('should hide modal when `show` is false', () => {
  render(<ListPicker show={false} modalApply={jest.fn()} modalClose={jest.fn()} />);
  expect(screen.queryByTestId('action-panel-wrapper')).not.toBeInTheDocument();
});

it('should only call `modalApply` when we click Apply', async () => {
  const applyMock = jest.fn();
  const closeMock = jest.fn();

  const props = {
    initialSelection: getInitialSelection(),
    modalApply: applyMock,
    modalClose: closeMock,
  };
  render(<ListPicker {...props} show />);

  await user.click(screen.getByText('Apply').parentElement);
  expect(applyMock).toHaveBeenCalledWith([teamMember2]);
  expect(closeMock).toHaveBeenCalledTimes(0);
});

it('should call `modalClose` when we click Cancel', async () => {
  const closeMock = jest.fn();

  render(<ListPicker modalClose={closeMock} show modalApply={jest.fn()} />);
  await user.click(screen.getByText('Cancel').parentElement);
  expect(closeMock).toHaveBeenCalledTimes(1);
});

describe('linkButtons', () => {
  const initialSelection = getInitialSelection();
  let props = null;

  beforeEach(() => {
    props = {
      emptyMessage: 'No users.',
      emptySvgSymbol: <SvgSymbol href="/some.svg#id" />,
      initialSelection,
      items: users,
      itemHeaders: userHeaders,
      itemType: 'user',
      labelFormatter,
      linkButtons: [{ label: 'Create User', href: '#' }],
      modalDescription: 'Select users.',
      modalFootnote: 'You can select multiple users.',
      modalTitle: 'Select Users',
      modalApply: jest.fn(),
      modalClose: jest.fn(),
    };
  });

  it('should render as node', () => {
    props.linkButtons = [<Radio />];
    render(<ListPicker {...props} show />);
    expect(screen.getByTestId('radio-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('radio-input').tagName).toEqual('INPUT');
    expect(screen.getByTestId('radio-input')).toHaveAttribute('type', 'radio');
  });

  it('should render as mixed nodes and buttons', () => {
    props.linkButtons = [{ label: 'Create User', href: '#' }, <Radio />];
    render(<ListPicker {...props} show />);

    expect(screen.getByTestId('radio-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('radio-input').tagName).toEqual('INPUT');
    expect(screen.getByTestId('radio-input')).toHaveAttribute('type', 'radio');

    expect(screen.getByText('Create User').parentElement).toHaveClass('aui-inverse');
    expect(screen.getByText('Create User').parentElement).toHaveAttribute('href', '#');
  });
});
