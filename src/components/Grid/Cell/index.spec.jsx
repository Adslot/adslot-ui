import React from 'react';
import { render, screen, user } from 'testing';
import { classSuffixHelper } from '../../../lib/utils';
import GridCell from '.';

describe('<GridCell />', () => {
  const componentClass = 'grid-component-cell';
  const getClassNames = (classSuffixes) => {
    const classNames = classSuffixHelper({ classSuffixes, componentClass });
    return `${componentClass}${classNames}`;
  };

  it('should have its component name as default className and no data-test-selector', () => {
    render(<GridCell />);
    expect(screen.getByTestId('grid-cell-wrapper')).toHaveClass(componentClass);
    expect(screen.getByTestId('grid-cell-wrapper')).toBeEmpty;
    expect(screen.getByTestId('grid-cell-wrapper')).not.toHaveAttribute('data-test-selector');
  });

  it('should pass through children', () => {
    const children = (
      <div data-testid="grid-cell-children" className="test-class">
        Party town
      </div>
    );
    render(<GridCell>{children}</GridCell>);
    expect(screen.getByTestId('grid-cell-wrapper')).toHaveClass(componentClass);
    expect(screen.getByTestId('grid-cell-children')).toHaveClass('test-class');
    expect(screen.getByTestId('grid-cell-children')).toHaveTextContent('Party town');
  });

  it('should apply stretch class when stretch is true', () => {
    render(<GridCell stretch />);
    expect(screen.getByTestId('grid-cell-wrapper')).toHaveClass(getClassNames(['stretch']));
  });

  it('should handle onClick when passed', async () => {
    const onClick = jest.fn();
    render(<GridCell onClick={onClick} />);
    expect(screen.getByTestId('grid-cell-wrapper')).toHaveClass(getClassNames(['clickable']));
    await user.click(screen.getByTestId('grid-cell-wrapper'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should apply extra classes when passed classSuffixes', () => {
    render(<GridCell classSuffixes={['foo', 'bar']} />);
    expect(screen.getByTestId('grid-cell-wrapper')).toHaveClass(getClassNames(['foo', 'bar']));
  });

  it('should apply extra classes and stretch when passed classSuffixes and stretch', () => {
    render(<GridCell stretch classSuffixes={['foo', 'bar']} />);
    expect(screen.getByTestId('grid-cell-wrapper')).toHaveClass(getClassNames(['foo', 'bar', 'stretch']));
  });

  it('should apply data-test-selector', () => {
    render(<GridCell dts="this-has-data-test-selector" />);
    expect(screen.getByTestId('grid-cell-wrapper')).toHaveAttribute(
      'data-test-selector',
      'this-has-data-test-selector'
    );
  });

  it('should add custom classes when passed addonClassNames', () => {
    render(<GridCell addonClassNames={['addonClass1', 'addonClass2']} />);
    expect(screen.getByTestId('grid-cell-wrapper')).toHaveClass('grid-component-cell addonClass1 addonClass2');
  });
});
