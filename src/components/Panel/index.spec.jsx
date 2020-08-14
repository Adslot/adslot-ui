import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Panel from '.';
import SvgSymbol from '../SvgSymbol';
import PanelMocks from './mocks';

afterEach(cleanup);

describe('<Panel />', () => {
  const { panel1, panel2, panel3 } = PanelMocks;

  it('should render with defaults', () => {
    const { getByTestId, queryAllByTestId } = render(<Panel {...panel1} />);
    expect(getByTestId('panel-wrapper')).toHaveClass('panel-component');

    expect(queryAllByTestId('panel-header')).toHaveLength(1);
    expect(getByTestId('panel-header')).toHaveClass('panel-component-header');
    expect(getByTestId('panel-header')).toHaveTextContent('Panel 1');

    expect(queryAllByTestId('panel-content')).toHaveLength(1);
    expect(getByTestId('panel-content')).toHaveClass('panel-component-content');
    expect(getByTestId('panel-content')).toBeEmpty();
  });

  it('should render with props', () => {
    const icon = <SvgSymbol href="/assets/svg-symbols.svg#list" />;
    const { getByTestId, queryAllByTestId } = render(
      <Panel {...panel2} icon={icon}>
        {panel2.content}
      </Panel>
    );
    expect(getByTestId('panel-wrapper')).toHaveClass('panel-component collapsed');
    expect(getByTestId('panel-wrapper')).toHaveAttribute('data-test-selector', 'panel-2');

    expect(queryAllByTestId('panel-header')).toHaveLength(1);
    expect(getByTestId('panel-header')).toHaveClass('panel-component-header');

    expect(queryAllByTestId('panel-content')).toHaveLength(1);
    expect(getByTestId('panel-content')).toHaveClass('panel-component-content');
    expect(getByTestId('panel-content')).toHaveTextContent('Panel 2 content');
  });

  it('should append custom class', () => {
    const { getByTestId } = render(<Panel {...panel3}>{panel3.content}</Panel>);
    expect(getByTestId('panel-wrapper')).toHaveClass('panel-component test-class-1 test-class-2');
  });

  it('should trigger onClick when clicking header', () => {
    const callback = jest.fn();
    const { getByTestId, queryAllByTestId } = render(<Panel {...panel3} onClick={callback} />);

    expect(queryAllByTestId('panel-header')).toHaveLength(1);
    expect(getByTestId('panel-header')).toHaveClass('panel-component-header');

    fireEvent.click(getByTestId('panel-header'));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('3');
  });
});
