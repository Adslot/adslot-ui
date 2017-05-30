import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '.';

describe('Spinner', () => {
  it('should render with defaults', () => {
    const component = shallow(<Spinner />);
    expect(component.prop('className')).to.equal('spinner-component');
    expect(component.childAt(0).prop('className')).to.equal('spinner spinner-large spinner-colour-style-default');
  });

  it('should render small with primary style', () => {
    const component = shallow(<Spinner size="small" colourStyle="primary" />);
    expect(component.childAt(0).prop('className')).to.equal('spinner spinner-small spinner-colour-style-primary');
  });
});
