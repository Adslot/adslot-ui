import React from 'react';
import _ from 'lodash';
import { render, screen, user } from 'testing';
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

describe('<SearchableChecklist />', () => {
  it('should correctly render with default values', () => {
    render(<SearchableCheckList context={context} items={items} onChange={_.noop} />);

    expect(screen.getByTestId('searchable-list-title')).toHaveTextContent('Publishers');

    const searchInputWrapper = screen.queryByTestId('search-input');
    expect(searchInputWrapper).toBeInTheDocument();
    expect(searchInputWrapper).toHaveValue('');
    expect(searchInputWrapper).toHaveAttribute('placeholder', 'Search');

    // 1 main checkBox and 6 item checkboxes
    const checkBoxesWrapper = screen.queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(7);

    // All unselected checkBoxes
    _.forEach(checkBoxesWrapper, (checkBoxItem) => {
      expect(checkBoxItem).not.toBeChecked();
    });

    expect(screen.getByTestId('footer-section')).toHaveTextContent('3 more publishers');
  });

  it('should not render title when hideTitle is false', () => {
    render(<SearchableCheckList context={context} items={items} onChange={_.noop} hideTitle={true} />);
    expect(screen.queryByTestId('searchable-list-title')).not.toBeInTheDocument();
  });

  it('should render search button by default when searchOnEnter is true', () => {
    render(<SearchableCheckList context={context} items={items} onChange={_.noop} searchOnEnter={true} />);
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('should not render search button when showSearchButton is false', () => {
    render(
      <SearchableCheckList
        context={context}
        items={items}
        onChange={_.noop}
        searchOnEnter={true}
        showSearchButton={false}
      />
    );
    expect(screen.queryByTestId('search-button')).not.toBeInTheDocument();
  });

  it('should correctly render footer value with single hidden item', () => {
    render(<SearchableCheckList context={context} items={items} displayCount={8} onChange={_.noop} />);

    expect(screen.getByTestId('footer-section')).toHaveTextContent('1 more publisher');
  });

  it('should correctly render footer text when specified', () => {
    render(
      <SearchableCheckList
        context={context}
        items={items}
        displayCount={8}
        onChange={_.noop}
        footerText="custom text"
      />
    );

    expect(screen.getByTestId('footer-section')).toHaveTextContent('custom text');
  });

  it('should correctly render custom placeholder', () => {
    render(
      <SearchableCheckList
        context={context}
        items={items}
        displayCount={8}
        placeholder="Start Searching..."
        onChange={_.noop}
      />
    );

    const searchInputWrapper = screen.queryByTestId('search-input');
    expect(searchInputWrapper).toBeInTheDocument();
    expect(searchInputWrapper).toHaveAttribute('placeholder', 'Start Searching...');
  });

  it('should correctly render with displayCount covering all items', () => {
    render(<SearchableCheckList context={context} items={items} displayCount={15} onChange={_.noop} />);

    // 1 main checkBox and 9 item checkboxes
    const checkBoxesWrapper = screen.queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(10);

    // No footer when all items are rendered
    expect(screen.queryByTestId('footer-section')).not.toBeInTheDocument();
  });

  it('should correctly render with partial selection', () => {
    render(<SearchableCheckList context={context} items={items} selectedItemsKeys={['01', '06']} onChange={_.noop} />);

    // main checkbox should be partially checked
    expect(screen.queryAllByClass('aui--checkbox partial-checked aui--checkbox-default is-selected')).toHaveLength(1);

    // 1 main checkBox and 6 item checkboxes
    const checkBoxesWrapper = screen.queryAllByTestId('checkbox-input');
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
    render(
      <SearchableCheckList
        context={context}
        items={items}
        selectedItemsKeys={_.map(items, 'value')}
        onChange={_.noop}
      />
    );

    expect(screen.queryAllByClass('aui--checkbox partial-checked')).toHaveLength(0);

    // 1 main checkBox and 6 item checkboxes
    const checkBoxesWrapper = screen.queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(7);

    _.forEach(checkBoxesWrapper, (checkBoxItem) => {
      expect(checkBoxItem).toBeChecked();
    });
  });

  it('should correctly filter checkboxes on search', async () => {
    render(
      <SearchableCheckList context={context} items={items} selectedItemsKeys={['01', '06', '09']} onChange={_.noop} />
    );

    let checkBoxesWrapper = screen.queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(7);

    let searchInputWrapper = screen.queryByTestId('search-input');
    expect(searchInputWrapper).toBeInTheDocument();

    await user.type(searchInputWrapper, 'Par');
    checkBoxesWrapper = screen.queryAllByTestId('checkbox-input');

    // 1 main checkbox and 1 for Paranormal Activity
    expect(checkBoxesWrapper).toHaveLength(2);
    expect(checkBoxesWrapper[1]).toBeChecked();
  });

  it('should correctly filter items without case sensitivity', async () => {
    render(<SearchableCheckList context={context} items={items} selectedItemsKeys={['09']} onChange={_.noop} />);

    let checkBoxesWrapper = screen.queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(7);

    let searchInputWrapper = screen.queryByTestId('search-input');
    expect(searchInputWrapper).toBeInTheDocument();

    await user.type(screen.queryAllByTestId('search-input')[0], 'par');
    checkBoxesWrapper = screen.queryAllByTestId('checkbox-input');

    // 1 main checkbox and 1 for Paranormal Activity
    expect(checkBoxesWrapper).toHaveLength(2);
    expect(checkBoxesWrapper[1]).toBeChecked();
  });

  it('should correctly call onChange when a single item is checked', async () => {
    const onChange = jest.fn();

    render(
      <SearchableCheckList context={context} items={items} selectedItemsKeys={['01', '06']} onChange={onChange} />
    );

    let checkBoxesWrapper = screen.queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(7);

    expect(onChange).toHaveBeenCalledTimes(0);
    await user.click(checkBoxesWrapper[4]);
    expect(onChange).toHaveBeenCalledTimes(1);

    // Existing 2 selections + 1 new selection
    expect(onChange).toHaveBeenCalledWith(['01', '06', '03']);
  });

  it('should correctly call onSearch and onClear when search input specified and then cleared', async () => {
    const callbacks = {
      onClear: jest.fn(),
      onSearch: jest.fn(),
    };

    render(
      <SearchableCheckList
        context={context}
        items={items}
        onChange={_.noop}
        onClear={callbacks.onClear}
        onSearch={callbacks.onSearch}
      />
    );

    await user.type(screen.getByTestId('search-input'), 'new-value');
    expect(callbacks.onSearch).toHaveBeenCalledWith('new-value');

    expect(screen.getByTestId('search-icon-wrapper')).toHaveClass('aui--search-component-icon');
    await user.click(screen.getByTestId('search-icon-wrapper'));

    expect(callbacks.onClear).toHaveBeenCalledTimes(1);
    expect(callbacks.onClear).toHaveBeenCalledWith('');
  });

  it('should correctly call onChange when main checkbox is checked', async () => {
    const onChange = jest.fn();

    render(<SearchableCheckList context={context} items={items} onChange={onChange} />);

    const checkBoxesWrapper = screen.queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(7);

    expect(onChange).toHaveBeenCalledTimes(0);
    await user.click(checkBoxesWrapper[0]);
    expect(onChange).toHaveBeenCalledTimes(1);

    // All items checked
    expect(onChange).toHaveBeenCalledWith(_.map(items, 'value'));
  });

  it('should call onChange with all items when selected items are fixed', async () => {
    const onChange = jest.fn();

    render(<SearchableCheckList context={context} items={items} selectedItemsKeys={['01']} onChange={onChange} />);

    const checkBoxesWrapper = screen.queryAllByTestId('checkbox-input');
    expect(checkBoxesWrapper).toHaveLength(7);

    expect(onChange).toHaveBeenCalledTimes(0);
    await user.click(checkBoxesWrapper[0]);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(items.map((entry) => entry.value));
  });
});
