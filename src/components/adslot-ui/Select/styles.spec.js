import styles from './styles';

describe('Select custom styles', () => {
  describe('control()', () => {
    it('should have default styles and update minHeight', () => {
      const base = { color: 'red' };
      const state = { isFocused: false };

      expect(styles.control(base, state)).to.eql({
        color: 'red',
        minHeight: 26,
      });
    });

    it('should override styles on focus', () => {
      const base = {
        color: 'red',
        boxShadow: '0 0 0 1px #123456',
        ':hover': { borderColor: '#123456' },
        borderColor: '#123456',
      };
      const state = { isFocused: true };

      expect(styles.control(base, state)).to.eql({
        color: 'red',
        minHeight: 26,
        boxShadow: '0 0 0 1px #cccccc',
        ':hover': { borderColor: '#cccccc' },
        borderColor: '#cccccc',
      });
    });
  });
});
