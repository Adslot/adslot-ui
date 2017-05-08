import React from 'react';
import { shallow } from 'enzyme';

import StatisticComponent from '../../../src/components/alexandria/StatisticComponent';

describe('StatisticComponent', () => {
  it('should render with value and label', () => {
    const component = shallow(<StatisticComponent label="Views" value="2 Million" />);
    expect(component.prop('className')).to.equal('statistic-component');
    expect(component.children()).to.have.length(2);

    const statisticValue = component.children().first();
    expect(statisticValue.prop('className')).to.equal('statistic-component-value');
    expect(statisticValue.text()).to.equal('2 Million');

    const statisticLabel = component.children().last();
    expect(statisticLabel.prop('className')).to.equal('statistic-component-label');
    expect(statisticLabel.text()).to.equal('Views');
  });

  it('should render inline', () => {
    const component = shallow(<StatisticComponent label="Views" value="2 Million" inline />);
    expect(component.prop('className')).to.equal('statistic-component inline');
  });
});
