import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Tabs from '.';
import Tab from '../Tab';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => console.error.mockRestore());
afterEach(cleanup);

describe('<Tabs />', () => {
  it('should render with props', () => {
    const { queryAllByTestId } = render(
      <Tabs defaultActiveKey="first" id="test">
        <Tab eventKey="first" title="First">
          Tab1
        </Tab>
        <Tab eventKey="last" title="Second" disabled>
          Tab2
        </Tab>
      </Tabs>
    );

    expect(queryAllByTestId('tablist-a-tag')).toHaveLength(2);
    expect(queryAllByTestId('tablist-a-tag')[1]).toHaveAttribute('style', 'pointer-events: none;');

    expect(queryAllByTestId('tablist-item')[0]).toHaveClass('active');
    expect(queryAllByTestId('tablist-item')[1]).toHaveClass('disabled');

    expect(queryAllByTestId('tab-wrapper')).toHaveLength(2);

    fireEvent.click(queryAllByTestId('tablist-a-tag')[1]);

    expect(queryAllByTestId('tablist-a-tag')[0]).toHaveAttribute('aria-selected', 'false');
    expect(queryAllByTestId('tablist-a-tag')[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('should work as controlled', () => {
    const onTabSelect = jest.fn();
    const { queryAllByTestId } = render(
      <Tabs activeKey="first" onSelect={onTabSelect} id="test">
        <Tab eventKey="first" title="Fist">
          Tab1
        </Tab>
        <Tab eventKey="last" title="Second">
          Tab2
        </Tab>
        <div>other</div>
      </Tabs>
    );
    expect(queryAllByTestId('tablist-a-tag')).toHaveLength(2);
    fireEvent.click(queryAllByTestId('tablist-a-tag')[1]);

    expect(onTabSelect).toHaveBeenCalledTimes(1);
    expect(onTabSelect).toHaveBeenCalledWith('last');
  });

  it('should not crash when child returns null', () => {
    const { queryAllByTestId } = render(
      <Tabs defaultActiveKey="first" id="test">
        <Tab eventKey="first" title="Fist">
          Tab1
        </Tab>
        {null}
      </Tabs>
    );
    expect(queryAllByTestId('tablist-wrapper')).toHaveLength(1);
  });

  it('should throw error if child of <Tabs /> is not <Tab />', () => {
    console.error = jest.fn();
    render(
      <Tabs id="error">
        <div />
      </Tabs>
    );

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('<Tabs /> children must be instances of <Tab />');
  });
});
