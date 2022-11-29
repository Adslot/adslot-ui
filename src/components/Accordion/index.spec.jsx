import _ from 'lodash';
import React from 'react';
import { render, screen, user } from 'testing';

import Accordion from '.';
import PanelMocks from '../Panel/mocks';
import { invariant } from '../../lib/utils';

describe('<Accordion />', () => {
  const { panel1, panel2, panel3 } = PanelMocks;

  const makeProps = (override) =>
    _.merge(
      {
        dts: 'my-accordion',
        onPanelClick: jest.fn(),
        defaultActivePanelIds: [],
        maxExpand: 'max',
      },
      override
    );

  it('should render with defaults', () => {
    render(
      <Accordion {...makeProps()}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
      </Accordion>
    );
    expect(screen.getByTestId('card-container-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('card-container-wrapper')).toHaveAttribute('data-test-selector', 'my-accordion');
    expect(screen.getByTestId('card-content-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('card-content-wrapper')).toHaveTextContent('Panel 1');
  });

  it('should have default props', () => {
    render(
      <Accordion {...makeProps()}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
      </Accordion>
    );
    expect(screen.getByTestId('card-container-wrapper')).toMatchSnapshot();
  });

  it('should render with props', () => {
    render(
      <Accordion {...makeProps()}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
        <Accordion.Panel {...panel2}>{panel2.content}</Accordion.Panel>
        <Accordion.Panel {...panel3}>{panel3.content}</Accordion.Panel>
      </Accordion>
    );

    expect(screen.getByTestId('card-content-wrapper')).toBeInTheDocument();
    expect(screen.queryAllByTestId('panel-wrapper')).toHaveLength(3);

    // generate a dts from panel id
    expect(screen.queryAllByTestId('panel-wrapper')[0]).toHaveAttribute('data-test-selector', 'panel-1');
    expect(screen.queryAllByTestId('panel-wrapper')[0]).toHaveTextContent('Panel 1');
    expect(screen.queryAllByTestId('panel-wrapper')[1]).toHaveAttribute('data-test-selector', 'panel-2');
    expect(screen.queryAllByTestId('panel-wrapper')[1]).toHaveTextContent('Panel 2');
    expect(screen.queryAllByTestId('panel-wrapper')[2]).toHaveAttribute('data-test-selector', 'panel-3');
    expect(screen.queryAllByTestId('panel-wrapper')[2]).toHaveTextContent('Panel 3');
  });

  it('should expand or collapse any panels', async () => {
    render(
      <Accordion {...makeProps()}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
        <Accordion.Panel {...panel2}>{panel2.content}</Accordion.Panel>
        <Accordion.Panel {...panel3}>{panel3.content}</Accordion.Panel>
      </Accordion>
    );

    await user.click(screen.queryAllByTestId('panel-header')[0]);
    expect(screen.queryAllByTestId('panel-wrapper')[0]).not.toHaveClass('collapsed');
    await user.click(screen.queryAllByTestId('panel-header')[0]);
    expect(screen.queryAllByTestId('panel-wrapper')[0]).toHaveClass('collapsed');
  });

  it('should expand or collapse any panels with a restriction of `maxExpand`', async () => {
    const panel = (id) => ({
      id,
      title: `Panel ${id}`,
      dts: `panel-${id}`,
      onClick: _.noop,
    });

    render(
      <Accordion {...makeProps({ maxExpand: 1 })}>
        <Accordion.Panel {...panel('1')}>{panel1.content}</Accordion.Panel>
        <Accordion.Panel {...panel('2')}>{panel2.content}</Accordion.Panel>
        <Accordion.Panel {...panel('3')}>{panel3.content}</Accordion.Panel>
      </Accordion>
    );

    await user.click(screen.queryAllByTestId('panel-header')[0]);
    expect(screen.queryAllByTestId('panel-wrapper')[0]).not.toHaveClass('collapsed');
    expect(screen.queryAllByTestId('panel-wrapper')[1]).toHaveClass('collapsed');

    await user.click(screen.queryAllByTestId('panel-header')[1]);
    expect(screen.queryAllByTestId('panel-wrapper')[0]).toHaveClass('collapsed');
    expect(screen.queryAllByTestId('panel-wrapper')[1]).not.toHaveClass('collapsed');
  });

  it('should pass onPanelClick down to panels', async () => {
    const props = makeProps();
    render(
      <Accordion {...props}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
        <Accordion.Panel {...panel2}>{panel2.content}</Accordion.Panel>
        <Accordion.Panel {...panel3}>{panel3.content}</Accordion.Panel>
      </Accordion>
    );
    expect(screen.getAllByTestId('panel-wrapper')).toHaveLength(3);

    await user.click(screen.getAllByTestId('panel-header')[0]);
    expect(props.onPanelClick).toHaveBeenCalledTimes(1);
    expect(props.onPanelClick).toHaveBeenLastCalledWith('1');

    await user.click(screen.getAllByTestId('panel-header')[1]);
    expect(props.onPanelClick).toHaveBeenCalledTimes(2);
    expect(props.onPanelClick).toHaveBeenLastCalledWith('2');

    await user.click(screen.getAllByTestId('panel-header')[2]);
    expect(props.onPanelClick).toHaveBeenCalledTimes(3);
    expect(props.onPanelClick).toHaveBeenLastCalledWith('3');
  });

  it('should respect isCollapsed in Panel children', async () => {
    const props = makeProps();
    delete props.onPanelClick;

    render(
      <Accordion {...props}>
        <Accordion.Panel {...panel1} isCollapsed>
          {panel1.content}
        </Accordion.Panel>
        <Accordion.Panel {...panel2}>{panel2.content}</Accordion.Panel>
        <Accordion.Panel {...panel3}>{panel3.content}</Accordion.Panel>
      </Accordion>
    );
    await user.click(screen.getAllByTestId('panel-header')[0]);
    expect(screen.getAllByTestId('panel-wrapper')[0]).toHaveClass('collapsed');
  });

  it('should throw error if props.maxExpand has invalid value', () => {
    render(
      <Accordion {...makeProps({ maxExpand: -1 })}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
      </Accordion>
    );

    expect(invariant).toHaveBeenCalledTimes(1);
    expect(invariant).toHaveBeenCalledWith(false, "maxExpand must be a positive number or 'max'");
  });

  it('should ignore children that are not an instance of Accordion.Panel', () => {
    render(
      <Accordion {...makeProps()}>
        <div data-testid="should-not-render">test</div>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
      </Accordion>
    );

    expect(screen.queryByTestId('should-not-render')).not.toBeInTheDocument();
  });
});
