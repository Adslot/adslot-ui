import React from 'react';
import { render, screen, user } from 'testing';
import Select from '.';

const defaultOptions = [
  { value: 'au', label: 'Australia' },
  { value: 'ca', label: 'Canada' },
  { value: 'jp', label: 'Japan' },
  { value: 'uk', label: 'United Kingdom' },
];

describe('<Select />', () => {
  it('should have base class', () => {
    render(<Select />);
    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  it('should have custom option background', async () => {
    render(<Select options={defaultOptions} isOptionDisabled={({ value }) => value === 'jp'} menuIsOpen />);

    expect(screen.getByText('Select...')).toBeInTheDocument();
    expect(screen.getByText('Australia')).toBeInTheDocument();
    expect(screen.getByText('Australia')).toHaveClass('select-component__option');
    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toHaveClass('select-component__option');
    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toHaveClass('select-component__option');
    expect(screen.getByText('United Kingdom')).toBeInTheDocument();
    expect(screen.getByText('United Kingdom')).toHaveClass('select-component__option');

    await user.click(screen.getByText('Australia'));
    expect(screen.getAllByText('Australia')).toHaveLength(2);
    expect(screen.getAllByText('Australia')[0]).toHaveClass('select-component__single-value');
    expect(screen.getAllByText('Australia')[1]).toHaveClass(
      'select-component__option select-component__option--is-focused select-component__option--is-selected'
    );

    await user.hover(screen.getByText('Canada'));
    expect(screen.getAllByText('Australia')[1]).not.toHaveClass('select-component__option--is-focused');
    expect(screen.getByText('Canada')).toHaveClass('select-component__option--is-focused');

    expect(screen.getByText('Japan')).toHaveClass('select-component__option--is-disabled');
  });

  it('should show cross icon for clear operation', async () => {
    render(<Select options={defaultOptions} menuIsOpen isClearable />);
    await user.click(screen.getByText('Australia'));

    expect(screen.getByText('✕')).toBeInTheDocument();
    expect(screen.getByText('✕')).toHaveClass('select-component__indicator select-component__clear-indicator');
  });

  it('should handle multi selections', () => {
    render(<Select options={defaultOptions} defaultValue={[defaultOptions[0], defaultOptions[1]]} isMulti />);
    expect(screen.getAllByClass('css-11547y4 select-component__multi-value__label')).toHaveLength(2);
    expect(screen.getByText('Australia')).toBeInTheDocument();
    expect(screen.getByText('Australia')).toHaveClass('select-component__multi-value__label');
    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toHaveClass('select-component__multi-value__label');
  });

  it('should have custom SelectContainer if dts is passed in', async () => {
    const view = render(<Select options={defaultOptions} dts="test-dts" />);

    expect(screen.getAllByDts('test-dts')).toHaveLength(1);
    expect(screen.getAllByClass('select-component__value-container css-12htazg-ValueContainer')).toHaveLength(1);
    expect(
      screen.getAllByClass(
        'select-component__indicator select-component__dropdown-indicator css-171ess4-indicatorContainer'
      )
    ).toHaveLength(1);

    view.rerender(<Select options={defaultOptions} menuIsOpen isClearable dts="test-dts" />);
    await user.click(screen.getByText('Australia'));

    expect(screen.getByText('✕')).toBeInTheDocument();
    expect(screen.getByText('✕')).toHaveClass('select-component__indicator select-component__clear-indicator');
  });

  it('should render select options in body if props.isInModal is true', async () => {
    const view = render(
      <div className="select-wrapper">
        <Select options={defaultOptions} isInModal />
      </div>
    );

    view.rerender(
      <div className="select-wrapper">
        <Select options={defaultOptions} menuIsOpen isInModal />
      </div>
    );
    expect(screen.getAllByClass('select-component__menu-portal css-bchx50')).toHaveLength(1);
  });
});
