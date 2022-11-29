import React from 'react';
import { render, screen, user } from 'testing';
import Panel from '.';
import SvgSymbol from '../SvgSymbol';
import PanelMocks from './mocks';

describe('<Panel />', () => {
  const { panel1, panel2, panel3 } = PanelMocks;

  it('should render with defaults', () => {
    render(<Panel {...panel1} />);
    expect(screen.getByTestId('panel-wrapper')).toHaveClass('panel-component');

    expect(screen.getByTestId('panel-header')).toBeInTheDocument();
    expect(screen.getByTestId('panel-header')).toHaveClass('panel-component-header');
    expect(screen.getByTestId('panel-header')).toHaveTextContent('Panel 1');

    expect(screen.getByTestId('panel-content')).toBeInTheDocument();
    expect(screen.getByTestId('panel-content')).toHaveClass('panel-component-content');
    expect(screen.getByTestId('panel-content')).toBeEmptyDOMElement();
  });

  it('should render with props', () => {
    const icon = <SvgSymbol href="/assets/svg-symbols.svg#list" />;
    render(
      <Panel {...panel2} icon={icon}>
        {panel2.content}
      </Panel>
    );
    expect(screen.getByTestId('panel-wrapper')).toHaveClass('panel-component collapsed');
    expect(screen.getByTestId('panel-wrapper')).toHaveAttribute('data-test-selector', 'panel-2');

    expect(screen.getByTestId('panel-header')).toBeInTheDocument();
    expect(screen.getByTestId('panel-header')).toHaveClass('panel-component-header');

    expect(screen.getByTestId('panel-content')).toBeInTheDocument();
    expect(screen.getByTestId('panel-content')).toHaveClass('panel-component-content');
    expect(screen.getByTestId('panel-content')).toHaveTextContent('Panel 2 content');
  });

  it('should append custom class', () => {
    render(<Panel {...panel3}>{panel3.content}</Panel>);
    expect(screen.getByTestId('panel-wrapper')).toHaveClass('panel-component test-class-1 test-class-2');
  });

  it('should trigger onClick when clicking header', async () => {
    const callback = jest.fn();
    render(<Panel {...panel3} onClick={callback} />);

    expect(screen.getByTestId('panel-header')).toBeInTheDocument();
    expect(screen.getByTestId('panel-header')).toHaveClass('panel-component-header');

    await user.click(screen.getByTestId('panel-header'));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('3');
  });
});
