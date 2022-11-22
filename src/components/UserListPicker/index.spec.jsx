import React from 'react';
import { render, screen } from 'testing';
import UserListPicker from '../UserListPicker';
import ListPickerMocks from '../ListPicker/mocks';

const { getInitialSelection, userHeaders, users } = ListPickerMocks;

it('should render with defaults', () => {
  render(<UserListPicker show modalApply={jest.fn()} modalClose={jest.fn()} />);

  expect(screen.getByTestId('action-panel-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('action-panel-wrapper')).toHaveClass('userlistpicker-component');

  expect(screen.getByText('Select Users')).toHaveClass('title');
  expect(screen.getByText('Select users.').tagName).toEqual('P');
  expect(screen.getByText('Select users.').parentElement).toHaveClass('aui--action-panel-body');

  expect(screen.getByTestId('grid-row-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('grid-row-wrapper')).toHaveClass('grid-component-row-header');
  expect(screen.getByTestId('grid-row-wrapper')).toHaveTextContent('TeamMember');

  expect(screen.queryByTestId('checkbox-input')).not.toBeInTheDocument();
  expect(screen.queryByTestId('radio-input')).not.toBeInTheDocument();

  expect(screen.getByTestId('empty-text')).toHaveTextContent('No users.');
});

it('should render with props', () => {
  const svgSymbol = <div />;
  const props = {
    allowEmptySelection: true,
    emptySvgSymbol: svgSymbol,
    initialSelection: getInitialSelection(),
    userHeaders,
    users,
    modalDescription: 'Select team members that you want.',
    modalTitle: 'Select Team Members',
  };
  render(<UserListPicker {...props} show modalApply={jest.fn()} modalClose={jest.fn()} />);

  expect(screen.getByTestId('action-panel-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('action-panel-wrapper')).toHaveClass('userlistpicker-component');

  expect(screen.getByText('Select Team Members')).toHaveClass('title');
  expect(screen.getByText('Select team members that you want.').tagName).toEqual('P');
  expect(screen.getByText('Select team members that you want.').parentElement).toHaveClass('aui--action-panel-body');

  expect(screen.getAllByTestId('grid-row-wrapper')).toHaveLength(4);
  expect(screen.getAllByTestId('grid-row-wrapper')[0]).toHaveClass('grid-component-row-header');
  expect(screen.getAllByTestId('grid-row-wrapper')[0]).toHaveTextContent('TeamMember');

  expect(screen.getAllByTestId('grid-row-wrapper')[1]).toHaveClass('grid-component-row grid-component-row-body');
  expect(screen.getAllByTestId('grid-row-wrapper')[1]).toHaveAttribute('data-test-selector', 'user-1');
  expect(screen.getAllByTestId('grid-row-wrapper')[1]).toContainElement(screen.getAllByTestId('avatar-wrapper')[0]);
  expect(screen.getAllByTestId('avatar-wrapper')[0]).toHaveAttribute('title', 'John Smith');
  expect(screen.getAllByTestId('avatar-wrapper')[0]).toContainElement(screen.getAllByTestId('avatar-initials')[0]);
  expect(screen.getAllByTestId('avatar-initials')[0]).toHaveTextContent('JS');
  expect(screen.getAllByTestId('grid-row-wrapper')[1]).toContainElement(screen.getByText('John Smith'));
  expect(screen.getByText('John Smith').parentElement).toHaveClass('userlistpicker-component-user-label');

  expect(screen.getAllByTestId('grid-row-wrapper')[2]).toHaveClass('grid-component-row grid-component-row-body');
  expect(screen.getAllByTestId('grid-row-wrapper')[2]).toHaveAttribute('data-test-selector', 'user-2');
  expect(screen.getAllByTestId('grid-row-wrapper')[2]).toContainElement(screen.getAllByTestId('avatar-wrapper')[1]);
  expect(screen.getAllByTestId('avatar-wrapper')[1]).toHaveAttribute('title', 'Jane Doe');
  expect(screen.getAllByTestId('avatar-wrapper')[1]).toContainElement(screen.getAllByTestId('avatar-initials')[1]);
  expect(screen.getAllByTestId('avatar-initials')[1]).toHaveTextContent('JD');
  expect(screen.getAllByTestId('grid-row-wrapper')[2]).toContainElement(screen.getByText('Jane Doe'));
  expect(screen.getByText('John Smith').parentElement).toHaveClass('userlistpicker-component-user-label');

  expect(screen.getAllByTestId('grid-row-wrapper')[3]).toHaveClass('grid-component-row grid-component-row-body');
  expect(screen.getAllByTestId('grid-row-wrapper')[3]).toHaveAttribute('data-test-selector', 'user-3');
  expect(screen.getAllByTestId('grid-row-wrapper')[3]).toContainElement(screen.getAllByTestId('avatar-wrapper')[2]);
  expect(screen.getAllByTestId('avatar-wrapper')[2]).toHaveAttribute('title', 'Jack White');
  expect(screen.getAllByTestId('avatar-wrapper')[2]).toContainElement(screen.getAllByTestId('avatar-initials')[2]);
  expect(screen.getAllByTestId('avatar-initials')[2]).toHaveTextContent('JW');
  expect(screen.getAllByTestId('grid-row-wrapper')[3]).toContainElement(screen.getByText('Jack White'));
  expect(screen.getByText('John Smith').parentElement).toHaveClass('userlistpicker-component-user-label');

  expect(screen.getAllByTestId('checkbox-input')).toHaveLength(3);
  expect(screen.queryByTestId('radio-input')).not.toBeInTheDocument();

  expect(screen.getAllByTestId('checkbox-input')).toHaveLength(3);
  expect(screen.getAllByTestId('checkbox-input')[0]).not.toBeChecked();
  expect(screen.getAllByTestId('checkbox-input')[1]).toBeChecked(); // selectedItems
  expect(screen.getAllByTestId('checkbox-input')[2]).not.toBeChecked();
  expect(screen.queryByTestId('empty-text')).not.toBeInTheDocument();
});
