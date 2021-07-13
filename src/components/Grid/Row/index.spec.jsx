import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { classSuffixHelper } from '../../../lib/utils';
import GridRow from '.';

afterEach(cleanup);

describe('<GridRow />', () => {
  const componentClass = 'grid-component-row';
  const getClassNames = classSuffixes => {
    const classNames = classSuffixHelper({ classSuffixes, componentClass });
    return `${componentClass}${classNames}`;
  };

  it('should render with defaults', () => {
    const { getByTestId } = render(<GridRow />);
    expect(getByTestId('grid-row-wrapper')).toHaveClass(getClassNames(['body', 'horizontal-border']));
    expect(getByTestId('grid-row-wrapper')).toBeEmptyDOMElement();
    expect(getByTestId('grid-row-wrapper')).not.toHaveAttribute('data-test-selector');
  });

  it('should pass through children', () => {
    const children = (
      <div data-testid="grid-row-children" className="test-class">
        Party town
      </div>
    );
    const { getByTestId } = render(<GridRow>{children}</GridRow>);
    expect(getByTestId('grid-row-wrapper')).toHaveClass(getClassNames(['body', 'horizontal-border']));
    expect(getByTestId('grid-row-children')).toHaveClass('test-class');
    expect(getByTestId('grid-row-children')).toHaveTextContent('Party town');
  });

  it('should have no horizontalBorder class when horizontalBorder is false', () => {
    const { getByTestId } = render(<GridRow horizontalBorder={false} />);
    expect(getByTestId('grid-row-wrapper')).toHaveClass(getClassNames(['body']));
  });

  it('should apply short class when short is true', () => {
    const { getByTestId } = render(<GridRow short />);
    expect(getByTestId('grid-row-wrapper')).toHaveClass(getClassNames(['body', 'horizontal-border', 'short']));
  });

  it('should apply header class instead of body when type is header', () => {
    const { getByTestId } = render(<GridRow type="header" />);
    expect(getByTestId('grid-row-wrapper')).toHaveClass(getClassNames(['header', 'horizontal-border']));
  });

  it('should apply subfooter class instead of body when type is subfooter', () => {
    const { getByTestId } = render(<GridRow type="subfooter" />);
    expect(getByTestId('grid-row-wrapper')).toHaveClass(getClassNames(['subfooter', 'horizontal-border']));
  });

  it('should apply footer class instead of body when type is footer', () => {
    const { getByTestId } = render(<GridRow type="footer" />);
    expect(getByTestId('grid-row-wrapper')).toHaveClass(getClassNames(['footer', 'horizontal-border']));
  });

  it('should apply vertical-cell-border class when verticalCellBorder is true', () => {
    const { getByTestId } = render(<GridRow verticalCellBorder />);
    expect(getByTestId('grid-row-wrapper')).toHaveClass(
      getClassNames(['body', 'horizontal-border', 'vertical-cell-border'])
    );
  });

  it('should apply data-test-selector', () => {
    const { getByTestId } = render(<GridRow dts="this-has-data-test-selector" />);
    expect(getByTestId('grid-row-wrapper')).toHaveAttribute('data-test-selector', 'this-has-data-test-selector');
  });
});
