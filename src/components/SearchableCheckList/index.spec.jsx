import React from 'react';
import _ from 'lodash';
import { render, cleanup, fireEvent, queryAllByAttribute } from '@testing-library/react';
import SearchableCheckList from '.';

const items = [
  { value: '01', label: 'Absolute Power' },
  { value: '02', label: 'Almost Famous' },
  { value: '03', label: '25th Hour' },
  { value: '04', label: '12 Angry Men' },
  { value: '05', label: '3 Idiots' },
  { value: '06', label: 'Shrek' },
  { value: '07', label: 'Spy Hard' },
  { value: '08', label: 'Pacific Rim' },
  { value: '09', label: 'Paranormal Activity' },
];

const context = { singularLabel: 'Publisher', pluralLabel: 'Publishers' };
const queryAllByClass = queryAllByAttribute.bind(null, 'class');

describe('<SearchableChecklist />', () => {
  afterEach(cleanup);

  it('should correctly render with default values', () => {
    const { getByTestId, queryByTestId, queryAllByTestId } = render(
      <SearchableCheckList context={context} items={items} onChange={_.noop} />
    );

    expect(getByTestId('searchable-list-title')).toHaveTextContent('Publishers');

    const searchInputWrapper = queryByTestId('search-input');
    expect(searchInputWrapper).toBeInTheDocument();
    expect(searchInputWrapper).toHaveValue('');
    expect(searchInputWrapper).toHaveAttribute('placeholder', 'Search');

    // 1 main checkBox and 6 item checkboxes
    const checkBoxesWrapper = queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(7);

    // All unselected checkBoxes
    _.forEach(checkBoxesWrapper, (checkBoxItem) => {
      expect(checkBoxItem).not.toBeChecked();
    });

    expect(getByTestId('footer-section')).toHaveTextContent('3 more publishers');
  });

  it('should not render title when hideTitle is false', () => {
    const { queryByTestId } = render(
      <SearchableCheckList context={context} items={items} onChange={_.noop} hideTitle={true} />
    );
    expect(queryByTestId('searchable-list-title')).not.toBeInTheDocument();
  });

  it('should render search button by default when searchOnEnter is true', () => {
    const { queryByTestId } = render(
      <SearchableCheckList context={context} items={items} onChange={_.noop} searchOnEnter={true} />
    );
    expect(queryByTestId('search-button')).toBeInTheDocument();
  });

  it('should not render search button when showSearchButton is false', () => {
    const { queryByTestId } = render(
      <SearchableCheckList
        context={context}
        items={items}
        onChange={_.noop}
        searchOnEnter={true}
        showSearchButton={false}
      />
    );
    expect(queryByTestId('search-button')).not.toBeInTheDocument();
  });

  it('should correctly render footer value with single hidden item', () => {
    const { getByTestId } = render(
      <SearchableCheckList context={context} items={items} displayCount={8} onChange={_.noop} />
    );

    expect(getByTestId('footer-section')).toHaveTextContent('1 more publisher');
  });

  it('should correctly render footer text when specified', () => {
    const { getByTestId } = render(
      <SearchableCheckList
        context={context}
        items={items}
        displayCount={8}
        onChange={_.noop}
        footerText="custom text"
      />
    );

    expect(getByTestId('footer-section')).toHaveTextContent('custom text');
  });

  it('should correctly render custom placeholder', () => {
    const { queryByTestId } = render(
      <SearchableCheckList
        context={context}
        items={items}
        displayCount={8}
        placeholder="Start Searching..."
        onChange={_.noop}
      />
    );

    const searchInputWrapper = queryByTestId('search-input');
    expect(searchInputWrapper).toBeInTheDocument();
    expect(searchInputWrapper).toHaveAttribute('placeholder', 'Start Searching...');
  });

  it('should correctly render with displayCount covering all items', () => {
    const { queryAllByTestId, queryByTestId } = render(
      <SearchableCheckList context={context} items={items} displayCount={15} onChange={_.noop} />
    );

    // 1 main checkBox and 9 item checkboxes
    const checkBoxesWrapper = queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(10);

    // No footer when all items are rendered
    expect(queryByTestId('footer-section')).not.toBeInTheDocument();
  });

  it('should correctly render with partial selection', () => {
    const { container, queryAllByTestId } = render(
      <SearchableCheckList context={context} items={items} selectedItemsKeys={['01', '06']} onChange={_.noop} />
    );

    // main checkbox should be partially checked
    expect(queryAllByClass(container, 'aui--checkbox partial-checked aui--checkbox-default is-selected')).toHaveLength(
      1
    );

    // 1 main checkBox and 6 item checkboxes
    const checkBoxesWrapper = queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(7);

    // 2 checked elements
    _.forEach([1, 2], (index) => {
      expect(checkBoxesWrapper[index]).toBeChecked();
    });

    // Remaining 4 un-checked elements
    _.forEach([3, 4, 5, 6], (index) => {
      expect(checkBoxesWrapper[index]).not.toBeChecked();
    });
  });

  it('should correctly render with full selection', () => {
    const { container, queryAllByTestId } = render(
      <SearchableCheckList
        context={context}
        items={items}
        selectedItemsKeys={_.map(items, 'value')}
        onChange={_.noop}
      />
    );

    expect(queryAllByClass(container, 'aui--checkbox partial-checked')).toHaveLength(0);

    // 1 main checkBox and 6 item checkboxes
    const checkBoxesWrapper = queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(7);

    _.forEach(checkBoxesWrapper, (checkBoxItem) => {
      expect(checkBoxItem).toBeChecked();
    });
  });

  it('should correctly filter checkboxes on search', () => {
    const { queryByTestId, queryAllByTestId } = render(
      <SearchableCheckList context={context} items={items} selectedItemsKeys={['01', '06', '09']} onChange={_.noop} />
    );

    let checkBoxesWrapper = queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(7);

    let searchInputWrapper = queryByTestId('search-input');
    expect(searchInputWrapper).toBeInTheDocument();

    fireEvent.change(searchInputWrapper, { target: { value: 'Par' } });
    checkBoxesWrapper = queryAllByTestId('checkbox-input');

    // 1 main checkbox and 1 for Paranormal Activity
    expect(checkBoxesWrapper).toHaveLength(2);
    expect(checkBoxesWrapper[1]).toBeChecked();
  });

  it('should correctly filter items without case sensitivity', () => {
    const { queryByTestId, queryAllByTestId } = render(
      <SearchableCheckList context={context} items={items} selectedItemsKeys={['09']} onChange={_.noop} />
    );

    let checkBoxesWrapper = queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(7);

    let searchInputWrapper = queryByTestId('search-input');
    expect(searchInputWrapper).toBeInTheDocument();

    fireEvent.change(queryAllByTestId('search-input')[0], { target: { value: 'par' } });
    checkBoxesWrapper = queryAllByTestId('checkbox-input');

    // 1 main checkbox and 1 for Paranormal Activity
    expect(checkBoxesWrapper).toHaveLength(2);
    expect(checkBoxesWrapper[1]).toBeChecked();
  });

  it('should correctly call onChange when a single item is checked', () => {
    const onChange = jest.fn();

    const { queryAllByTestId } = render(
      <SearchableCheckList context={context} items={items} selectedItemsKeys={['01', '06']} onChange={onChange} />
    );

    let checkBoxesWrapper = queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(7);

    expect(onChange).toHaveBeenCalledTimes(0);
    fireEvent.click(checkBoxesWrapper[4]);
    expect(onChange).toHaveBeenCalledTimes(1);

    // Existing 2 selections + 1 new selection
    expect(onChange).toHaveBeenCalledWith(['01', '06', '03']);
  });

  it('should correctly call onSearch and onClear when search input specified and then cleared', () => {
    const callbacks = {
      onClear: jest.fn(),
      onSearch: jest.fn(),
    };

    const { getByTestId } = render(
      <SearchableCheckList
        context={context}
        items={items}
        onChange={_.noop}
        onClear={callbacks.onClear}
        onSearch={callbacks.onSearch}
      />
    );

    fireEvent.change(getByTestId('search-input'), { target: { value: 'new-value' } });
    expect(callbacks.onSearch).toHaveBeenCalledTimes(1);
    expect(callbacks.onSearch).toHaveBeenCalledWith('new-value');

    expect(getByTestId('search-icon-wrapper')).toHaveClass('aui--search-component-icon');
    fireEvent.click(getByTestId('search-icon-wrapper'));

    expect(callbacks.onClear).toHaveBeenCalledTimes(1);
    expect(callbacks.onClear).toHaveBeenCalledWith('');
  });

  it('should correctly call onChange when main checkbox is checked', () => {
    const onChange = jest.fn();

    const { queryAllByTestId } = render(<SearchableCheckList context={context} items={items} onChange={onChange} />);

    const checkBoxesWrapper = queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(7);

    expect(onChange).toHaveBeenCalledTimes(0);
    fireEvent.click(checkBoxesWrapper[0]);
    expect(onChange).toHaveBeenCalledTimes(1);

    // All items checked
    expect(onChange).toHaveBeenCalledWith(_.map(items, 'value'));
  });

  it('should call onChange with all items when selected items are fixed', () => {
    const onChange = jest.fn();

    const { queryAllByTestId } = render(
      <SearchableCheckList context={context} items={items} selectedItemsKeys={['01']} onChange={onChange} />
    );

    const checkBoxesWrapper = queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(7);

    expect(onChange).toHaveBeenCalledTimes(0);
    fireEvent.click(checkBoxesWrapper[0]);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(items.map((entry) => entry.value));
  });
});
