import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { getFocusableNodes, isElementVisible } from './';

afterEach(cleanup);

describe('utils', () => {
  describe('isElementVisible()', () => {
    afterEach(cleanup);
    it('should work', () => {
      expect(isElementVisible(document.body)).toEqual(true);
    });
    it('should work with invalid element', () => {
      expect(isElementVisible({})).toEqual(false);
    });
  });

  describe('getFocusableNodes()', () => {
    afterEach(cleanup);

    const Comp = () => (
      <div>
        <button data-testid="b1">B1</button>
        <button data-testid="b2">B2</button>
        <div data-testid="inner-div">
          <button data-testid="b3">B3</button>
        </div>
      </div>
    );
    it('should work', () => {
      render(<Comp />);
      const nodes = getFocusableNodes(document.body);
      expect(nodes).toHaveLength(3);
    });

    it('should start from opts.from', () => {
      const { getByTestId } = render(<Comp />);
      const nodes = getFocusableNodes(document.body, { from: getByTestId('b1') });
      expect(nodes).toHaveLength(2);
      expect(nodes[0]).toHaveAccessibleName('B2');
    });

    it('should reject opts.from when starting on it', () => {
      const { getByTestId } = render(<Comp />);
      const nodes = getFocusableNodes(getByTestId('inner-div'), { from: getByTestId('inner-div') });
      expect(nodes).toHaveLength(0);
    });

    it('should work with opts.accept', () => {
      const { getByTestId } = render(<Comp />);
      const nodes = getFocusableNodes(document.body, {
        accept: (node) => node === getByTestId('b2'),
      });
      expect(nodes).toHaveLength(1);
      expect(nodes[0]).toHaveAccessibleName('B2');
    });
  });
});
