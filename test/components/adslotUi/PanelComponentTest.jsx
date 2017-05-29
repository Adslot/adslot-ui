import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Panel from 'components/adslotUi/PanelComponent';
import SvgSymbol from 'components/alexandria/SvgSymbol/component';
import PanelMocks from 'mocks/PanelMocks';

describe('PanelComponent', () => {
  const {
    panel1,
    panel2,
    panel3,
  } = PanelMocks;

  it('should render with defaults', () => {
    const component = shallow(<Panel {...panel1} />);
    expect(component.prop('className')).to.equal('panel-component');

    const headerElement = component.find('.panel-component-header');
    expect(headerElement).to.have.length(1);
    expect(headerElement.text()).to.equal('Panel 1');
    expect(headerElement.prop('onClick')).to.be.a('function');

    const contentElement = component.find('.panel-component-content');
    expect(contentElement).to.have.length(1);
    expect(contentElement.children()).to.have.length(0);
  });

  it('should render with props', () => {
    const component = shallow(<Panel {...panel2}>{panel2.content}</Panel>);
    expect(component.prop('className')).to.equal('panel-component collapsed');
    expect(component.prop('data-test-selector')).to.equal('panel-two');

    const headerElement = component.find('.panel-component-header');
    const icon = headerElement.find(SvgSymbol);
    expect(icon).to.have.length(1);
    expect(icon.prop('href')).to.equal('/assets/svg-symbols.svg#list');

    const contentElement = component.find('.panel-component-content');
    expect(contentElement).to.have.length(1);
    expect(contentElement.text()).to.equal('Panel 2 content');
  });

  it('should trigger onClick when clicking header', () => {
    const callback = sinon.spy();

    const component = shallow(<Panel onClick={callback} {...panel3} />);
    const headerElement = component.find('.panel-component-header');
    expect(headerElement.prop('onClick')).to.be.a('function');
    headerElement.simulate('click');
    expect(callback.calledOnce).to.equal(true);
    expect(callback.calledWith('3')).to.equal(true);
  });
});

