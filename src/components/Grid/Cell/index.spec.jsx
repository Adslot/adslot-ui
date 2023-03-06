import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { classSuffixHelper } from '../../../utils';
import GridCell from '.';

afterEach(cleanup);

describe('<GridCell />', () => {
  const componentClass = 'grid-component-cell';
  const getClassNames = (classSuffixes) => {
    const classNames = classSuffixHelper({ classSuffixes, componentClass });
    return `${componentClass}${classNames}`;
  };

  it('should have its component name as default className and no data-test-selector', () => {
    const { getByTestId } = render(<GridCell />);
    expect(getByTestId('grid-cell-wrapper')).toHaveClass(componentClass);
    expect(getByTestId('grid-cell-wrapper')).toBeEmpty;
    expect(getByTestId('grid-cell-wrapper')).not.toHaveAttribute('data-test-selector');
  });

  it('should pass through children', () => {
    const children = (
      <div data-testid="grid-cell-children" className="test-class">
        Party town
      </div>
    );
    const { getByTestId } = render(<GridCell>{children}</GridCell>);
    expect(getByTestId('grid-cell-wrapper')).toHaveClass(componentClass);
    expect(getByTestId('grid-cell-children')).toHaveClass('test-class');
    expect(getByTestId('grid-cell-children')).toHaveTextContent('Party town');
  });

  it('should apply stretch class when stretch is true', () => {
    const { getByTestId } = render(<GridCell stretch />);
    expect(getByTestId('grid-cell-wrapper')).toHaveClass(getClassNames(['stretch']));
  });

  it('should handle onClick when passed', () => {
    const onClick = jest.fn();

    const { getByTestId } = render(<GridCell onClick={onClick} />);
    expect(getByTestId('grid-cell-wrapper')).toHaveClass(getClassNames(['clickable']));
    fireEvent.click(getByTestId('grid-cell-wrapper'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should apply extra classes when passed classSuffixes', () => {
    const { getByTestId } = render(<GridCell classSuffixes={['foo', 'bar']} />);
    expect(getByTestId('grid-cell-wrapper')).toHaveClass(getClassNames(['foo', 'bar']));
  });

  it('should apply extra classes and stretch when passed classSuffixes and stretch', () => {
    const { getByTestId } = render(<GridCell stretch classSuffixes={['foo', 'bar']} />);
    expect(getByTestId('grid-cell-wrapper')).toHaveClass(getClassNames(['foo', 'bar', 'stretch']));
  });

  it('should apply data-test-selector', () => {
    const { getByTestId } = render(<GridCell dts="this-has-data-test-selector" />);
    expect(getByTestId('grid-cell-wrapper')).toHaveAttribute('data-test-selector', 'this-has-data-test-selector');
  });

  it('should add custom classes when passed addonClassNames', () => {
    const { getByTestId } = render(<GridCell addonClassNames={['addonClass1', 'addonClass2']} />);
    expect(getByTestId('grid-cell-wrapper')).toHaveClass('grid-component-cell addonClass1 addonClass2');
  });
});
