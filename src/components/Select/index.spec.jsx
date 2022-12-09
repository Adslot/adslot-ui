import React from 'react';
import { render, cleanup, fireEvent, queryAllByAttribute } from '@testing-library/react';
import Select from '.';

afterEach(cleanup);

const queryAllByDts = queryAllByAttribute.bind(null, 'data-test-selector');
const queryAllByClass = queryAllByAttribute.bind(null, 'class');

const defaultOptions = [
  { value: 'au', label: 'Australia' },
  { value: 'ca', label: 'Canada' },
  { value: 'jp', label: 'Japan' },
  { value: 'uk', label: 'United Kingdom' },
];

describe('<Select />', () => {
  it('should have base class', () => {
    const { queryByText } = render(<Select />);
    expect(queryByText('Select...')).toBeInTheDocument();
  });

  it('should have custom option background', () => {
    const { getByText, queryByText, queryAllByText } = render(
      <Select options={defaultOptions} isOptionDisabled={({ value }) => value === 'jp'} menuIsOpen />
    );

    expect(queryByText('Select...')).toBeInTheDocument();
    expect(queryByText('Australia')).toBeInTheDocument();
    expect(getByText('Australia')).toHaveClass('select-component__option');
    expect(queryByText('Canada')).toBeInTheDocument();
    expect(getByText('Canada')).toHaveClass('select-component__option');
    expect(queryByText('Japan')).toBeInTheDocument();
    expect(getByText('Japan')).toHaveClass('select-component__option');
    expect(queryByText('United Kingdom')).toBeInTheDocument();
    expect(getByText('United Kingdom')).toHaveClass('select-component__option');

    fireEvent.click(getByText('Australia'));
    expect(queryAllByText('Australia')).toHaveLength(2);
    expect(queryAllByText('Australia')[0]).toHaveClass('select-component__single-value');
    expect(queryAllByText('Australia')[1]).toHaveClass(
      'select-component__option select-component__option--is-focused select-component__option--is-selected'
    );

    fireEvent.mouseOver(getByText('Canada'));
    expect(queryAllByText('Australia')[1]).not.toHaveClass('select-component__option--is-focused');
    expect(getByText('Canada')).toHaveClass('select-component__option--is-focused');

    expect(getByText('Japan')).toHaveClass('select-component__option--is-disabled');
  });

  it('should show cross icon for clear opration', () => {
    const { getByText, queryByText } = render(<Select options={defaultOptions} menuIsOpen isClearable />);
    fireEvent.click(getByText('Australia'));

    expect(queryByText('✕')).toBeInTheDocument();
    expect(getByText('✕')).toHaveClass('select-component__indicator select-component__clear-indicator');
  });

  it('should handle multi selections', () => {
    const { container, getByText, queryByText } = render(
      <Select options={defaultOptions} defaultValue={[defaultOptions[0], defaultOptions[1]]} isMulti />
    );
    expect(
      queryAllByClass(container, 'select-component__multi-value__label css-9x9xlz-MultiValueGeneric')
    ).toHaveLength(2);
    expect(queryByText('Australia')).toBeInTheDocument();
    expect(getByText('Australia')).toHaveClass('select-component__multi-value__label');
    expect(queryByText('Canada')).toBeInTheDocument();
    expect(getByText('Canada')).toHaveClass('select-component__multi-value__label');
  });

  it('should have custom SelectContainer if dts is passed in', () => {
    const { container, rerender, getByText, queryByText } = render(<Select options={defaultOptions} dts="test-dts" />);

    expect(queryAllByDts(container, 'test-dts')).toHaveLength(1);
    expect(queryAllByClass(container, 'select-component__value-container css-1ookgdl-ValueContainer')).toHaveLength(1);
    expect(
      queryAllByClass(
        container,
        'select-component__indicator select-component__dropdown-indicator css-4m2bza-indicatorContainer'
      )
    ).toHaveLength(1);

    rerender(<Select options={defaultOptions} menuIsOpen isClearable dts="test-dts" />);
    fireEvent.click(getByText('Australia'));

    expect(queryByText('✕')).toBeInTheDocument();
    expect(getByText('✕')).toHaveClass('select-component__indicator select-component__clear-indicator');
  });

  it('should render select options in body if props.isInModal is true', () => {
    const { container, rerender } = render(
      <div className="select-wrapper">
        <Select options={defaultOptions} isInModal />
      </div>
    );

    rerender(
      <div className="select-wrapper">
        <Select options={defaultOptions} menuIsOpen isInModal />
      </div>
    );

    expect(container).toMatchSnapshot();
    expect(queryAllByClass(document.body, 'select-component__menu-portal css-hec97l-MenuPortal')).toHaveLength(1);
    expect();
  });
});
