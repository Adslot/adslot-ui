import React from 'react';
import { render, screen } from 'testing';
import VerticalNav from '.';

const makeProps = (override) => ({
  collapsable: true,
  isCollapsed: false,
  onClick: jest.fn(),
  dts: 'test-dts',
  className: 'custom-class',
  ...override,
});
const makeMenuItemProps = (override) => ({
  isActive: false,
  dts: 'menu-item-dts',
  content: jest.fn(),
  onClick: jest.fn(),
  ...override,
});

it('should render with props', () => {
  const menuLabel1 = () => <div>Tab 1</div>;
  const menuLabel2 = () => <div>Tab 2</div>;

  render(
    <VerticalNav {...makeProps()}>
      <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1 })}>Content 1</VerticalNav.MenuItem>
      <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2 })}>Content 1</VerticalNav.MenuItem>
    </VerticalNav>
  );

  expect(screen.getByTestId('vertical-nav-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('vertical-nav-wrapper')).toHaveClass('aui--vertical-navigation-component custom-class');
  expect(screen.getAllByTestId('vertical-nav-menu-item')).toHaveLength(3); // 1 collapse, 2 menu items
  screen
    .getAllByTestId('vertical-nav-menu-item')
    .forEach((item) => expect(item).toHaveClass('aui--vertical-navigation-component__menu-item'));

  expect(screen.getAllByTestId('vertical-nav-menu-item')).toHaveLength(3); // 1 collapse, 2 menu items
  expect(screen.getByTestId('vertical-nav-menu-item-collapse')).toBeInTheDocument();
  expect(screen.getAllByTestId('vertical-nav-menu-item')[0]).toContainElement(
    screen.getByTestId('vertical-nav-menu-item-collapse')
  );

  expect(screen.getAllByTestId('vertical-nav-menu-item')[1]).toHaveTextContent('Tab 1');
  expect(screen.getAllByTestId('vertical-nav-menu-item')[2]).toHaveTextContent('Tab 2');

  expect(screen.getByTestId('vertical-nav-menu-item-collapse-icon')).toBeInTheDocument();
  expect(screen.getByTestId('vertical-nav-menu-item-collapse')).toContainElement(
    screen.getByTestId('vertical-nav-menu-item-collapse-icon')
  );
});

it('should dispaly warnings if child element does not have `content` prop', () => {
  jest.spyOn(console, 'warn').mockReturnValue();
  render(
    <VerticalNav {...makeProps()}>
      <div>Some random element</div>
    </VerticalNav>
  );

  // only renders collapse item
  expect(screen.getByTestId('vertical-nav-menu-item')).toBeInTheDocument();
  /* eslint-disable no-console */
  expect(console.warn).toHaveBeenCalledTimes(2);
  expect(console.warn).toHaveBeenLastCalledWith('Navigation does not render MenuItem that have no content prop.');
  /* eslint-enable no-console */
});

it('should not render the collapse icon if props.collapsable is false', () => {
  const menuLabel1 = () => <div>Tab 1</div>;
  const menuLabel2 = () => <div>Tab 2</div>;

  render(
    <VerticalNav {...makeProps({ collapsable: false })}>
      <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1 })}>Content 1</VerticalNav.MenuItem>
      <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2 })}>Content 1</VerticalNav.MenuItem>
    </VerticalNav>
  );

  expect(screen.queryByTestId('vertical-nav-menu-item-collapse')).not.toBeInTheDocument();
  expect(screen.queryByTestId('vertical-nav-menu-item-collapse-icon')).not.toBeInTheDocument();
});

it('should only update menu if props.isCollapsed is changed', () => {
  const menuLabel1 = () => <div>Tab 1</div>;
  const menuLabel2 = () => <div>Tab 2</div>;
  const view = render(
    <VerticalNav {...makeProps()}>
      <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1, isActive: true })}>
        Content 1
      </VerticalNav.MenuItem>
      <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2 })}>Content 2</VerticalNav.MenuItem>
    </VerticalNav>
  );

  expect(screen.getByTestId('vertical-nav-menu')).not.toHaveClass(
    'aui--vertical-navigation-component__menu-is-collapsed'
  );

  view.rerender(
    <VerticalNav {...makeProps({ isCollapsed: true })}>
      <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1, isActive: true })}>
        Content 1
      </VerticalNav.MenuItem>
      <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2 })}>Content 1</VerticalNav.MenuItem>
    </VerticalNav>
  );
  expect(screen.getByTestId('vertical-nav-menu')).toHaveClass('aui--vertical-navigation-component__menu-is-collapsed');
});

it('should render both menu and content if active tab changes', () => {
  const menuLabel1 = () => <div>Tab 1</div>;
  const menuLabel2 = () => <div>Tab 2</div>;
  const view = render(
    <VerticalNav {...makeProps()}>
      <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1, isActive: true })}>
        Content 1
      </VerticalNav.MenuItem>
      <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2 })}>Content 2</VerticalNav.MenuItem>
    </VerticalNav>
  );
  expect(screen.getAllByLabelText('render-menu')[0]).toHaveClass(
    'aui--vertical-navigation-component__menu-item-is-active'
  );
  expect(screen.getAllByLabelText('render-menu')[1]).not.toHaveClass(
    'aui--vertical-navigation-component__menu-item-is-active'
  );
  expect(screen.getAllByLabelText('render-content')[0]).toHaveClass(
    'aui--vertical-navigation-component__content-item-is-active'
  );
  expect(screen.getAllByLabelText('render-content')[1]).not.toHaveClass(
    'aui--vertical-navigation-component__content-item-is-active'
  );

  view.rerender(
    <VerticalNav {...makeProps()}>
      <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel1 })}>Content 1</VerticalNav.MenuItem>
      <VerticalNav.MenuItem {...makeMenuItemProps({ content: menuLabel2, isActive: true })}>
        Content 2
      </VerticalNav.MenuItem>
    </VerticalNav>
  );
  expect(screen.getAllByLabelText('render-menu')[0]).not.toHaveClass(
    'aui--vertical-navigation-component__menu-item-is-active'
  );
  expect(screen.getAllByLabelText('render-menu')[1]).toHaveClass(
    'aui--vertical-navigation-component__menu-item-is-active'
  );
  expect(screen.getAllByLabelText('render-content')[0]).not.toHaveClass(
    'aui--vertical-navigation-component__content-item-is-active'
  );
  expect(screen.getAllByLabelText('render-content')[1]).toHaveClass(
    'aui--vertical-navigation-component__content-item-is-active'
  );
});
