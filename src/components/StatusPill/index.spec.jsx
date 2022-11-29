import React from 'react';
import { render, screen } from 'testing';
import StatusPill from '.';

describe('<StatusPill />', () => {
  it('should have default style', () => {
    render(<StatusPill status="test" />);
    expect(screen.getAllByClass('aui--pill aui--pill-medium aui--status-pill aui--status-pill-primary')).toHaveLength(
      1
    );
    expect(
      screen.getByText(
        'test',
        screen.getByClass('aui--pill aui--pill-medium aui--status-pill aui--status-pill-primary')
      )
    ).toHaveClass('aui--pill-children');
  });

  it('should allow style prop', () => {
    render(<StatusPill status="test" displayStyle="success" />);
    expect(screen.getAllByClass('aui--pill aui--pill-medium aui--status-pill aui--status-pill-success')).toHaveLength(
      1
    );
  });

  it('should allow inverse prop', () => {
    render(<StatusPill status="test" displayStyle="success" inverse />);
    expect(
      screen.getAllByClass(
        'aui--pill aui--pill-medium aui--status-pill aui--status-pill-success aui--status-pill-inverse'
      )
    ).toHaveLength(1);
  });

  it('should support className prop', () => {
    render(<StatusPill status="test" className="test" />);
    expect(
      screen.getAllByClass('aui--pill aui--pill-medium aui--status-pill aui--status-pill-primary test')
    ).toHaveLength(1);
  });

  it('should support custom dts', () => {
    render(<StatusPill status="test" dts="test-dts" />);
    expect(screen.getByClass('aui--pill aui--pill-medium aui--status-pill aui--status-pill-primary')).toHaveAttribute(
      'data-test-selector',
      'test-dts'
    );
  });
});
