import { removeSelected } from '../../src/helpers/TreePickerHelpers';

describe('TreePickerHelpers', () => {
  describe('removeSelected', () => {
    it('should remove selected nodes from a subtree', () => {
      const subtree = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const selectedNodes = [{ id: 1 }, { id: 3 }];

      expect(removeSelected({ subtree, selectedNodes })).to.deep.equal([{ id: 2 }]);
    });

    it('should return an empty array when passed an empty subtree', () => {
      const subtree = [];
      const selectedNodes = [{ id: 1 }, { id: 3 }];

      expect(removeSelected({ subtree, selectedNodes })).to.deep.equal([]);
    });

    it('should return undefined when passed an undefined subtree', () => {
      const subtree = undefined;
      const selectedNodes = [{ id: 1 }, { id: 3 }];

      expect(removeSelected({ subtree, selectedNodes })).to.equal(undefined);
    });
  });
});
