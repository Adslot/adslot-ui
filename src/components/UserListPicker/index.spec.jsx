import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import UserListPicker from '../UserListPicker';
import ListPickerMocks from '../ListPicker/mocks';

afterEach(cleanup);

describe('<UserListPicker />', () => {
  const { getInitialSelection, userHeaders, users } = ListPickerMocks;

  it('should render with defaults', () => {
    const { getByTestId, queryByTestId, getByText } = render(<UserListPicker show />);

    expect(queryByTestId('listpicker-wrapper')).toBeInTheDocument();
    expect(getByTestId('listpicker-wrapper')).toHaveClass('userlistpicker-component');

    expect(getByText('Select Users')).toHaveClass('modal-title');
    expect(getByText('Select users.').tagName).toEqual('P');
    expect(getByText('Select users.').parentElement).toHaveClass('modal-body');

    expect(queryByTestId('grid-row-wrapper')).toBeInTheDocument();
    expect(getByTestId('grid-row-wrapper')).toHaveClass('grid-component-row-header');
    expect(getByTestId('grid-row-wrapper')).toHaveTextContent('TeamMember');

    expect(queryByTestId('checkbox-input')).not.toBeInTheDocument();
    expect(queryByTestId('radio-input')).not.toBeInTheDocument();

    expect(getByTestId('empty-text')).toHaveTextContent('No users.');
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
    const { getByTestId, queryByTestId, queryAllByTestId, getByText } = render(<UserListPicker {...props} show />);

    expect(queryByTestId('listpicker-wrapper')).toBeInTheDocument();
    expect(getByTestId('listpicker-wrapper')).toHaveClass('userlistpicker-component');

    expect(getByText('Select Team Members')).toHaveClass('modal-title');
    expect(getByText('Select team members that you want.').tagName).toEqual('P');
    expect(getByText('Select team members that you want.').parentElement).toHaveClass('modal-body');

    expect(queryAllByTestId('grid-row-wrapper')).toHaveLength(4);
    expect(queryAllByTestId('grid-row-wrapper')[0]).toHaveClass('grid-component-row-header');
    expect(queryAllByTestId('grid-row-wrapper')[0]).toHaveTextContent('TeamMember');

    expect(queryAllByTestId('grid-row-wrapper')[1]).toHaveClass('grid-component-row grid-component-row-body');
    expect(queryAllByTestId('grid-row-wrapper')[1]).toHaveAttribute('data-test-selector', 'user-1');
    expect(queryAllByTestId('grid-row-wrapper')[1]).toContainElement(queryAllByTestId('avatar-wrapper')[0]);
    expect(queryAllByTestId('avatar-wrapper')[0]).toHaveAttribute('title', 'John Smith');
    expect(queryAllByTestId('avatar-wrapper')[0]).toContainElement(queryAllByTestId('avatar-initials')[0]);
    expect(queryAllByTestId('avatar-initials')[0]).toHaveTextContent('JS');
    expect(queryAllByTestId('grid-row-wrapper')[1]).toContainElement(getByText('John Smith'));
    expect(getByText('John Smith').parentElement).toHaveClass('userlistpicker-component-user-label');

    expect(queryAllByTestId('grid-row-wrapper')[2]).toHaveClass('grid-component-row grid-component-row-body');
    expect(queryAllByTestId('grid-row-wrapper')[2]).toHaveAttribute('data-test-selector', 'user-2');
    expect(queryAllByTestId('grid-row-wrapper')[2]).toContainElement(queryAllByTestId('avatar-wrapper')[1]);
    expect(queryAllByTestId('avatar-wrapper')[1]).toHaveAttribute('title', 'Jane Doe');
    expect(queryAllByTestId('avatar-wrapper')[1]).toContainElement(queryAllByTestId('avatar-initials')[1]);
    expect(queryAllByTestId('avatar-initials')[1]).toHaveTextContent('JD');
    expect(queryAllByTestId('grid-row-wrapper')[2]).toContainElement(getByText('Jane Doe'));
    expect(getByText('John Smith').parentElement).toHaveClass('userlistpicker-component-user-label');

    expect(queryAllByTestId('grid-row-wrapper')[3]).toHaveClass('grid-component-row grid-component-row-body');
    expect(queryAllByTestId('grid-row-wrapper')[3]).toHaveAttribute('data-test-selector', 'user-3');
    expect(queryAllByTestId('grid-row-wrapper')[3]).toContainElement(queryAllByTestId('avatar-wrapper')[2]);
    expect(queryAllByTestId('avatar-wrapper')[2]).toHaveAttribute('title', 'Jack White');
    expect(queryAllByTestId('avatar-wrapper')[2]).toContainElement(queryAllByTestId('avatar-initials')[2]);
    expect(queryAllByTestId('avatar-initials')[2]).toHaveTextContent('JW');
    expect(queryAllByTestId('grid-row-wrapper')[3]).toContainElement(getByText('Jack White'));
    expect(getByText('John Smith').parentElement).toHaveClass('userlistpicker-component-user-label');

    expect(queryAllByTestId('checkbox-input')).toHaveLength(3);
    expect(queryByTestId('radio-input')).not.toBeInTheDocument();

    expect(queryAllByTestId('checkbox-input')).toHaveLength(3);
    expect(queryAllByTestId('checkbox-input')[0]).not.toBeChecked();
    expect(queryAllByTestId('checkbox-input')[1]).toBeChecked(); // selectedItems
    expect(queryAllByTestId('checkbox-input')[2]).not.toBeChecked();

    expect(queryByTestId('empty-text')).not.toBeInTheDocument();
  });

  it('should throw when we do not supply apply handler', () => {
    console.error = (err) => {
      throw new Error(err);
    };
    const { queryAllByTestId, getByText } = render(<UserListPicker users={users} show />);

    expect(getByText('Apply').closest('button')).toBeDisabled();

    fireEvent.click(queryAllByTestId('checkbox-input')[1]);

    expect(getByText('Apply').closest('button')).toBeEnabled();
    expect(() => fireEvent.click(getByText('Apply'))).toThrow('AdslotUi UserListPicker needs a modalApply handler');
  });

  it('should throw when we do not supply close handler', () => {
    console.error = (err) => {
      throw new Error(err);
    };
    const { getByText } = render(<UserListPicker show />);
    expect(() => fireEvent.click(getByText('Cancel'))).toThrow('AdslotUi UserListPicker needs a modalClose handler');
  });
});
