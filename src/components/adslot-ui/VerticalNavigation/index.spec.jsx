import VerticalNav from 'adslot-ui/VerticalNavigation';
import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

describe('VerticalNavComponent', () => {
  const makeProps = override => ({
    isCollapsed: false,
    onClick: sinon.spy(),
    dts: 'test-dts',
    className: 'custom-class',
    ...override,
  });
  const makeMenuItemProps = override => ({
    isActive: false,
    dts: 'menu-item-dts',
    content: sinon.spy(),
    onClick: sinon.spy(),
    ...override,
  });

  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => sandbox.restore());

  it('should render with props', () => {
    const menuLabel1 = () => <div>Tab 1</div>;
    const menuLabel2 = () => <div>Tab 2</div>;

    const wrapper = mount(
      <VerticalNav {...makeProps()}>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1 })}>Content 1</VerticalNav.MenuItem>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2 })}>Content 1</VerticalNav.MenuItem>
      </VerticalNav>
    );

    expect(wrapper.find('.aui--vertical-navigation-component.custom-class')).to.have.length(1);

    const menuItems = wrapper.find('.aui--vertical-navigation-component__menu-item');
    expect(menuItems).to.have.length(3); // 1 collapse, 2 menu items
    expect(menuItems.at(0).find('.aui--vertical-navigation-component__menu-item-collapse')).to.have.length(1);
    expect(menuItems.at(1).text()).to.equal('Tab 1');
    expect(menuItems.at(2).text()).to.equal('Tab 2');
  });

  it('should dispaly warnings if child element does not have `content` prop', () => {
    sandbox.stub(console, 'warn');
    const wrapper = mount(
      <VerticalNav {...makeProps()}>
        <div>Some random element</div>
      </VerticalNav>
    );

    // only renders collapse item
    expect(wrapper.find('.aui--vertical-navigation-component__menu-item')).to.have.length(1);
    /* eslint-disable no-console */
    expect(console.warn.calledTwice).to.equal(true);
    expect(console.warn.args[0]).to.eql(['Navigation does not render MenuItem that have no content prop.']);
    /* eslint-enable no-console */
  });

  it('should only update menu if props.isCollapsed is changed', () => {
    const menuLabel1 = () => <div>Tab 1</div>;
    const menuLabel2 = () => <div>Tab 2</div>;
    const wrapper = mount(
      <VerticalNav {...makeProps()}>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1, isActive: true })}>
          Content 1
        </VerticalNav.MenuItem>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2 })}>Content 1</VerticalNav.MenuItem>
      </VerticalNav>
    );

    const renderMenuSpy = sandbox.spy(wrapper.instance(), 'renderMenu');
    const renderContentSpy = sandbox.spy(wrapper.instance(), 'renderContent');
    wrapper.setProps({ isCollapsed: true });

    expect(renderMenuSpy.called).to.equal(true);
    expect(renderContentSpy.called).to.equal(false);
  });

  it('should render both menu and content if active tab changes', () => {
    const menuLabel1 = () => <div>Tab 1</div>;
    const menuLabel2 = () => <div>Tab 2</div>;
    const wrapper = mount(
      <VerticalNav {...makeProps()}>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1, isActive: true })}>
          Content 1
        </VerticalNav.MenuItem>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2 })}>Content 1</VerticalNav.MenuItem>
      </VerticalNav>
    );
    const renderMenuSpy = sandbox.spy(wrapper.instance(), 'renderMenu');
    const renderContentSpy = sandbox.spy(wrapper.instance(), 'renderContent');
    wrapper.setProps({
      children: [
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1 })}>Content 1</VerticalNav.MenuItem>,
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2, isActive: true })}>
          Content 1
        </VerticalNav.MenuItem>,
      ],
    });

    expect(renderMenuSpy.called).to.equal(true);
    expect(renderContentSpy.called).to.equal(true);
  });
});
