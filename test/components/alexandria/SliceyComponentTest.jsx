import ArcComponent from 'components/alexandria/slicey/ArcComponent';
import DonutComponent from 'components/alexandria/slicey/DonutComponent';
import MarkerComponent from 'components/alexandria/slicey/MarkerComponent';
import React from 'react';
import SliceyComponent from 'components/alexandria/SliceyComponent';
import { shallow } from 'enzyme';

describe('SliceyComponent', () => {
  let dataset;

  beforeEach(() => {
    dataset = [
      { label: 'positive', value: 5 },
      { label: 'negative', value: 3 },
    ];
  });

  it('should render an empty state', () => {
    const component = shallow(<SliceyComponent />);
    expect(component.prop('className')).to.equal('slicey-component');
    expect(component.prop('height')).to.equal(100);
    expect(component.prop('viewBox')).to.equal('-0.5 -0.5 1 1');
    expect(component.prop('width')).to.equal(100);

    expect(component.find('.slicey-background')).to.have.length(0);
    expect(component.find('.slicey-empty')).to.have.length(1);
    expect(component.find(ArcComponent)).to.have.length(0);
    expect(component.find(MarkerComponent)).to.have.length(0);
    expect(component.find(DonutComponent)).to.have.length(0);
  });

  it('should render a given dataset', () => {
    const props = { dataset };
    const component = shallow(<SliceyComponent {...props} />);
    expect(component.prop('className')).to.equal('slicey-component');
    expect(component.prop('height')).to.equal(100);
    expect(component.prop('viewBox')).to.equal('-0.5 -0.5 1 1');
    expect(component.prop('width')).to.equal(100);
    expect(component.type()).to.equal('svg');

    expect(component.children()).to.have.length(3);

    expect(component.find('.slicey-background')).to.have.length(1);
    expect(component.find('.slicey-empty')).to.have.length(0);
    expect(component.find(ArcComponent)).to.have.length(2);
    expect(component.find(MarkerComponent)).to.have.length(0);
    expect(component.find(DonutComponent)).to.have.length(0);
  });

  it('should render a circle if there is only one arc to draw', () => {
    const props = { dataset: [{ label: 'positive', value: 5 }] };
    const component = shallow(<SliceyComponent {...props} />);
    expect(component.prop('className')).to.equal('slicey-component');
    expect(component.prop('height')).to.equal(100);
    expect(component.prop('viewBox')).to.equal('-0.5 -0.5 1 1');
    expect(component.prop('width')).to.equal(100);
    expect(component.type()).to.equal('svg');

    expect(component.children()).to.have.length(2);

    const arcCircle = component.find('circle').last();
    expect(arcCircle.prop('className')).to.equal('arc-component positive');

    expect(component.find('.slicey-background')).to.have.length(1);
    expect(component.find('.slicey-empty')).to.have.length(0);
    expect(component.find(ArcComponent)).to.have.length(0);
    expect(component.find(MarkerComponent)).to.have.length(0);
    expect(component.find(DonutComponent)).to.have.length(0);
  });

  it('should render a marker on a donut with a custom diameter', () => {
    const props = {
      dataset,
      marker: 0.5,
      donut: true,
      diameter: 50,
    };
    const component = shallow(<SliceyComponent {...props} />);
    expect(component.prop('className')).to.equal('slicey-component');
    expect(component.prop('height')).to.equal(50);
    expect(component.prop('viewBox')).to.equal('-0.5 -0.5 1 1');
    expect(component.prop('width')).to.equal(50);
    expect(component.type()).to.equal('svg');

    expect(component.children()).to.have.length(5);

    expect(component.find('.slicey-background')).to.have.length(1);
    expect(component.find('.slicey-empty')).to.have.length(0);
    expect(component.find(ArcComponent)).to.have.length(2);

    const marker = component.find(MarkerComponent);
    expect(marker.prop('fraction')).to.equal(0.5);

    expect(component.find(DonutComponent)).to.have.length(1);
  });
});
