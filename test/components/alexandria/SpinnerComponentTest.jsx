import { shallow } from 'enzyme';
import SpinnerComponent from 'components/alexandria/SpinnerComponent';
import React from 'react';

describe('SpinnerComponent', () => {
  it('should render with defaults', () => {
    const component = shallow(<SpinnerComponent />);
    expect(component.prop('className')).to.equal('spinner-component');
    expect(component.childAt(0).prop('className')).to.equal('spinner spinner-large spinner-colour-style-default');
  });

  it('should render small with primary style', () => {
    const component = shallow(<SpinnerComponent size="small" colourStyle="primary" />);
    expect(component.childAt(0).prop('className')).to.equal('spinner spinner-small spinner-colour-style-primary');
  });
});
