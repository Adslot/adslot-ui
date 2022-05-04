import styles from './styles';

describe('Select custom styles', () => {
  describe('control()', () => {
    it('should have default styles and update minHeight', () => {
      const base = { color: 'red' };
      const state = { isFocused: false };

      expect(styles.control(base, state)).toEqual({
        color: 'red',
        minHeight: 26,
        borderRadius: 0,
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

      expect(styles.control(base, state)).toEqual({
        color: 'red',
        minHeight: 26,
        borderRadius: 0,
        boxShadow: 0,
        ':hover': { borderColor: '#AAAFB3' },
        borderColor: '#AAAFB3',
      });
    });
  });

  describe('menu()', () => {
    it('should override styles', () => {
      const base = {
        zIndex: 10000,
        borderRadius: 4,
        marginTop: 8,
      };

      expect(styles.menu(base)).toEqual({
        zIndex: 1060,
        borderRadius: 0,
        marginTop: 4,
      });
    });
  });

  describe('noOptionsMessage()', () => {
    it('should override styles', () => {
      const base = { textAlign: 'center' };

      expect(styles.noOptionsMessage(base)).toEqual({ textAlign: 'left' });
    });
  });
});
