import * as tokens from '../../../system/dist';
const { color } = tokens;
const borderColor = color.gray.base;

const defaultStyle = {
  option: (styles, { isFocused, isSelected, isDisabled, isActive }) => {
    let backgroundColor;
    switch (true) {
      case isSelected:
        backgroundColor = color.gray.lightest;
        break;
      case isFocused:
        backgroundColor = color.gray.lightest;
        break;
      case isDisabled:
        return styles;
      default:
        backgroundColor = null;
    }

    return {
      ...styles,
      color: 'inherit',
      ':active': { backgroundColor: color.gray.lighter },
      backgroundColor,
    };
  },
  indicatorSeparator: (styles) => ({
    ...styles,
    display: 'none',
  }),
  control: (styles, state) => ({
    ...styles,
    ...(state.isFocused
      ? {
          boxShadow: 0,
          ':hover': { borderColor },
          borderColor,
        }
      : {}),
    minHeight: 26,
    borderRadius: 0,
  }),
  clearIndicator: (styles) => ({
    ...styles,
    padding: '0 4px 0 8px',
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    padding: '0 8px 0 4px',
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: '0 8px',
  }),
  multiValue: (styles) => ({
    ...styles,
    color: '#fff',
    backgroundColor: color.gray.dark,
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: '#fff',
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
};

export default defaultStyle;
