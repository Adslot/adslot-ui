import React from 'react';
import { render, screen, user } from 'testing';
import Nav, { NavItem } from '.';

describe('<NavItem />', () => {
  it('should render with default props', () => {
    const view = render(<NavItem activeKey={0} eventKey={0} />);

    expect(screen.getByTestId('nav-item-component')).toBeInTheDocument();
    expect(screen.getByTestId('nav-item-component')).toHaveAttribute('role', 'presentation');
    expect(screen.getByTestId('nav-item-component')).toHaveClass('aui--nav-item');
    expect(screen.getByTestId('nav-item-component')).toHaveClass('active');
    expect(screen.queryByTestId('nav-item-anchor')).not.toBeInTheDocument();

    view.rerender(<NavItem activeKey={1} eventKey={0} />);
    expect(screen.getByTestId('nav-item-component')).not.toHaveClass('active');
  });

  it('should render the custom className', () => {
    render(<NavItem activeKey={0} eventKey={0} className="sample-classname" />);
    expect(screen.getByTestId('nav-item-component')).toBeInTheDocument();
    expect(screen.getByTestId('nav-item-component')).toHaveClass('sample-classname');
  });

  it('should render an anchor element when given `href`', () => {
    render(<NavItem activeKey={0} eventKey={0} href="#" />);
    expect(screen.getByTestId('nav-item-component')).toBeInTheDocument();
    expect(screen.getByTestId('nav-item-anchor')).toBeInTheDocument();
    expect(screen.getByTestId('nav-item-component')).toContainElement(screen.getByTestId('nav-item-anchor'));
    expect(screen.getByTestId('nav-item-anchor')).toHaveAttribute('href', '#');
    expect(screen.getByTestId('nav-item-anchor')).toHaveAttribute('role', 'button');
  });

  it('should trigger `setActiveKey` and `onSelect` when clicking the nav item', async () => {
    const onSelect = jest.fn();
    render(<NavItem activeKey={0} eventKey={'event-key'} onSelect={onSelect} />);
    expect(screen.getByTestId('nav-item-component')).toBeInTheDocument();
    await user.click(screen.getByTestId('nav-item-component'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('event-key');
  });

  it('should render disabled nav item', async () => {
    const onSelect = jest.fn();
    const setActiveKey = jest.fn();
    const view = render(
      <NavItem activeKey={0} eventKey={0} disabled onSelect={onSelect} setActiveKey={setActiveKey} />
    );

    expect(screen.getByTestId('nav-item-component')).toBeInTheDocument();
    expect(screen.getByTestId('nav-item-component')).toHaveClass('disabled');

    await user.click(screen.getByTestId('nav-item-component'));
    expect(setActiveKey).toHaveBeenCalledTimes(0);
    expect(onSelect).toHaveBeenCalledTimes(0);

    view.rerender(<NavItem activeKey={0} eventKey={0} disabled href="#" />);
    expect(screen.getByTestId('nav-item-component')).toBeInTheDocument();
    expect(screen.getByTestId('nav-item-component')).toHaveClass('disabled');

    await user.click(screen.getByTestId('nav-item-component'));
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
    render(<Nav {...props} />);

    expect(screen.getByTestId('nav-component-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('nav-component')).toBeInTheDocument();
    expect(screen.getByTestId('nav-component')).toHaveClass('aui--nav');
    expect(screen.getByTestId('nav-component')).toHaveClass('nav-borderless');
    expect(screen.getByTestId('nav-component')).toHaveClass('bottom-bar');
    expect(screen.getByTestId('nav-component')).not.toHaveClass('stacked');
  });

  it('should render the position of the bar as expected', () => {
    const view = render(<Nav {...props} barPosition="top" />);

    expect(screen.getByTestId('nav-component')).toBeInTheDocument();
    expect(screen.getByTestId('nav-component')).not.toHaveClass('bottom-bar');
    expect(screen.getByTestId('nav-component')).toHaveClass('top-bar');

    view.rerender(<Nav {...props} barPosition="none" />);
    expect(screen.getByTestId('nav-component')).not.toHaveClass('bottom-bar');
    expect(screen.getByTestId('nav-component')).not.toHaveClass('top-bar');
    expect(screen.getByTestId('nav-component')).toHaveClass('none-bar');
  });

  it('should render the vertical stacked nav', () => {
    render(<Nav {...props} stacked />);
    expect(screen.getByTestId('nav-component')).toBeInTheDocument();
    expect(screen.getByTestId('nav-component')).toHaveClass('stacked');
  });

  it('should render the custom className', () => {
    render(<Nav {...props} className="sample-classname" />);
    expect(screen.getByTestId('nav-component')).toBeInTheDocument();
    expect(screen.getByTestId('nav-component')).toHaveClass('sample-classname');
  });

  it('should add dts the Nav', () => {
    render(<Nav {...props} dts="sample-dts" />);
    expect(screen.getByTestId('nav-component')).toBeInTheDocument();
    expect(screen.getByTestId('nav-component-wrapper')).toHaveAttribute('data-test-selector', 'sample-dts');
  });

  it('should render children as expected', async () => {
    const onSelect = jest.fn();
    render(
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

    expect(screen.getByTestId('nav-component-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('nav-component')).toBeInTheDocument();
    expect(screen.getAllByTestId('nav-item-component')).toHaveLength(3);

    await user.click(screen.getByText('Reports'));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
