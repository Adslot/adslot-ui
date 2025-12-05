import c from '../../../system/tokens/color.json';
import { borderRadius } from '../../../system/tokens/borderRadius.json';

const { grey, border, white } = c.color;

const getDefaultStyle = ({ isInModal }) => ({
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
      padding: 12,
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
    minHeight: 42,
    borderRadius: borderRadius.base,
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    gap: 6,
    padding: '0 10px',
  }),
  clearIndicator: (styles) => ({
    ...styles,
    padding: 0,
    alignItems: 'center',
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    padding: 0,
    color: grey[500],
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: '6px 0',
    gap: 6,
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
    margin: 0,
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: white,
    fontSize: 14,
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
