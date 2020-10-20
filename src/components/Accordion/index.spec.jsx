import _ from 'lodash';
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Accordion from '.';
import PanelMocks from '../Panel/mocks';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(_.noop);
});

afterEach(() => console.error.mockRestore());
afterEach(cleanup);

describe('<Accordion />', () => {
  const { panel1, panel2, panel3 } = PanelMocks;

  const makeProps = override =>
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
    const { getByTestId, queryAllByTestId } = render(
      <Accordion {...makeProps()}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
      </Accordion>
    );
    expect(queryAllByTestId('card-container-wrapper')).toHaveLength(1);
    expect(getByTestId('card-container-wrapper')).toHaveAttribute('data-test-selector', 'my-accordion');
    expect(queryAllByTestId('card-content-wrapper')).toHaveLength(1);
    expect(getByTestId('card-content-wrapper')).toHaveTextContent('Panel 1');
  });

  it('should have default props', () => {
    const { getByTestId } = render(
      <Accordion {...makeProps()}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
      </Accordion>
    );
    expect(getByTestId('card-container-wrapper')).toMatchSnapshot();
  });

  it('should render with props', () => {
    const { queryAllByTestId } = render(
      <Accordion {...makeProps()}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
        <Accordion.Panel {...panel2}>{panel2.content}</Accordion.Panel>
        <Accordion.Panel {...panel3}>{panel3.content}</Accordion.Panel>
      </Accordion>
    );

    expect(queryAllByTestId('card-content-wrapper')).toHaveLength(1);
    expect(queryAllByTestId('panel-wrapper')).toHaveLength(3);

    // generate a dts from panel id
    expect(queryAllByTestId('panel-wrapper')[0]).toHaveAttribute('data-test-selector', 'panel-1');
    expect(queryAllByTestId('panel-wrapper')[0]).toHaveTextContent('Panel 1');
    expect(queryAllByTestId('panel-wrapper')[1]).toHaveAttribute('data-test-selector', 'panel-2');
    expect(queryAllByTestId('panel-wrapper')[1]).toHaveTextContent('Panel 2');
    expect(queryAllByTestId('panel-wrapper')[2]).toHaveAttribute('data-test-selector', 'panel-3');
    expect(queryAllByTestId('panel-wrapper')[2]).toHaveTextContent('Panel 3');
  });

  it('should expand or collapse any panels', () => {
    const { queryAllByTestId } = render(
      <Accordion {...makeProps()}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
        <Accordion.Panel {...panel2}>{panel2.content}</Accordion.Panel>
        <Accordion.Panel {...panel3}>{panel3.content}</Accordion.Panel>
      </Accordion>
    );

    fireEvent.click(queryAllByTestId('panel-header')[0]);
    expect(queryAllByTestId('panel-wrapper')[0]).not.toHaveClass('collapsed');
    fireEvent.click(queryAllByTestId('panel-header')[0]);
    expect(queryAllByTestId('panel-wrapper')[0]).toHaveClass('collapsed');
  });

  it('should expand or collapse any panels with a restriction of `maxExpand`', () => {
    const panel = id => ({
      id,
      title: `Panel ${id}`,
      dts: `panel-${id}`,
      onClick: _.noop,
    });

    const { queryAllByTestId } = render(
      <Accordion {...makeProps({ maxExpand: 1 })}>
        <Accordion.Panel {...panel(1)}>{panel1.content}</Accordion.Panel>
        <Accordion.Panel {...panel(2)}>{panel2.content}</Accordion.Panel>
        <Accordion.Panel {...panel(3)}>{panel3.content}</Accordion.Panel>
      </Accordion>
    );

    fireEvent.click(queryAllByTestId('panel-header')[0]);
    expect(queryAllByTestId('panel-wrapper')[0]).not.toHaveClass('collapsed');
    expect(queryAllByTestId('panel-wrapper')[1]).toHaveClass('collapsed');

    fireEvent.click(queryAllByTestId('panel-header')[1]);
    expect(queryAllByTestId('panel-wrapper')[0]).toHaveClass('collapsed');
    expect(queryAllByTestId('panel-wrapper')[1]).not.toHaveClass('collapsed');
  });

  it('should pass onPanelClick down to panels', () => {
    const props = makeProps();
    const { queryAllByTestId } = render(
      <Accordion {...props}>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
        <Accordion.Panel {...panel2}>{panel2.content}</Accordion.Panel>
        <Accordion.Panel {...panel3}>{panel3.content}</Accordion.Panel>
      </Accordion>
    );
    expect(queryAllByTestId('panel-wrapper')).toHaveLength(3);

    fireEvent.click(queryAllByTestId('panel-header')[0]);
    expect(props.onPanelClick).toHaveBeenCalledTimes(1);
    expect(props.onPanelClick).toHaveBeenLastCalledWith('1');

    fireEvent.click(queryAllByTestId('panel-header')[1]);
    expect(props.onPanelClick).toHaveBeenCalledTimes(2);
    expect(props.onPanelClick).toHaveBeenLastCalledWith('2');

    fireEvent.click(queryAllByTestId('panel-header')[2]);
    expect(props.onPanelClick).toHaveBeenCalledTimes(3);
    expect(props.onPanelClick).toHaveBeenLastCalledWith('3');
  });

  it('should respect isCollapsed in Panel children', () => {
    const props = makeProps();
    delete props.onPanelClick;

    const { queryAllByTestId } = render(
      <Accordion {...props}>
        <Accordion.Panel {...panel1} isCollapsed>
          {panel1.content}
        </Accordion.Panel>
        <Accordion.Panel {...panel2}>{panel2.content}</Accordion.Panel>
        <Accordion.Panel {...panel3}>{panel3.content}</Accordion.Panel>
      </Accordion>
    );
    fireEvent.click(queryAllByTestId('panel-header')[0]);
    expect(queryAllByTestId('panel-wrapper')[0]).toHaveClass('collapsed');
  });

  it('should throw error if props.maxExpand has invalid value', () => {
    expect(() =>
      render(
        <Accordion {...makeProps({ maxExpand: -1 })}>
          <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
        </Accordion>
      )
    ).toThrowError(new Error("maxExpand must be a positive number or 'max'"));
  });

  it('should ignore children that are not an instance of Accordion.Panel', () => {
    const { queryAllByTestId } = render(
      <Accordion {...makeProps()}>
        <div data-testid="should-not-render">test</div>
        <Accordion.Panel {...panel1}>{panel1.content}</Accordion.Panel>
      </Accordion>
    );

    expect(queryAllByTestId('should-not-render')).toHaveLength(0);
  });
});
