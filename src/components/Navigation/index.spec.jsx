import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navigation from '.';

afterEach(cleanup);

describe('<Navigation />', () => {
  let props;

  beforeEach(() => {
    props = {
      bsStyle: 'pills',
      barPosition: 'bottom',
    };
  });

  it('should render with props', () => {
    const { getByTestId, queryAllByTestId } = render(
      <Navigation {...props}>
        <NavItem>test</NavItem>
      </Navigation>
    );

    expect(queryAllByTestId('navigation-wrapper')).toHaveLength(1);
    expect(getByTestId('navigation-wrapper')).toHaveClass('bottom-bar');
    expect(getByTestId('navigation-wrapper')).toHaveClass('nav-borderless');
  });
});
