import _ from 'lodash';
import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { Accordion, Panel } from 'adslot-ui';
import Card from 'alexandria/Card';
import PanelMocks from 'adslot-ui/Panel/mocks';

describe('AccordionComponent', () => {
  const {
    panel1,
    panel2,
    panel3,
  } = PanelMocks;

  it('should render with defaults', () => {
    const component = shallow(<Accordion panels={[]} onPanelClick={_.noop} />);
    const cardElement = component.find(Card.Content);
    expect(cardElement).to.have.length(1);
    expect(cardElement.children()).to.have.length(0);
  });

  it('should render with props', () => {
    const panels = [panel1, panel2, panel3];
    const component = shallow(<Accordion panels={panels} onPanelClick={_.noop} dts="my-accordian" />);

    const cardElement = component.find(Card.Content);
    expect(cardElement).to.have.length(1);

    const panelElements = cardElement.find(Panel);
    expect(panelElements).to.have.length(3);

    const panelElement1 = panelElements.at(0);
    expect(panelElement1.prop('id')).to.equal('1');
    expect(panelElement1.prop('onClick')).to.be.a('function');

    const panelElement2 = panelElements.at(1);
    expect(panelElement2.prop('id')).to.equal('2');
    expect(panelElement2.prop('onClick')).to.be.a('function');

    const panelElement3 = panelElements.at(2);
    expect(panelElement3.prop('id')).to.equal('3');
    expect(panelElement3.prop('onClick')).to.be.a('function');
    expect(panelElement3.prop('dts')).to.equal('panel-3'); // should generate a dts from panel id
  });

  it('should pass onPanelClick down to panels', () => {
    const callback = sinon.spy();
    const panels = [panel1, panel2, panel3];
    const component = mount(<Accordion panels={panels} onPanelClick={callback} />);
    const panelElements = component.find(Panel);

    panelElements.at(0).childAt(0).simulate('click');
    panelElements.at(1).childAt(0).simulate('click');
    panelElements.at(2).childAt(0).simulate('click');

    expect(callback.calledThrice).to.equal(true);
    expect(callback.firstCall.calledWith('1'));
    expect(callback.secondCall.calledWith('2'));
    expect(callback.thirdCall.calledWith('3'));
  });
});
