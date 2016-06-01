import React from 'react';
import { Select } from 'components/distributionEntry';
import ExampleSelect from 'examples/components/selects';
import { shallow } from 'enzyme';

describe('ExampleSelect', () => {
  it('should render two react-select components with defaults', () => {
    const component = shallow(<ExampleSelect />);
    const selectComponents = component.find(Select);
    expect(selectComponents).to.have.length(2);
    expect(selectComponents.first().prop('clearable')).to.equal(false);
    expect(selectComponents.first().prop('name')).to.equal('countriesSelect');
    expect(selectComponents.last().prop('clearable')).to.equal(true);
    expect(selectComponents.last().prop('name')).to.equal('flavoursSelect');
  });
});
