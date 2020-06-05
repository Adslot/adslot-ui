import _ from 'lodash';
import React from 'react';
import { render, cleanup, fireEvent, queryByAttribute, queryAllByAttribute } from '@testing-library/react';
import Empty from '../Empty';
import ListPickerPure from '.';
import ListPickerMocks from '../ListPicker/mocks';

const getByDts = queryByAttribute.bind(null, 'data-test-selector');
const queryAllByDts = queryAllByAttribute.bind(null, 'data-test-selector');

afterEach(cleanup);

describe('<ListPickerPure />', () => {
  const {
    getInitialSelection,
    labelFormatter,
    teamMember4,
    userHeaders,
    nodeUserHeaders,
    users,
    usersWithUuid,
  } = ListPickerMocks;

  const selectedItems = getInitialSelection();

  Object.freeze(selectedItems);

  it('should render with defaults', () => {
    const { getByTestId, queryAllByTestId } = render(<ListPickerPure />);

    expect(getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');
    expect(getByTestId('listpickerpure-wrapper')).toHaveAttribute(
      'data-test-selector',
      'listpickerpure-component-item'
    );
    expect(queryAllByTestId('grid-wrapper')).toHaveLength(1);

    expect(queryAllByTestId('empty-wrapper')).toHaveLength(1);
    expect(getByTestId('empty-wrapper')).not.toBeEmpty();
    expect(getByTestId('empty-wrapper')).toHaveTextContent('No items to select.');
  });

  it('should render with props', () => {
    const props = {
      items: users,
      itemHeaders: userHeaders,
      itemType: 'user',
      labelFormatter,
      selectedItems,
    };
    const { container, getByTestId, queryAllByTestId, getByText } = render(<ListPickerPure {...props} />);

    expect(getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');
    expect(getByTestId('listpickerpure-wrapper')).toHaveAttribute(
      'data-test-selector',
      'listpickerpure-component-user'
    );

    expect(queryAllByTestId('grid-row-wrapper')[0]).toHaveClass('grid-component-row-header');
    expect(queryAllByTestId('grid-row-wrapper')[0]).toContainElement(getByText('Team'));
    expect(queryAllByTestId('grid-row-wrapper')[0]).toContainElement(getByText('Member'));
    expect(getByText('Team')).toHaveClass('grid-component-cell');
    expect(getByText('Member')).toHaveClass('grid-component-cell');

    queryAllByTestId('grid-row-wrapper').forEach(each => expect(each).toHaveClass('grid-component-row'));
    expect(queryAllByTestId('grid-row-wrapper')[1]).toContainElement(getByText('John Smith'));
    expect(queryAllByTestId('grid-row-wrapper')[2]).toContainElement(getByText('Jane Doe'));
    expect(queryAllByTestId('grid-row-wrapper')[3]).toContainElement(getByText('Jack White'));

    expect(getByText('John Smith')).toHaveAttribute('data-test-selector', 'label');
    expect(getByText('John Smith')).toHaveClass('grid-component-cell-stretch');
    expect(getByText('Jane Doe')).toHaveAttribute('data-test-selector', 'label');
    expect(getByText('Jane Doe')).toHaveClass('grid-component-cell-stretch');
    expect(getByText('Jack White')).toHaveAttribute('data-test-selector', 'label');
    expect(getByText('Jack White')).toHaveClass('grid-component-cell-stretch');

    expect(getByDts(container, 'user-1')).toHaveTextContent('John Smith');
    expect(getByDts(container, 'user-2')).toHaveTextContent('Jane Doe');
    expect(getByDts(container, 'user-3')).toHaveTextContent('Jack White');

    expect(queryAllByDts(container, 'toggle')).toHaveLength(3);
    queryAllByDts(container, 'toggle').forEach((each, index) => {
      expect(each).toContainElement(queryAllByTestId('checkbox-wrapper')[index]);
      if (_.some(selectedItems, { id: users[index].id }))
        expect(queryAllByTestId('checkbox-input')[index]).toBeChecked();
    });
  });

  it('should render with props including items and selectItems with uuids', () => {
    const selectedItemsWithUuid = [teamMember4];
    const props = {
      items: usersWithUuid,
      itemHeaders: userHeaders,
      labelFormatter,
      selectedItems: selectedItemsWithUuid,
    };

    const { container, getByTestId, queryAllByTestId, getByText } = render(<ListPickerPure {...props} />);

    expect(getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');

    expect(queryAllByTestId('grid-row-wrapper')[0]).toHaveClass('grid-component-row-header');
    expect(queryAllByTestId('grid-row-wrapper')[0]).toContainElement(getByText('Team'));
    expect(queryAllByTestId('grid-row-wrapper')[0]).toContainElement(getByText('Member'));

    queryAllByTestId('grid-row-wrapper').forEach(each => expect(each).toHaveClass('grid-component-row'));
    expect(queryAllByTestId('grid-row-wrapper')[1]).toContainElement(getByText('Jones Cheng'));
    expect(queryAllByTestId('grid-row-wrapper')[2]).toContainElement(getByText('Joe Huang'));

    expect(getByText('Jones Cheng')).toHaveAttribute('data-test-selector', 'label');
    expect(getByText('Jones Cheng')).toHaveClass('grid-component-cell-stretch');
    expect(getByText('Joe Huang')).toHaveAttribute('data-test-selector', 'label');
    expect(getByText('Joe Huang')).toHaveClass('grid-component-cell-stretch');

    expect(queryAllByDts(container, 'toggle')).toHaveLength(2);
    queryAllByDts(container, 'toggle').forEach((each, index) => {
      expect(each).toContainElement(queryAllByTestId('checkbox-wrapper')[index]);
      if (_.some(selectedItemsWithUuid, { id: usersWithUuid[index].id }))
        expect(queryAllByTestId('checkbox-input')[index]).toBeChecked();
    });
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
    const { container, getByTestId, queryAllByTestId, getByText } = render(<ListPickerPure {...props} />);
    expect(getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');

    expect(queryAllByTestId('grid-row-wrapper')[0]).toHaveClass('grid-component-row-header');
    expect(queryAllByTestId('grid-row-wrapper')[0]).toContainElement(getByText('Team'));
    expect(queryAllByTestId('grid-row-wrapper')[0]).toContainElement(getByText('Member'));
    expect(queryAllByTestId('grid-row-wrapper')[0]).toContainElement(getByText('Required'));
    expect(getByText('Required')).toHaveClass('grid-component-cell grid-component-cell-header-addon');

    expect(queryAllByDts(container, 'addon')).toHaveLength(3);
    queryAllByDts(container, 'addon').forEach(each => {
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
    const { getByTestId, queryAllByTestId, getByText } = render(<ListPickerPure {...props} />);

    expect(getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');
    expect(getByTestId('listpickerpure-wrapper')).toHaveAttribute(
      'data-test-selector',
      'listpickerpure-component-group-user'
    );

    expect(queryAllByTestId('grid-row-wrapper')[0]).toHaveClass('grid-component-row-header');
    expect(queryAllByTestId('grid-row-wrapper')[0]).toContainElement(getByText('Group'));
    expect(queryAllByTestId('grid-row-wrapper')[0]).toContainElement(getByText('Team'));
    expect(queryAllByTestId('grid-row-wrapper')[0]).toContainElement(getByText('Member'));
  });

  it('should render radio buttons with `allowMultiSelection` as false', () => {
    const props = { allowMultiSelection: false, items: users, selectedItems };
    const { container, getByTestId, queryAllByTestId } = render(<ListPickerPure {...props} />);

    expect(getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');

    expect(getByDts(container, 'item-1')).toContainElement(queryAllByDts(container, 'toggle')[0]);
    expect(getByDts(container, 'item-2')).toContainElement(queryAllByDts(container, 'toggle')[1]);
    expect(getByDts(container, 'item-3')).toContainElement(queryAllByDts(container, 'toggle')[2]);

    queryAllByDts(container, 'toggle').forEach((each, index) => {
      expect(each).toContainElement(queryAllByTestId('radio-wrapper')[index]);
      if (_.some(selectedItems, { id: users[index].id })) expect(queryAllByTestId('radio-input')[index]).toBeChecked();
    });
  });

  it('should throw when we select without a `selectItem` handler', () => {
    console.error = err => {
      throw new Error(err);
    };
    const props = { items: users, selectedItems };
    const { getByTestId, queryAllByTestId } = render(<ListPickerPure {...props} />);

    expect(getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');

    expect(queryAllByTestId('checkbox-input')[0]).not.toBeChecked();

    expect(() => fireEvent.click(queryAllByTestId('checkbox-input')[0])).toThrow(
      'AdslotUi ListPickerPure needs a selectItem handler'
    );
  });

  it('should throw when we deselect without a `deselectItem` handler', () => {
    console.error = err => {
      throw new Error(err);
    };
    const props = { items: users, selectedItems };
    const { getByTestId, queryAllByTestId } = render(<ListPickerPure {...props} />);

    expect(getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');

    expect(queryAllByTestId('checkbox-input')[1]).toBeChecked();

    expect(() => fireEvent.click(queryAllByTestId('checkbox-input')[1])).toThrow(
      'AdslotUi ListPickerPure needs a deselectItem handler'
    );
  });

  it('should call `selectItem` handler when we select', () => {
    let handlerCalled = 0;
    let isAllowMultiSelection;
    const props = {
      allowMultiSelection: false,
      items: users,
      selectedItems,
      selectItem: (item, allowMultiSelection) => {
        handlerCalled++;
        isAllowMultiSelection = allowMultiSelection;
      },
    };
    const { getByTestId, queryAllByTestId } = render(<ListPickerPure {...props} />);

    expect(getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');
    expect(queryAllByTestId('radio-input')[0]).not.toBeChecked();

    fireEvent.click(queryAllByTestId('radio-input')[0]);
    expect(handlerCalled).toEqual(1);
    expect(isAllowMultiSelection).toEqual(false);
  });

  it('should call `deselectItem` handler when we deselect', () => {
    let handlerCalled = 0;
    let isAllowMultiSelection;
    const props = {
      items: users,
      selectedItems,
      deselectItem: (item, allowMultiSelection) => {
        handlerCalled++;
        isAllowMultiSelection = allowMultiSelection;
      },
    };
    const { getByTestId, queryAllByTestId } = render(<ListPickerPure {...props} />);

    expect(getByTestId('listpickerpure-wrapper')).toHaveClass('listpickerpure-component');
    expect(queryAllByTestId('checkbox-input')[1]).toBeChecked();

    fireEvent.click(queryAllByTestId('checkbox-input')[1]);
    expect(handlerCalled).toEqual(1);
    expect(isAllowMultiSelection).toEqual(true);
  });
});
