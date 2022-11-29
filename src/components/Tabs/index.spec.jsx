import React from 'react';
import { render, screen, user } from 'testing';
import Tabs from '.';
import Tab from '../Tab';

describe('<Tabs />', () => {
  it('should render with props', async () => {
    render(
      <Tabs defaultActiveKey="last" id="test">
        <Tab eventKey="first" title="First">
          Tab1
        </Tab>
        <Tab eventKey="last" title="Second" disabled>
          Tab2
        </Tab>
      </Tabs>
    );

    expect(screen.getAllByTestId('tablist-a-tag')).toHaveLength(2);
    expect(screen.getAllByTestId('tablist-a-tag')[0]).not.toHaveStyle('pointer-events: none;');
    expect(screen.getAllByTestId('tablist-a-tag')[1]).toHaveStyle('pointer-events: none;');

    expect(screen.getAllByTestId('tablist-item')[0]).not.toHaveClass('disabled');
    expect(screen.getAllByTestId('tablist-item')[1]).toHaveClass('disabled');
    expect(screen.getAllByTestId('tablist-item')[0]).not.toHaveClass('active');
    expect(screen.getAllByTestId('tablist-item')[1]).toHaveClass('active');

    expect(screen.getAllByTestId('tab-wrapper')).toHaveLength(2);

    await user.click(screen.getAllByTestId('tablist-a-tag')[0]);

    expect(screen.getAllByTestId('tablist-a-tag')[0]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getAllByTestId('tablist-a-tag')[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('should work as controlled', async () => {
    const onTabSelect = jest.fn();
    render(
      <Tabs activeKey="first" onSelect={onTabSelect} id="test">
        <Tab eventKey="first" title="Fist">
          Tab1
        </Tab>
        <Tab eventKey="last" title="Second">
          Tab2
        </Tab>
      </Tabs>
    );
    expect(screen.getAllByTestId('tablist-a-tag')).toHaveLength(2);
    await user.click(screen.getAllByTestId('tablist-a-tag')[1]);

    expect(onTabSelect).toHaveBeenCalledTimes(1);
    expect(onTabSelect).toHaveBeenCalledWith('last');
  });

  it('should switch tabs given a `defaultActiveKey`', async () => {
    render(
      <Tabs defaultActiveKey="first" onSelect={jest.fn()} id="test">
        <Tab eventKey="first" title="Fist">
          Tab1
        </Tab>
        <Tab eventKey="last" title="Second">
          Tab2
        </Tab>
      </Tabs>
    );

    expect(screen.getAllByTestId('tablist-item')[0]).toHaveClass('active');
    expect(screen.getAllByTestId('tablist-item')[1]).not.toHaveClass('active');
    expect(screen.getAllByTestId('tablist-a-tag')).toHaveLength(2);

    await user.click(screen.getAllByTestId('tablist-a-tag')[1]);

    expect(screen.getAllByTestId('tablist-item')[0]).not.toHaveClass('active');
    expect(screen.getAllByTestId('tablist-item')[1]).toHaveClass('active');

    await user.click(screen.getAllByTestId('tablist-a-tag')[1]);
    expect(screen.getAllByTestId('tablist-item')[0]).not.toHaveClass('active');
    expect(screen.getAllByTestId('tablist-item')[1]).toHaveClass('active');
  });

  it('should not crash when child returns null', () => {
    render(
      <Tabs defaultActiveKey="first" id="test">
        <Tab eventKey="first" title="Fist">
          Tab1
        </Tab>
        {null}
      </Tabs>
    );
    expect(screen.getByTestId('tablist-wrapper')).toBeInTheDocument();
  });

  it('should log error if child of <Tabs /> is not <Tab />', () => {
    jest.spyOn(console, 'error').mockReturnValue();
    render(
      <Tabs id="error">
        <div />
      </Tabs>
    );

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('<Tabs /> children must be instances of <Tab />');
  });
});
