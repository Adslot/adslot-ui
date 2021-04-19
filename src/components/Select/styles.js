const borderColor = '#ababab';

const defaultStyle = {
  option: (styles, { isFocused, isSelected, isDisabled }) => {
    let backgroundColor;

    switch (true) {
      case isSelected:
        backgroundColor = '#f5faff';
        break;
      case isFocused:
        backgroundColor = '#f9f9f9';
        break;
      case isDisabled:
        return styles;
      default:
        backgroundColor = null;
    }

    return {
      ...styles,
      color: 'inherit',
      backgroundColor,
    };
  },
  indicatorSeparator: styles => ({
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
  clearIndicator: styles => ({
    ...styles,
    padding: '0 4px 0 8px',
  }),
  dropdownIndicator: styles => ({
    ...styles,
    padding: '0 8px 0 4px',
  }),
  valueContainer: styles => ({
    ...styles,
    padding: '0 8px',
  }),
  multiValue: styles => ({
    ...styles,
    color: '#fff',
    backgroundColor: '#838383',
  }),
  multiValueLabel: styles => ({
    ...styles,
    color: '#fff',
  }),
  multiValueRemove: styles => ({
    ...styles,
    ':hover': {},
  }),
  menu: styles => ({
    ...styles,
    zIndex: 1060,
    borderRadius: 0,
    marginTop: 4,
  }),
  noOptionsMessage: styles => ({
    ...styles,
    textAlign: 'left',
  }),
};

export default defaultStyle;
