import getStyles from './styles';

describe('Select custom styles', () => {
  it('should have modal styles', () => {
    expect(getStyles({ isInModal: true }).menuPortal({})).toEqual({ zIndex: 9999 });
  });

  describe('control()', () => {
    it('should have default styles and update minHeight', () => {
      const base = { color: 'red' };
      const state = { isFocused: false };

      expect(getStyles({ isInModal: false }).control(base, state)).toEqual({
        ':hover': {
          borderColor: '#757982',
        },
        borderColor: '#dae2e6',
        borderRadius: 2,
        color: 'red',
        minHeight: 42,
        gap: 6,
        padding: '0 0 0 12px',
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

      expect(getStyles({ isInModal: false }).control(base, state)).toEqual({
        ':hover': {
          borderColor: '#757982',
        },
        borderColor: '#757982',
        borderRadius: 2,
        boxShadow: 0,
        color: 'red',
        gap: 6,
        minHeight: 42,
        padding: '0 0 0 12px',
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

      expect(getStyles({ isInModal: false }).menu(base)).toEqual({
        zIndex: 1060,
        borderRadius: 0,
        marginTop: 4,
      });
    });
  });

  describe('noOptionsMessage()', () => {
    it('should override styles', () => {
      const base = { textAlign: 'center' };

      expect(getStyles({ isInModal: false }).noOptionsMessage(base)).toEqual({ textAlign: 'left' });
    });
  });
});
