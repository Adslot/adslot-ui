import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Tab from '.';

afterEach(cleanup);

describe('<Tab />', () => {
  it('should render with props not show Tab', () => {
    const { getByTestId } = render(
      <Tab eventKey="first" show={false} title="First">
        hi
      </Tab>
    );

    expect(getByTestId('tab-wrapper')).toHaveClass('tab-pane fade');
  });

  it('should render with props and show Tab', () => {
    const { getByTestId } = render(
      <Tab eventKey="first" show title="First">
        hi
      </Tab>
    );

    expect(getByTestId('tab-wrapper')).toHaveClass('tab-pane fade active in');
  });
});
