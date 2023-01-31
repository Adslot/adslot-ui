import c from '../../../system/tokens/color.json';
const {
  grey,
  border,
  white
} = c.color;
const borderColor = border.base;
const defaultStyle = {
  option: (styles, _ref) => {
    let {
      isFocused,
      isSelected,
      isDisabled
    } = _ref;
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
      ':active': {
        backgroundColor: grey[300]
      },
      backgroundColor
    };
  },
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none'
  }),
  control: (styles, state) => ({
    ...styles,
    ...(state.isFocused ? {
      boxShadow: 0,
      ':hover': {
        borderColor
      },
      borderColor
    } : {}),
    minHeight: 26,
    borderRadius: 0
  }),
  clearIndicator: styles => ({
    ...styles,
    padding: '0 4px 0 8px'
  }),
  dropdownIndicator: styles => ({
    ...styles,
    padding: '0 8px 0 4px'
  }),
  valueContainer: styles => ({
    ...styles,
    padding: '0 8px'
  }),
  multiValue: styles => ({
    ...styles,
    color: white,
    backgroundColor: grey[600]
  }),
  multiValueLabel: styles => ({
    ...styles,
    color: white
  }),
  multiValueRemove: styles => ({
    ...styles,
    ':hover': {}
  }),
  menu: styles => ({
    ...styles,
    zIndex: 1060,
    borderRadius: 0,
    marginTop: 4
  }),
  noOptionsMessage: styles => ({
    ...styles,
    textAlign: 'left'
  })
};
export default defaultStyle;