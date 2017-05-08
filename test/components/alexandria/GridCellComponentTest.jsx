import classSuffixHelper from 'helpers/classSuffixHelper';
import { shallow } from 'enzyme';
import GridCellComponent from 'components/alexandria/GridCellComponent';
import React from 'react';

describe('GridCellComponent', () => {
  const componentClass = 'grid-component-cell';
  const getClassNames = (classSuffixes) => {
    const classNames = classSuffixHelper({ classSuffixes, componentClass });
    return `${componentClass}${classNames}`;
  };

  it('should have its component name as default className and no data-test-selector', () => {
    const component = shallow(<GridCellComponent />);
    expect(component.prop('className')).to.equal(componentClass);
    expect(component.children()).to.have.length(0);
    expect(component.prop('data-test-selector')).to.be.an('undefined');
  });

  it('should pass through children', () => {
    const children = <div className="test-class">Party town</div>;
    const component = shallow(<GridCellComponent>{children}</GridCellComponent>);
    expect(component.prop('className')).to.equal(componentClass);

    const childElement = component.children();
    expect(childElement.prop('className')).to.equal('test-class');
    expect(childElement.text()).to.equal('Party town');
  });

  it('should apply stretch class when stretch is true', () => {
    const component = shallow(<GridCellComponent stretch />);
    expect(component.prop('className')).to.equal(getClassNames(['stretch']));
  });

  it('should handle onClick when passed', () => {
    let called = 0;
    const onClick = () => { called += 1; };

    const component = shallow(<GridCellComponent onClick={onClick} />);
    expect(component.prop('className')).to.equal(getClassNames(['clickable']));
    expect(component.prop('onClick')).to.be.a('function');
    component.simulate('click');
    expect(called).to.equal(1);
  });

  it('should apply extra classes when passed classSuffixes', () => {
    const component = shallow(<GridCellComponent classSuffixes={['foo', 'bar']} />);
    expect(component.prop('className')).to.equal(getClassNames(['foo', 'bar']));
  });

  it('should apply extra classes and stretch when passed classSuffixes and stretch', () => {
    const component = shallow(<GridCellComponent stretch classSuffixes={['foo', 'bar']} />);
    expect(component.prop('className')).to.equal(getClassNames(['foo', 'bar', 'stretch']));
  });

  it('should apply data-test-selector', () => {
    const component = shallow(<GridCellComponent dts="this-has-data-test-selector" />);
    expect(component.prop('data-test-selector')).to.equal('this-has-data-test-selector');
  });
});
