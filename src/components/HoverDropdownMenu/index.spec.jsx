import _ from 'lodash';
import React from 'react';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import Avatar from '../Avatar';
import HoverDropdownMenu from '.';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});
afterEach(cleanup);

describe('<HoverDropdownMenu />', () => {
  let links = [];
  let props = {};

  beforeEach(() => {
    links = [
      {
        title: 'Link 1',
        url: 'www.some.url.com',
        target: '_self',
        isEnabled: true,
      },
      {
        title: 'Logout',
        url: 'http://www.google.com',
        target: '_self',
        isEnabled: true,
      },
    ];

    props = {
      headerText: 'test header',
      hoverComponent: <Avatar givenName="John" surname="Smith" tooltip="test tooltip" />,
      onLinkClick: jest.fn(),
    };
  });

  it('should render with default props', () => {
    const { queryByTestId } = render(
      <HoverDropdownMenu hoverComponent={props.hoverComponent} arrowPosition="right">
        something
      </HoverDropdownMenu>
    );

    expect(queryByTestId('avatar-wrapper')).toBeInTheDocument();
    expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
  });

  it('should render popover with list of links when `links` is not empty', async () => {
    console.error = jest.fn();
    const { getByTestId, queryByTestId, queryAllByTestId } = render(
      <HoverDropdownMenu {...props}>
        {_.map(links, (link, idx) => (
          <HoverDropdownMenu.Item key={idx} {...link} />
        ))}
      </HoverDropdownMenu>
    );

    act(() => {
      fireEvent.mouseEnter(getByTestId('hover-dropdown-element'));
      jest.runAllTimers();
    });

    expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
    expect(queryAllByTestId('popover-link-item-wrapper')).toHaveLength(2);
    queryAllByTestId('popover-link-item-wrapper').forEach(item => expect(item).toHaveClass('popover-link-item'));
    expect(queryAllByTestId('popover-link-item-wrapper')[0]).toHaveTextContent('Link 1');
    expect(queryAllByTestId('popover-link-item-wrapper')[1]).toHaveTextContent('Logout');
  });

  it('should trigger popover open or close when mouse enter or leave HoverDropdownMenu ref element', () => {
    console.error = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <HoverDropdownMenu {...props}>
        {_.map(links, (link, idx) => (
          <HoverDropdownMenu.Item key={idx} {...link} />
        ))}
      </HoverDropdownMenu>
    );
    act(() => {
      fireEvent.mouseEnter(getByTestId('hover-dropdown-element'));
      jest.runAllTimers();
    });
    expect(queryByTestId('popover-wrapper')).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(getByTestId('hover-dropdown-element'));
      jest.runAllTimers();
    });
    expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();

    act(() => {
      fireEvent.mouseEnter(getByTestId('hover-dropdown-element'));
      jest.runAllTimers();
    });
    expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
  });

  it('should trigger popover open or close when mouse enter or leave HoverDropdownMenu items', () => {
    const { getByTestId, queryByTestId, queryAllByTestId } = render(
      <HoverDropdownMenu {...props}>
        {_.map(links, (link, idx) => (
          <HoverDropdownMenu.Item key={idx} {...link} />
        ))}
      </HoverDropdownMenu>
    );

    act(() => {
      fireEvent.mouseEnter(getByTestId('hover-dropdown-element'));
      jest.runAllTimers();
    });
    expect(queryByTestId('popover-wrapper')).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(getByTestId('hover-dropdown-element'));
      fireEvent.mouseEnter(getByTestId('popover-wrapper'));
      jest.advanceTimersByTime(50);
    });
    expect(queryByTestId('popover-wrapper')).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(getByTestId('popover-wrapper'));
      fireEvent.mouseEnter(getByTestId('popover-title'));
      jest.advanceTimersByTime(50);
    });
    expect(queryByTestId('popover-wrapper')).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(getByTestId('popover-title'));
      fireEvent.mouseEnter(queryAllByTestId('popover-link-item-wrapper')[0]);
      jest.advanceTimersByTime(49);
    });
    expect(queryByTestId('popover-wrapper')).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(getByTestId('popover-wrapper'));
      jest.runAllTimers();
    });

    expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
  });

  it('should not render anything if there is no children', () => {
    const { queryByTestId } = render(<HoverDropdownMenu hoverComponent={<div />} />);
    expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
  });
});
