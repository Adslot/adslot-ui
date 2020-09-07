import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Nav, { NavItem } from '.';

afterEach(cleanup);

describe('<NavItem />', () => {
  it('should render with default props', () => {
    const { getByTestId, queryAllByTestId, rerender } = render(<NavItem activeKey={0} eventKey={0} />);

    expect(queryAllByTestId('nav-item-component')).toHaveLength(1);
    expect(getByTestId('nav-item-component')).toHaveAttribute('role', 'presentation');
    expect(getByTestId('nav-item-component')).toHaveClass('aui--nav-item');
    expect(getByTestId('nav-item-component')).toHaveClass('active');
    expect(queryAllByTestId('nav-item-anchor')).toHaveLength(0);

    rerender(<NavItem activeKey={1} eventKey={0} />);
    expect(getByTestId('nav-item-component')).not.toHaveClass('active');
  });

  it('should render the custom className', () => {
    const { getByTestId, queryAllByTestId } = render(
      <NavItem activeKey={0} eventKey={0} className="sample-classname" />
    );
    expect(queryAllByTestId('nav-item-component')).toHaveLength(1);
    expect(getByTestId('nav-item-component')).toHaveClass('sample-classname');
  });

  it('should render the custom className', () => {
    const { getByTestId, queryAllByTestId } = render(
      <NavItem activeKey={0} eventKey={0} className="sample-classname" />
    );
    expect(queryAllByTestId('nav-item-component')).toHaveLength(1);
    expect(getByTestId('nav-item-component')).toHaveClass('sample-classname');
  });

  it('should render an anchor element when given `href`', () => {
    const { getByTestId, queryAllByTestId } = render(<NavItem activeKey={0} eventKey={0} href="#" />);
    expect(queryAllByTestId('nav-item-component')).toHaveLength(1);
    expect(queryAllByTestId('nav-item-anchor')).toHaveLength(1);
    expect(getByTestId('nav-item-component')).toContainElement(getByTestId('nav-item-anchor'));
    expect(getByTestId('nav-item-anchor')).toHaveAttribute('href', '#');
    expect(getByTestId('nav-item-anchor')).toHaveAttribute('role', 'button');
  });

  it('should trigger `setActiveKey` and `onSelect` when clicking the nav item', () => {
    const setActiveKey = jest.fn();
    const onSelect = jest.fn();
    const { getByTestId, queryAllByTestId } = render(
      <NavItem activeKey={0} eventKey={'event-key'} setActiveKey={setActiveKey} onSelect={onSelect} />
    );
    expect(queryAllByTestId('nav-item-component')).toHaveLength(1);
    fireEvent.click(getByTestId('nav-item-component'));

    expect(setActiveKey).toHaveBeenCalledTimes(1);
    expect(setActiveKey).toHaveBeenCalledWith('event-key');

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('event-key');
  });

  it('should render disabled nav item', () => {
    const onSelect = jest.fn();
    const setActiveKey = jest.fn();
    const { getByTestId, queryAllByTestId, rerender } = render(
      <NavItem activeKey={0} eventKey={0} disabled onSelect={onSelect} setActiveKey={setActiveKey} />
    );

    expect(queryAllByTestId('nav-item-component')).toHaveLength(1);
    expect(getByTestId('nav-item-component')).toHaveClass('disabled');

    fireEvent.click(getByTestId('nav-item-component'));
    expect(setActiveKey).toHaveBeenCalledTimes(0);
    expect(onSelect).toHaveBeenCalledTimes(0);

    rerender(<NavItem activeKey={0} eventKey={0} disabled href="#" />);
    expect(queryAllByTestId('nav-item-component')).toHaveLength(1);
    expect(getByTestId('nav-item-component')).toHaveClass('disabled');

    fireEvent.click(getByTestId('nav-item-component'));
    expect(setActiveKey).toHaveBeenCalledTimes(0);
    expect(onSelect).toHaveBeenCalledTimes(0);
  });
});

