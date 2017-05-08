import { shallow } from 'enzyme';
import React from 'react';
import classSuffixHelper from 'helpers/classSuffixHelper';
import GridRowComponent from '../../../src/components/alexandria/GridRowComponent';

describe('GridRowComponent', () => {
  const componentClass = 'grid-component-row';
  const getClassNames = (classSuffixes) => {
    const classNames = classSuffixHelper({ classSuffixes, componentClass });
    return `${componentClass}${classNames}`;
  };

  it('should render with defaults', () => {
    const component = shallow(<GridRowComponent />);
    expect(component.prop('className')).to.equal(getClassNames(['body', 'horizontal-border']));
    expect(component.children()).to.have.length(0);
    expect(component.prop('data-test-selector')).to.be.an('undefined');
  });

  it('should pass through children', () => {
    const children = <div className="test-class">Party town</div>;
    const component = shallow(<GridRowComponent>{children}</GridRowComponent>);
    expect(component.prop('className')).to.equal(getClassNames(['body', 'horizontal-border']));

    const childElement = component.children();
    expect(childElement.prop('className')).to.equal('test-class');
    expect(childElement.text()).to.equal('Party town');
  });

  it('should have no horizontalBorder class when horizontalBorder is false', () => {
    const component = shallow(<GridRowComponent horizontalBorder={false} />);
    expect(component.prop('className')).to.equal(getClassNames(['body']));
  });

  it('should apply short class when short is true', () => {
    const component = shallow(<GridRowComponent short />);
    expect(component.prop('className')).to.equal(getClassNames(['body', 'horizontal-border', 'short']));
  });

  it('should apply header class instead of body when type is header', () => {
    const component = shallow(<GridRowComponent type="header" />);
    expect(component.prop('className')).to.equal(getClassNames(['header', 'horizontal-border']));
  });

  it('should apply subfooter class instead of body when type is subfooter', () => {
    const component = shallow(<GridRowComponent type="subfooter" />);
    expect(component.prop('className')).to.equal(getClassNames(['subfooter', 'horizontal-border']));
  });

  it('should apply footer class instead of body when type is footer', () => {
    const component = shallow(<GridRowComponent type="footer" />);
    expect(component.prop('className')).to.equal(getClassNames(['footer', 'horizontal-border']));
  });

  it('should apply vertical-cell-border class when verticalCellBorder is true', () => {
    const component = shallow(<GridRowComponent verticalCellBorder />);
    expect(component.prop('className')).to.equal(getClassNames(['body', 'horizontal-border', 'vertical-cell-border']));
  });

  it('should apply data-test-selector', () => {
    const component = shallow(<GridRowComponent dts="this-has-data-test-selector" />);
    expect(component.prop('data-test-selector')).to.equal('this-has-data-test-selector');
  });
});
