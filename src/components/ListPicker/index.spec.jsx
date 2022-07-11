import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Radio from '../Radio';
import SvgSymbol from '../SvgSymbol';
import ListPicker from '.';
import ListPickerMocks from '../ListPicker/mocks';

afterEach(cleanup);

describe('<ListPicker />', () => {
  const { getInitialSelection, userHeaders, users, labelFormatter, teamMember2 } = ListPickerMocks;

  let divContainer = null;

  beforeEach(() => {
    divContainer = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(divContainer);
  });

  it('should render with defaults', () => {
    const { getByTestId, getByText } = render(<ListPicker itemInfo={{ label: 'Label', properties: [] }} show />);
    expect(getByTestId('action-panel-wrapper')).toHaveClass('listpicker-component');
    expect(getByText('Select Items')).toHaveClass('title');

    const listpickerPure = getByTestId('listpickerpure-wrapper');
    expect(listpickerPure).toContainElement(getByTestId('empty-wrapper'));
    expect(getByTestId('empty-wrapper').children).toHaveLength(1); //undefined emptyIcon
    expect(getByTestId('empty-wrapper')).toContainElement(getByTestId('empty-text'));
    expect(getByTestId('empty-text')).toHaveTextContent('No items to select.');

    expect(getByTestId('action-panel-header')).toHaveClass('has-actions');
    expect(getByTestId('action-panel-header')).toContainElement(getByText('Cancel'));
    expect(getByTestId('action-panel-header')).toContainElement(getByText('Apply'));
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
    };
    const { getByTestId, queryByTestId, queryAllByTestId, getByText, rerender } = render(
      <ListPicker {...props} items={items} show />
    );

    expect(getByTestId('action-panel-wrapper')).toHaveClass('listpicker-component');
    expect(getByText('Select Users')).toHaveClass('title');

    expect(getByText('You can select multiple users.')).toHaveClass('listpicker-component-footnote');

    // items
    expect(getByText('John Smith').parentElement.parentElement).toHaveAttribute('data-test-selector', 'user-1');
    expect(getByText('Jane Doe').parentElement.parentElement).toHaveAttribute('data-test-selector', 'user-2');
    expect(getByText('Jack White').parentElement.parentElement).toHaveAttribute('data-test-selector', 'user-3');

    expect(queryAllByTestId('checkbox-input')).toHaveLength(3);
    expect(queryAllByTestId('checkbox-input')[0]).not.toBeChecked();
    expect(queryAllByTestId('checkbox-input')[1]).toBeChecked(); // selectedItems
    expect(queryAllByTestId('checkbox-input')[2]).not.toBeChecked();

    expect(getByTestId('action-panel-header')).toHaveClass('has-actions');
    expect(getByTestId('action-panel-header')).toContainElement(getByText('Cancel'));
    expect(getByTestId('action-panel-header')).toContainElement(getByText('Create User'));

    expect(getByText('Create User').parentElement).toHaveAttribute('href', '#');
    expect(getByText('Create User').parentElement).toHaveClass('aui--anchor aui-default aui-inverse');

    expect(getByTestId('listpickerpure-wrapper')).toHaveAttribute(
      'data-test-selector',
      'listpickerpure-component-user'
    ); // itemType: 'user'

    expect(getByText('Team')).toHaveClass('grid-component-cell-stretch'); // itemHeaders: userHeaders
    expect(getByText('Member')).toHaveClass('grid-component-cell-header-toggle');

    expect(queryByTestId('svg-symbol-wrapper')).not.toBeInTheDocument();

    rerender(<ListPicker {...props} show />);
    expect(queryByTestId('svg-symbol-wrapper')).toBeInTheDocument();
    expect(getByTestId('svg-symbol-use')).toHaveAttribute('href', '/some.svg#id'); // emptySvgSymbol
    expect(getByTestId('empty-text')).toHaveTextContent('No users.'); //emptyMessage
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
    };
    const { getByTestId, queryAllByTestId, getByText } = render(<ListPicker {...props} show />);
    expect(getByTestId('action-panel-wrapper')).toHaveClass('listpicker-component');

    expect(getByText('Select Users')).toHaveClass('title');

    expect(getByText('Select users.').tagName).toEqual('P');
    expect(getByText('Select users.').parentElement).toHaveClass('aui--action-panel-body');

    expect(getByText('You can select multiple users.')).toHaveClass('listpicker-component-footnote');

    expect(queryAllByTestId('split-panel-wrapper')).toHaveLength(2);
    expect(queryAllByTestId('split-panel-wrapper')[0]).toHaveAttribute('data-test-selector', 'user-details');
    expect(queryAllByTestId('split-panel-wrapper')[0]).toContainElement(getByText('User Details'));

    expect(getByText('Name')).toHaveClass('grid-component-cell');
    expect(getByText('Jill Smith')).toHaveClass('grid-component-cell');
    expect(getByText('Jill Smith')).toHaveAttribute('data-test-selector', 'name');

    expect(getByText('Age')).toHaveClass('grid-component-cell');
    expect(getByText('21')).toHaveClass('grid-component-cell');
    expect(getByText('21')).toHaveAttribute('data-test-selector', 'age');

    expect(queryAllByTestId('split-panel-wrapper')[1]).toContainElement(getByTestId('listpickerpure-wrapper'));

    // items
    expect(getByText('John Smith').parentElement.parentElement).toHaveAttribute('data-test-selector', 'user-1');
    expect(getByText('Jane Doe').parentElement.parentElement).toHaveAttribute('data-test-selector', 'user-2');
    expect(getByText('Jack White').parentElement.parentElement).toHaveAttribute('data-test-selector', 'user-3');

    expect(queryAllByTestId('checkbox-input')).toHaveLength(3);
    expect(queryAllByTestId('checkbox-input')[0]).not.toBeChecked();
    expect(queryAllByTestId('checkbox-input')[1]).toBeChecked(); // selectedItems
    expect(queryAllByTestId('checkbox-input')[2]).not.toBeChecked();

    expect(getByTestId('listpickerpure-wrapper')).toHaveAttribute(
      'data-test-selector',
      'listpickerpure-component-user'
    ); // itemType: 'user'

    expect(getByText('Team')).toHaveClass('grid-component-cell-stretch'); // itemHeaders: userHeaders
    expect(getByText('Member')).toHaveClass('grid-component-cell-header-toggle');
  });

  it('should disable apply button for empty selection if `allowEmptySelection` is false', () => {
    const props = { allowEmptySelection: false, items: users };
    const { getByText, getByTestId } = render(<ListPicker {...props} show />);
    expect(getByTestId('action-panel-header')).toContainElement(getByText('Apply'));
    expect(getByText('Apply').parentElement).toBeDisabled();
  });

  it('should change `selectedItems` state after a `selectItem` action', () => {
    const props = { initialSelection: getInitialSelection(), labelFormatter, items: users };
    const { queryAllByTestId, getByText } = render(<ListPicker {...props} show />);

    expect(getByText('John Smith').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-1');
    expect(getByText('Jane Doe').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-2');
    expect(getByText('Jack White').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-3');

    expect(queryAllByTestId('checkbox-input')).toHaveLength(3);
    expect(queryAllByTestId('checkbox-input')[0]).not.toBeChecked();
    expect(queryAllByTestId('checkbox-input')[1]).toBeChecked();
    expect(queryAllByTestId('checkbox-input')[2]).not.toBeChecked();

    fireEvent.click(queryAllByTestId('checkbox-input')[0]);
    expect(queryAllByTestId('checkbox-input')[0]).toBeChecked();
  });

  it('should only allow one selection if `allowMultiSelection` is false', () => {
    const props = {
      allowMultiSelection: false,
      initialSelection: getInitialSelection(),
      labelFormatter,
      items: users,
    };
    const { queryByTestId, queryAllByTestId, getByText } = render(<ListPicker {...props} show />);

    expect(getByText('John Smith').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-1');
    expect(getByText('Jane Doe').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-2');
    expect(getByText('Jack White').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-3');

    expect(queryByTestId('checkbox-input')).not.toBeInTheDocument();
    expect(queryAllByTestId('radio-input')).toHaveLength(3);

    expect(queryAllByTestId('radio-input')[0]).not.toBeChecked();
    expect(queryAllByTestId('radio-input')[1]).toBeChecked();
    expect(queryAllByTestId('radio-input')[2]).not.toBeChecked();

    fireEvent.click(queryAllByTestId('radio-input')[0]);
    expect(queryAllByTestId('radio-input')[0]).toBeChecked();
    expect(queryAllByTestId('radio-input')[1]).not.toBeChecked();
  });

  it('should change `selectedItems` state after a `deselectItem` action', () => {
    const props = { initialSelection: getInitialSelection(), labelFormatter, items: users };
    const { queryAllByTestId, getByText } = render(<ListPicker {...props} show />);

    expect(getByText('John Smith').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-1');
    expect(getByText('Jane Doe').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-2');
    expect(getByText('Jack White').parentElement.parentElement).toHaveAttribute('data-test-selector', 'item-3');

    expect(queryAllByTestId('checkbox-input')).toHaveLength(3);
    expect(queryAllByTestId('checkbox-input')[0]).not.toBeChecked();
    expect(queryAllByTestId('checkbox-input')[1]).toBeChecked();
    expect(queryAllByTestId('checkbox-input')[2]).not.toBeChecked();

    fireEvent.click(queryAllByTestId('checkbox-input')[1]);
    expect(queryAllByTestId('checkbox-input')[1]).not.toBeChecked();
  });

  it('should show modal when `show` is true', () => {
    const { queryByTestId } = render(<ListPicker show />);
    expect(queryByTestId('action-panel-wrapper')).toBeInTheDocument();
  });

  it('should hide modal when `show` is false', () => {
    const { queryByTestId } = render(<ListPicker show={false} />);
    expect(queryByTestId('action-panel-wrapper')).not.toBeInTheDocument();
  });

  it('should only call `modalApply` when we click Apply', () => {
    const applyMock = jest.fn();
    const closeMock = jest.fn();

    const props = {
      initialSelection: getInitialSelection(),
      modalApply: applyMock,
      modalClose: closeMock,
    };
    const { getByText } = render(<ListPicker {...props} show />);

    fireEvent.click(getByText('Apply').parentElement);
    expect(applyMock).toHaveBeenCalledWith([teamMember2]);
    expect(closeMock).toHaveBeenCalledTimes(0);
  });

  it('should throw when we click Apply without a handler', () => {
    console.error = (err) => {
      throw new Error(err);
    };
    const { getByText } = render(<ListPicker show />);

    expect(() => fireEvent.click(getByText('Apply'))).toThrow('AdslotUi ListPicker needs a modalApply handler');
  });

  it('should call `modalClose` when we click Cancel', () => {
    const closeMock = jest.fn();

    const { getByText } = render(<ListPicker modalClose={closeMock} show />);
    fireEvent.click(getByText('Cancel').parentElement);
    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  it('should throw when we click Close without a handler', () => {
    console.error = (err) => {
      throw new Error(err);
    };
    const { getByText } = render(<ListPicker show />);
    expect(() => fireEvent.click(getByText('Cancel').parentElement)).toThrow(
      'AdslotUi ListPicker needs a modalClose handler'
    );
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
      };
    });

    it('should render as node', () => {
      props.linkButtons = [<Radio />];
      const { getByTestId, queryByTestId } = render(<ListPicker {...props} show />);
      expect(queryByTestId('radio-wrapper')).toBeInTheDocument();
      expect(getByTestId('radio-input').tagName).toEqual('INPUT');
      expect(getByTestId('radio-input')).toHaveAttribute('type', 'radio');
    });

    it('should render as mixed nodes and buttons', () => {
      props.linkButtons = [{ label: 'Create User', href: '#' }, <Radio />];
      const { getByTestId, queryByTestId, getByText } = render(<ListPicker {...props} show />);

      expect(queryByTestId('radio-wrapper')).toBeInTheDocument();
      expect(getByTestId('radio-input').tagName).toEqual('INPUT');
      expect(getByTestId('radio-input')).toHaveAttribute('type', 'radio');

      expect(getByText('Create User').parentElement).toHaveClass('aui-inverse');
      expect(getByText('Create User').parentElement).toHaveAttribute('href', '#');
    });
  });
});
