import c from '../../../system/tokens/color.json';
import { borderRadius } from '../../../system/tokens/borderRadius.json';

const { grey, border, white } = c.color;

const getDefaultStyle = ({ isInModal, size }) => ({
  option: (styles, { isFocused, isSelected, isDisabled }) => {
    let backgroundColor;
    switch (true) {
      // selected item
      case isSelected:
        backgroundColor = grey[300];
        break;
      // hovered/focused item
      case isFocused:
        backgroundColor = grey[200];
        break;
      case isDisabled:
        return styles;
      default:
        backgroundColor = null;
    }

    return {
      ...styles,
      color: 'inherit',
      ':active': { backgroundColor: grey[300] },
      backgroundColor,
      fontSize: 14,
      padding: size === 'medium' ? 12 : '6px 12px',
    };
  },
  control: (styles, state) => ({
    ...styles,
    gap: 6,
    padding: '0 0 0 12px',
    borderColor: border.base,
    ':hover': {
      borderColor: border.accent,
    },
    ...(state.isFocused
      ? {
          boxShadow: 0,
          ':hover': { borderColor: border.accent },
          borderColor: border.accent,
        }
      : {}),
    minHeight: size === 'medium' ? 42 : 32,
    borderRadius: borderRadius.base,
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    gap: 6,
    padding: '0 8px',
  }),
  clearIndicator: (styles) => ({
    ...styles,
    padding: 0,
    height: 20,
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    padding: 0,
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
  }),
  input: (styles) => ({
    ...styles,
    margin: 0,
    padding: 0,
  }),
  singleValue: (styles) => ({
    ...styles,
    margin: 0,
  }),
  multiValue: (styles) => ({
    ...styles,
    color: white,
    backgroundColor: grey[600],
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: white,
    fontSize: size === 'medium' ? 14 : 12,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    ':hover': {},
  }),
  menu: (styles) => ({
    ...styles,
    zIndex: 1060,
    borderRadius: 0,
    marginTop: 4,
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    textAlign: 'left',
  }),
  ...(isInModal
    ? {
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }
    : {}),
});

export default getDefaultStyle;
