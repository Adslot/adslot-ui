import _ from 'lodash';
import React from 'react';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import Avatar from '../Avatar';
import HoverDropdownMenu from '.';

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
    const { queryAllByTestId } = render(
      <HoverDropdownMenu hoverComponent={props.hoverComponent} arrowPosition="right">
        something
      </HoverDropdownMenu>
    );

    expect(queryAllByTestId('avatar-wrapper')).toHaveLength(1);
    expect(queryAllByTestId('popover-wrapper')).toHaveLength(1);
  });

  it('should render popover with list of links when `links` is not empty', () => {
    const { getByTestId, queryAllByTestId } = render(
      <HoverDropdownMenu {...props}>
        {_.map(links, (link, idx) => (
          <HoverDropdownMenu.Item key={idx} {...link} />
        ))}
      </HoverDropdownMenu>
    );

    fireEvent.mouseEnter(getByTestId('hover-dropdown-element'));
    expect(queryAllByTestId('popover-wrapper')).toHaveLength(1);
    expect(queryAllByTestId('popover-link-item-wrapper')).toHaveLength(2);
    queryAllByTestId('popover-link-item-wrapper').forEach(item => expect(item).toHaveClass('popover-link-item'));
    expect(queryAllByTestId('popover-link-item-wrapper')[0]).toHaveTextContent('Link 1');
    expect(queryAllByTestId('popover-link-item-wrapper')[1]).toHaveTextContent('Logout');
  });

  it('should trigger popover open or close when mouse enter or leave HoverDropdownMenu.Item', done => {
    const { getByTestId, queryAllByTestId } = render(
      <HoverDropdownMenu {...props}>
        {_.map(links, (link, idx) => (
          <HoverDropdownMenu.Item key={idx} {...link} />
        ))}
      </HoverDropdownMenu>
    );
    fireEvent.mouseEnter(getByTestId('hover-dropdown-element'));
    expect(queryAllByTestId('popover-wrapper')).toHaveLength(1);

    act(() => {
      fireEvent.mouseLeave(getByTestId('hover-dropdown-element'));
    });
    setTimeout(() => {
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);
      fireEvent.mouseEnter(getByTestId('hover-dropdown-element'));
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(1);
      done();
    }, 200);
  });

  it('should not render anything if there is no children', () => {
    const { queryAllByTestId } = render(<HoverDropdownMenu hoverComponent={<div />} />);
    expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);
  });
});
