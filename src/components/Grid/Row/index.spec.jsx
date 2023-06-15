import React from 'react';
import { render, screen } from 'testing';
import { classSuffixHelper } from '../../../utils';
import GridRow from '.';

const componentClass = 'grid-component-row';
const getClassNames = (classSuffixes) => {
  const classNames = classSuffixHelper({ classSuffixes, componentClass });
  return `${componentClass}${classNames}`;
};

it('should render with defaults', () => {
  render(<GridRow />);
  expect(screen.getByTestId('grid-row-wrapper')).toHaveClass(getClassNames(['body', 'horizontal-border']));
  expect(screen.getByTestId('grid-row-wrapper')).toBeEmptyDOMElement();
  expect(screen.getByTestId('grid-row-wrapper')).not.toHaveAttribute('data-test-selector');
});

it('should pass through children', () => {
  const children = (
    <div data-testid="grid-row-children" className="test-class">
      Party town
    </div>
  );
  render(<GridRow>{children}</GridRow>);
  expect(screen.getByTestId('grid-row-wrapper')).toHaveClass(getClassNames(['body', 'horizontal-border']));
  expect(screen.getByTestId('grid-row-children')).toHaveClass('test-class');
  expect(screen.getByTestId('grid-row-children')).toHaveTextContent('Party town');
});

it('should have no horizontalBorder class when horizontalBorder is false', () => {
  render(<GridRow horizontalBorder={false} />);
  expect(screen.getByTestId('grid-row-wrapper')).toHaveClass(getClassNames(['body']));
});

it('should apply short class when short is true', () => {
  render(<GridRow short />);
  expect(screen.getByTestId('grid-row-wrapper')).toHaveClass(getClassNames(['body', 'horizontal-border', 'short']));
});

it('should apply header class instead of body when type is header', () => {
  render(<GridRow type="header" />);
  expect(screen.getByTestId('grid-row-wrapper')).toHaveClass(getClassNames(['header', 'horizontal-border']));
});

it('should apply subfooter class instead of body when type is subfooter', () => {
  render(<GridRow type="subfooter" />);
  expect(screen.getByTestId('grid-row-wrapper')).toHaveClass(getClassNames(['subfooter', 'horizontal-border']));
});

it('should apply footer class instead of body when type is footer', () => {
  render(<GridRow type="footer" />);
  expect(screen.getByTestId('grid-row-wrapper')).toHaveClass(getClassNames(['footer', 'horizontal-border']));
});

it('should apply vertical-cell-border class when verticalCellBorder is true', () => {
  render(<GridRow verticalCellBorder />);
  expect(screen.getByTestId('grid-row-wrapper')).toHaveClass(
    getClassNames(['body', 'horizontal-border', 'vertical-cell-border'])
  );
});

it('should apply data-test-selector', () => {
  render(<GridRow dts="this-has-data-test-selector" />);
  expect(screen.getByTestId('grid-row-wrapper')).toHaveAttribute('data-test-selector', 'this-has-data-test-selector');
});