describe('<Nav />', () => {
  let props;

  beforeEach(() => {
    props = {
      barPosition: 'bottom',
      stacked: false,
    };
  });

  it('should render with default props', () => {
    const { getByTestId, queryAllByTestId } = render(<Nav {...props} />);

    expect(queryAllByTestId('nav-component-wrapper')).toHaveLength(1);
    expect(queryAllByTestId('nav-component')).toHaveLength(1);
    expect(getByTestId('nav-component')).toHaveClass('aui--nav');
    expect(getByTestId('nav-component')).toHaveClass('nav-borderless');
    expect(getByTestId('nav-component')).toHaveClass('bottom-bar');
    expect(getByTestId('nav-component')).not.toHaveClass('stacked');
  });

  it('should render the position of the bar as expected', () => {
    const { getByTestId, queryAllByTestId, rerender } = render(<Nav {...props} barPosition="top" />);

    expect(queryAllByTestId('nav-component')).toHaveLength(1);
    expect(getByTestId('nav-component')).not.toHaveClass('bottom-bar');
    expect(getByTestId('nav-component')).toHaveClass('top-bar');

    rerender(<Nav {...props} barPosition="none" />);
    expect(getByTestId('nav-component')).not.toHaveClass('bottom-bar');
    expect(getByTestId('nav-component')).not.toHaveClass('top-bar');
    expect(getByTestId('nav-component')).toHaveClass('none-bar');
  });

  it('should render the vertical stacked nav', () => {
    const { getByTestId, queryAllByTestId } = render(<Nav {...props} stacked />);
    expect(queryAllByTestId('nav-component')).toHaveLength(1);
    expect(getByTestId('nav-component')).toHaveClass('stacked');
  });

  it('should render the custom className', () => {
    const { getByTestId, queryAllByTestId } = render(<Nav {...props} className="sample-classname" />);
    expect(queryAllByTestId('nav-component')).toHaveLength(1);
    expect(getByTestId('nav-component')).toHaveClass('sample-classname');
  });

  it('should render the custom className', () => {
    const { getByTestId, queryAllByTestId } = render(<Nav {...props} className="sample-classname" />);
    expect(queryAllByTestId('nav-component')).toHaveLength(1);
    expect(getByTestId('nav-component')).toHaveClass('sample-classname');
  });

  it('should add dts the Nav', () => {
    const { getByTestId, queryAllByTestId } = render(<Nav {...props} dts="sample-dts" />);
    expect(queryAllByTestId('nav-component')).toHaveLength(1);
    expect(getByTestId('nav-component-wrapper')).toHaveAttribute('data-test-selector', 'sample-dts');
  });

  it('should render children as expected', () => {
    const onSelect = jest.fn();
    const { getByText, queryAllByTestId } = render(
      <Nav activeKey={0} {...props} onSelect={onSelect}>
        <NavItem key={0} eventKey={0}>
          Dashboard
        </NavItem>
        <NavItem key={1} eventKey={1}>
          Reports
        </NavItem>
        <NavItem key={2} eventKey={2} disabled>
          Invoicing
        </NavItem>
      </Nav>
    );

    expect(queryAllByTestId('nav-component-wrapper')).toHaveLength(1);
    expect(queryAllByTestId('nav-component')).toHaveLength(1);
    expect(queryAllByTestId('nav-item-component')).toHaveLength(3);

    expect(getByText('Dashboard')).toHaveClass('active');
    expect(getByText('Reports')).not.toHaveClass('active');
    expect(getByText('Invoicing')).not.toHaveClass('active');

    fireEvent.click(getByText('Reports'));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(1);

    expect(getByText('Dashboard')).not.toHaveClass('active');
    expect(getByText('Reports')).toHaveClass('active');
    expect(getByText('Invoicing')).not.toHaveClass('active');
  });
});
