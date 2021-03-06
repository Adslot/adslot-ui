import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Radio from 'react-bootstrap/lib/Radio';
import SvgSymbol from '../SvgSymbol';
import ListPickerComponent from '.';

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
    const { getByTestId, getByText } = render(
      <ListPickerComponent itemInfo={{ label: 'Label', properties: [] }} show />
    );
    expect(getByTestId('listpicker-wrapper')).toHaveClass('listpicker-component');
    expect(getByTestId('listpicker-wrapper').firstChild).toHaveClass('modal-lg modal-dialog');

    expect(getByText('Select Items')).toHaveClass('modal-title');
    expect(getByText('Select Items').parentElement).toHaveClass('modal-header');

    const listpickerPure = getByTestId('listpickerpure-wrapper');
    expect(listpickerPure).toContainElement(getByTestId('empty-wrapper'));
    expect(getByTestId('empty-wrapper').children).toHaveLength(1); //undefined emptyIcon
    expect(getByTestId('empty-wrapper')).toContainElement(getByTestId('empty-text'));
    expect(getByTestId('empty-text')).toHaveTextContent('No items to select.');

    expect(getByText('Cancel').parentElement).toHaveClass('btn-inverse');
    expect(getByText('Cancel').parentElement.tagName).toEqual('BUTTON');
    expect(getByText('Cancel').parentElement.parentElement).toHaveClass('modal-footer');
    expect(getByText('Apply').parentElement).toHaveClass('aui--button btn-primary');
    expect(getByText('Apply').parentElement.tagName).toEqual('BUTTON');
    expect(getByText('Apply').parentElement.parentElement).toHaveClass('modal-footer');
    expect(getByText('Apply').parentElement).not.toBeDisabled;
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
    const { getByTestId, queryAllByTestId, getByText, rerender } = render(
      <ListPickerComponent {...props} items={items} show />
    );

    expect(getByTestId('listpicker-wrapper')).toHaveClass('listpicker-component');
    expect(getByTestId('listpicker-wrapper').firstChild).toHaveClass('modal-lg modal-dialog');

    expect(getByText('Select Users')).toHaveClass('modal-title');
    expect(getByText('Select Users').parentElement).toHaveClass('modal-header');

    expect(getByText('Select users.').tagName).toEqual('P');
    expect(getByText('Select users.').parentElement).toHaveClass('modal-body');

    expect(getByText('You can select multiple users.')).toHaveClass('listpicker-component-footnote');

    // items
    expect(getByText('John Smith').parentElement).toHaveAttribute('data-test-selector', 'user-1');
    expect(getByText('Jane Doe').parentElement).toHaveAttribute('data-test-selector', 'user-2');
    expect(getByText('Jack White').parentElement).toHaveAttribute('data-test-selector', 'user-3');

    expect(queryAllByTestId('checkbox-input')).toHaveLength(3);
    expect(queryAllByTestId('checkbox-input')[0]).not.toBeChecked();
    expect(queryAllByTestId('checkbox-input')[1]).toBeChecked(); // selectedItems
    expect(queryAllByTestId('checkbox-input')[2]).not.toBeChecked();

    expect(getByText('Create User')).toHaveAttribute('href', '#');
    expect(getByText('Create User').parentElement.parentElement).toHaveClass('btn-inverse');
    expect(getByText('Create User').parentElement.parentElement.parentElement.parentElement).toHaveClass(
      'modal-footer'
    );

    expect(getByTestId('listpickerpure-wrapper')).toHaveAttribute(
      'data-test-selector',
      'listpickerpure-component-user'
    ); // itemType: 'user'

    expect(getByText('Team')).toHaveClass('grid-component-cell-stretch'); // itemHeaders: userHeaders
    expect(getByText('Member')).toHaveClass('grid-component-cell-header-toggle');

    expect(queryAllByTestId('svg-symbol-wrapper')).toHaveLength(0);

    rerender(<ListPickerComponent {...props} show />);
    expect(queryAllByTestId('svg-symbol-wrapper')).toHaveLength(1);
    expect(getByTestId('svg-symbol-use')).toHaveAttribute('href', '/some.svg#id'); // emptySvgSymbol
    expect(getByTestId('empty-text')).toHaveTextContent('No users.'); //emptyMessage
  });

  it('should render with props for split pane', () => {
    const itemInfo = {
      label: 'User Details',
      properties: [{ label: 'Name', value: 'Jill Smith' }, { label: 'Age', value: '21' }],
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
    const { getByTestId, queryAllByTestId, getByText } = render(<ListPickerComponent {...props} show />);
    expect(getByTestId('listpicker-wrapper')).toHaveClass('listpicker-component');

    expect(getByText('Select Users')).toHaveClass('modal-title');
    expect(getByText('Select Users').parentElement).toHaveClass('modal-header');

    expect(getByText('Select users.').tagName).toEqual('P');
    expect(getByText('Select users.').parentElement).toHaveClass('modal-body');

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
    expect(getByText('John Smith').parentElement).toHaveAttribute('data-test-selector', 'user-1');
    expect(getByText('Jane Doe').parentElement).toHaveAttribute('data-test-selector', 'user-2');
    expect(getByText('Jack White').parentElement).toHaveAttribute('data-test-selector', 'user-3');

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
    const { getByText } = render(<ListPickerComponent {...props} show />);
    expect(getByText('Apply').parentElement.parentElement).toHaveClass('modal-footer');
    expect(getByText('Apply').parentElement).toBeDisabled();
  });

  it('should change `selectedItems` state after a `selectItem` action', () => {
    const props = { initialSelection: getInitialSelection(), labelFormatter, items: users };
    const { queryAllByTestId, getByText } = render(<ListPickerComponent {...props} show />);

    expect(getByText('John Smith').parentElement).toHaveAttribute('data-test-selector', 'item-1');
    expect(getByText('Jane Doe').parentElement).toHaveAttribute('data-test-selector', 'item-2');
    expect(getByText('Jack White').parentElement).toHaveAttribute('data-test-selector', 'item-3');

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
    const { queryAllByTestId, getByText } = render(<ListPickerComponent {...props} show />);

    expect(getByText('John Smith').parentElement).toHaveAttribute('data-test-selector', 'item-1');
    expect(getByText('Jane Doe').parentElement).toHaveAttribute('data-test-selector', 'item-2');
    expect(getByText('Jack White').parentElement).toHaveAttribute('data-test-selector', 'item-3');

    expect(queryAllByTestId('checkbox-input')).toHaveLength(0);
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
    const { queryAllByTestId, getByText } = render(<ListPickerComponent {...props} show />);

    expect(getByText('John Smith').parentElement).toHaveAttribute('data-test-selector', 'item-1');
    expect(getByText('Jane Doe').parentElement).toHaveAttribute('data-test-selector', 'item-2');
    expect(getByText('Jack White').parentElement).toHaveAttribute('data-test-selector', 'item-3');

    expect(queryAllByTestId('checkbox-input')).toHaveLength(3);
    expect(queryAllByTestId('checkbox-input')[0]).not.toBeChecked();
    expect(queryAllByTestId('checkbox-input')[1]).toBeChecked();
    expect(queryAllByTestId('checkbox-input')[2]).not.toBeChecked();

    fireEvent.click(queryAllByTestId('checkbox-input')[1]);
    expect(queryAllByTestId('checkbox-input')[1]).not.toBeChecked();
  });

  it('should show modal when `show` is true', () => {
    const { queryAllByTestId } = render(<ListPickerComponent show />);
    expect(queryAllByTestId('listpicker-wrapper')).toHaveLength(1);
  });

  it('should hide modal when `show` is false', () => {
    const { queryAllByTestId } = render(<ListPickerComponent show={false} />);
    expect(queryAllByTestId('listpicker-wrapper')).toHaveLength(0);
  });

  it('should only call `modalApply` when we click Apply', () => {
    const applyMock = jest.fn();
    const closeMock = jest.fn();

    const props = {
      initialSelection: getInitialSelection(),
      modalApply: applyMock,
      modalClose: closeMock,
    };
    const { getByText } = render(<ListPickerComponent {...props} show />);

    fireEvent.click(getByText('Apply').parentElement);
    expect(applyMock).toHaveBeenCalledWith([teamMember2]);
    expect(closeMock).toHaveBeenCalledTimes(0);
  });

  it('should throw when we click Apply without a handler', () => {
    console.error = err => {
      throw new Error(err);
    };
    const { getByText } = render(<ListPickerComponent show />);

    expect(() => fireEvent.click(getByText('Apply'))).toThrow('AdslotUi ListPicker needs a modalApply handler');
  });

  it('should call `modalClose` when we click Cancel', () => {
    const closeMock = jest.fn();

    const { getByText } = render(<ListPickerComponent modalClose={closeMock} show />);
    fireEvent.click(getByText('Cancel').parentElement);
    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  it('should throw when we click Close without a handler', () => {
    console.error = err => {
      throw new Error(err);
    };
    const { getByText } = render(<ListPickerComponent show />);
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
      props.linkButtons = [<Radio data-testid="testing-radio" />];
      const { getByTestId, queryAllByTestId } = render(<ListPickerComponent {...props} show />);
      expect(queryAllByTestId('testing-radio')).toHaveLength(1);
      expect(getByTestId('testing-radio').tagName).toEqual('INPUT');
      expect(getByTestId('testing-radio')).toHaveAttribute('type', 'radio');
    });

    it('should render as mixed nodes and buttons', () => {
      props.linkButtons = [{ label: 'Create User', href: '#' }, <Radio data-testid="testing-radio" />];
      const { getByTestId, queryAllByTestId, getByText } = render(<ListPickerComponent {...props} show />);

      expect(queryAllByTestId('testing-radio')).toHaveLength(1);
      expect(getByTestId('testing-radio').tagName).toEqual('INPUT');
      expect(getByTestId('testing-radio')).toHaveAttribute('type', 'radio');

      expect(getByText('Create User').parentElement.parentElement).toHaveClass('btn-inverse');
      expect(getByText('Create User')).toHaveAttribute('href', '#');
    });
  });
});
