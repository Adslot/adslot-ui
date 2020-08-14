import React from 'react';
import { render, cleanup } from '@testing-library/react';
import VerticalNav from '.';

afterEach(cleanup);

describe('<VerticalNav />', () => {
  const makeProps = override => ({
    collapsable: true,
    isCollapsed: false,
    onClick: jest.fn(),
    dts: 'test-dts',
    className: 'custom-class',
    ...override,
  });
  const makeMenuItemProps = override => ({
    isActive: false,
    dts: 'menu-item-dts',
    content: jest.fn(),
    onClick: jest.fn(),
    ...override,
  });

  it('should render with props', () => {
    const menuLabel1 = () => <div>Tab 1</div>;
    const menuLabel2 = () => <div>Tab 2</div>;

    const { getByTestId, queryAllByTestId } = render(
      <VerticalNav {...makeProps()}>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1 })}>Content 1</VerticalNav.MenuItem>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2 })}>Content 1</VerticalNav.MenuItem>
      </VerticalNav>
    );

    expect(queryAllByTestId('vertical-nav-wrapper')).toHaveLength(1);
    expect(getByTestId('vertical-nav-wrapper')).toHaveClass('aui--vertical-navigation-component custom-class');
    expect(queryAllByTestId('vertical-nav-menu-item')).toHaveLength(3); // 1 collapse, 2 menu items
    queryAllByTestId('vertical-nav-menu-item').forEach(item =>
      expect(item).toHaveClass('aui--vertical-navigation-component__menu-item')
    );

    expect(queryAllByTestId('vertical-nav-menu-item')).toHaveLength(3); // 1 collapse, 2 menu items
    expect(queryAllByTestId('vertical-nav-menu-item-collapse')).toHaveLength(1);
    expect(queryAllByTestId('vertical-nav-menu-item')[0]).toContainElement(
      getByTestId('vertical-nav-menu-item-collapse')
    );

    expect(queryAllByTestId('vertical-nav-menu-item')[1]).toHaveTextContent('Tab 1');
    expect(queryAllByTestId('vertical-nav-menu-item')[2]).toHaveTextContent('Tab 2');

    expect(queryAllByTestId('vertical-nav-menu-item-collapse-icon')).toHaveLength(1);
    expect(getByTestId('vertical-nav-menu-item-collapse')).toContainElement(
      getByTestId('vertical-nav-menu-item-collapse-icon')
    );
  });

  it('should dispaly warnings if child element does not have `content` prop', () => {
    console.warn = jest.fn();
    const { queryAllByTestId } = render(
      <VerticalNav {...makeProps()}>
        <div>Some random element</div>
      </VerticalNav>
    );

    // only renders collapse item
    expect(queryAllByTestId('vertical-nav-menu-item')).toHaveLength(1);
    /* eslint-disable no-console */
    expect(console.warn).toHaveBeenCalledTimes(2);
    expect(console.warn).toHaveBeenLastCalledWith('Navigation does not render MenuItem that have no content prop.');
    /* eslint-enable no-console */
  });

  it('should not render the collapse icon if props.collapsable is false', () => {
    const menuLabel1 = () => <div>Tab 1</div>;
    const menuLabel2 = () => <div>Tab 2</div>;

    const { queryAllByTestId } = render(
      <VerticalNav {...makeProps({ collapsable: false })}>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1 })}>Content 1</VerticalNav.MenuItem>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2 })}>Content 1</VerticalNav.MenuItem>
      </VerticalNav>
    );

    expect(queryAllByTestId('vertical-nav-menu-item-collapse')).toHaveLength(0);
    expect(queryAllByTestId('vertical-nav-menu-item-collapse-icon')).toHaveLength(0);
  });

  it('should only update menu if props.isCollapsed is changed', () => {
    const menuLabel1 = () => <div>Tab 1</div>;
    const menuLabel2 = () => <div>Tab 2</div>;
    const { getByTestId, rerender } = render(
      <VerticalNav {...makeProps()}>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1, isActive: true })}>
          Content 1
        </VerticalNav.MenuItem>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2 })}>Content 2</VerticalNav.MenuItem>
      </VerticalNav>
    );

    expect(getByTestId('vertical-nav-menu')).not.toHaveClass('aui--vertical-navigation-component__menu-is-collapsed');

    rerender(
      <VerticalNav {...makeProps({ isCollapsed: true })}>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1, isActive: true })}>
          Content 1
        </VerticalNav.MenuItem>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2 })}>Content 1</VerticalNav.MenuItem>
      </VerticalNav>
    );
    expect(getByTestId('vertical-nav-menu')).toHaveClass('aui--vertical-navigation-component__menu-is-collapsed');
  });

  it('should render both menu and content if active tab changes', () => {
    const menuLabel1 = () => <div>Tab 1</div>;
    const menuLabel2 = () => <div>Tab 2</div>;
    const { queryAllByLabelText, rerender } = render(
      <VerticalNav {...makeProps()}>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1, isActive: true })}>
          Content 1
        </VerticalNav.MenuItem>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2 })}>Content 2</VerticalNav.MenuItem>
      </VerticalNav>
    );
    expect(queryAllByLabelText('render-menu')[0]).toHaveClass(
      'aui--vertical-navigation-component__menu-item-is-active'
    );
    expect(queryAllByLabelText('render-menu')[1]).not.toHaveClass(
      'aui--vertical-navigation-component__menu-item-is-active'
    );
    expect(queryAllByLabelText('render-content')[0]).toHaveClass(
      'aui--vertical-navigation-component__content-item-is-active'
    );
    expect(queryAllByLabelText('render-content')[1]).not.toHaveClass(
      'aui--vertical-navigation-component__content-item-is-active'
    );

    rerender(
      <VerticalNav {...makeProps()}>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1 })}>Content 1</VerticalNav.MenuItem>
        <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2, isActive: true })}>
          Content 2
        </VerticalNav.MenuItem>
      </VerticalNav>
    );
    expect(queryAllByLabelText('render-menu')[0]).not.toHaveClass(
      'aui--vertical-navigation-component__menu-item-is-active'
    );
    expect(queryAllByLabelText('render-menu')[1]).toHaveClass(
      'aui--vertical-navigation-component__menu-item-is-active'
    );
    expect(queryAllByLabelText('render-content')[0]).not.toHaveClass(
      'aui--vertical-navigation-component__content-item-is-active'
    );
    expect(queryAllByLabelText('render-content')[1]).toHaveClass(
      'aui--vertical-navigation-component__content-item-is-active'
    );
  });
});
