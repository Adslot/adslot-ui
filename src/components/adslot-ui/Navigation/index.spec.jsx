import React from 'react';
import { shallow } from 'enzyme';
import { Nav, NavItem } from 'react-bootstrap';
import Navigation from 'adslot-ui/Navigation';

describe('NavigationComponent', () => {
  let props;

  beforeEach(() => {
    props = {
      bsStyle: 'pills',
      barPosition: 'bottom',
    };
  });

  it('should render with props', () => {
    const component = shallow(
      <Navigation {...props}>
        <NavItem>test</NavItem>
      </Navigation>
    );

    expect(component.find(Nav)).to.have.length(1);
    expect(component.find(Nav).prop('className')).to.equals('bottom-bar');
    expect(component.find(Nav).prop('bsClass')).to.equal('nav-borderless');
  });
});
