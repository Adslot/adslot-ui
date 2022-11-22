import React from 'react';
import { render, screen } from 'testing';
import Tab from '.';

it('should render with props not show Tab', () => {
  render(
    <Tab eventKey="first" show={false} title="First">
      hi
    </Tab>
  );

  expect(screen.getByTestId('tab-wrapper')).toHaveClass('tab-pane fade');
});

it('should render with props and show Tab', () => {
  render(
    <Tab eventKey="first" show title="First">
      hi
    </Tab>
  );

  expect(screen.getByTestId('tab-wrapper')).toHaveClass('tab-pane fade active in');
});
