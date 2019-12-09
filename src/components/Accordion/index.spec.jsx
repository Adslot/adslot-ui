import _ from 'lodash';
import { Accordion, Card } from 'adslot-ui';
import { mount, shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import PanelMocks from '../Panel/mocks';

describe('AccordionComponent', () => {
  const { panel1, panel2, panel3 } = PanelMocks;

  const makeProps = override =>
    _.merge(
      {
        dts: 'my-accordion',
        onPanelClick: sinon.stub(),
        defaultActivePanelIds: [],
        maxExpand: 'max',
      },
      override
    );

  it('should render with defaults', () => {
    const wrapper = shallow(
      <Accordion {...makeProps()}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
      </Accordion>
    );
    const cardElement = wrapper.find(Card.Content);
    expect(cardElement).to.have.length(1);
    expect(cardElement.children()).to.have.length(1);
  });

  it('should have default props', () => {
    const wrapper = shallow(
      <Accordion {...makeProps()}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
      </Accordion>
    );
    const instance = wrapper.instance();
    expect(instance.props.defaultActivePanelIds).to.eql([]);
    expect(instance.props.maxExpand).to.equal('max');
  });

  it('should render with props', () => {
    const wrapper = shallow(
      <Accordion {...makeProps()}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
        <Accordion.Panel {...panel2}>{panel2.content}</Accordion.Panel>
        <Accordion.Panel {...panel3}>{panel3.content}</Accordion.Panel>
      </Accordion>
    );

    const cardElement = wrapper.find(Card.Content);
    expect(cardElement).to.have.length(1);

    const panelElements = cardElement.find(Accordion.Panel);
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
    const props = makeProps();
    const wrapper = mount(
      <Accordion {...props}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
        <Accordion.Panel {...panel2}>{panel2.content}</Accordion.Panel>
        <Accordion.Panel {...panel3}>{panel3.content}</Accordion.Panel>
      </Accordion>
    );
    const panelElements = wrapper.find(Accordion.Panel);

    panelElements
      .at(0)
      .find('.panel-component-header')
      .simulate('click');
    panelElements
      .at(1)
      .find('.panel-component-header')
      .simulate('click');
    panelElements
      .at(2)
      .find('.panel-component-header')
      .simulate('click');

    expect(props.onPanelClick.callCount).to.equal(3);
    expect(props.onPanelClick.firstCall.calledWith('1')).to.equal(true);
    expect(props.onPanelClick.secondCall.calledWith('2')).to.equal(true);
    expect(props.onPanelClick.thirdCall.calledWith('3')).to.equal(true);
  });

  it('should remove active panel id from active list when clicking on an expanded panel', () => {
    const wrapper = mount(
      <Accordion {...makeProps({ defaultActivePanelIds: ['1'] })}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
        <Accordion.Panel {...panel2}>{panel2.content}</Accordion.Panel>
        <Accordion.Panel {...panel3}>{panel3.content}</Accordion.Panel>
      </Accordion>
    );
    wrapper
      .find(Accordion.Panel)
      .at(0)
      .find('.panel-component-header')
      .simulate('click');

    expect(wrapper.state()).to.eql({ activePanelIds: [] });
  });

  it('should replace active panel id when props.maxExpand is less than current opened Panels count', () => {
    const wrapper = mount(
      <Accordion {...makeProps({ defaultActivePanelIds: ['1', '2'], maxExpand: 1 })}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
        <Accordion.Panel {...panel2}>{panel2.content}</Accordion.Panel>
        <Accordion.Panel {...panel3}>{panel3.content}</Accordion.Panel>
      </Accordion>
    );
    wrapper
      .find(Accordion.Panel)
      .at(1)
      .find('.panel-component-header')
      .simulate('click');

    expect(wrapper.state()).to.eql({ activePanelIds: ['2'] });
  });

  it('should respect isCollapsed in Panel children', () => {
    const props = makeProps();
    delete props.onPanelClick;

    const wrapper = mount(
      <Accordion {...props}>
        <Accordion.Panel {...panel1} isCollapsed>
          {panel1.content}
        </Accordion.Panel>
        <Accordion.Panel {...panel2}>{panel2.content}</Accordion.Panel>
        <Accordion.Panel {...panel3}>{panel3.content}</Accordion.Panel>
      </Accordion>
    );
    wrapper
      .find(Accordion.Panel)
      .at(0)
      .find('.panel-component-header')
      .simulate('click');

    expect(
      wrapper
        .find(Accordion.Panel)
        .at(0)
        .prop('isCollapsed')
    ).to.equal(true);
  });

  it('should throw error if props.maxExpand has invalid value', () => {
    const wrapper = shallow(
      <Accordion {...makeProps()}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
      </Accordion>
    );

    try {
      wrapper.setProps({ maxExpand: -1 });
      wrapper.instance().validateProps();
      throw new Error('should not reach');
    } catch (err) {
      expect(err.message).to.equal("maxExpand must be a positive number or 'max'");
    }
  });

  it('should ignore children that are not an instance of Accordion.Panel', () => {
    const wrapper = mount(
      <Accordion {...makeProps()}>
        <div className="should-not-render">test</div>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
      </Accordion>
    );

    expect(wrapper.find('.should-not-render')).to.have.length(0);
  });
});
