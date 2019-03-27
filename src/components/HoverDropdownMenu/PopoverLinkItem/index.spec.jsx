import _ from 'lodash';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { Button } from 'react-bootstrap';
import PopoverLinkItem from './';

describe('PopoverLinkItemComponent', () => {
  let props = {};
  let sandbox = null;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    props = {
      title: 'Link 1',
      url: 'www.some.url.com',
      target: '_self',
      isEnabled: true,
      onClick: _.noop,
    };

    sandbox.spy(props, 'onClick');
  });

  afterEach(() => sandbox.restore());

  it('should render with default props', () => {
    const component = shallow(<PopoverLinkItem {...props} />);
    expect(component.find('li')).to.have.length(1);
    expect(component.find(Button).props().href).to.equal('www.some.url.com');
  });

  it('should trigger `props.onClick` when clicking on the component', () => {
    const component = shallow(<PopoverLinkItem {...props} />);
    component.find(Button).simulate('click');
    expect(props.onClick.calledOnce).to.equal(true);
  });

  it('should not have href props on `PopoverLinkItem` when `target` is _modal', () => {
    props.target = '_modal';
    const component = shallow(<PopoverLinkItem {...props} />);
    expect(component.find(Button).props().href).to.equal(undefined);
  });

  it('should add `rel` to anchor props when target is "_blank"', () => {
    props.target = '_blank';
    const component = shallow(<PopoverLinkItem {...props} />);
    expect(component.find(Button).props().rel).to.equal('noopener noreferrer');
  });
});
