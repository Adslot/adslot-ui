import PropTypes from 'prop-types';
export var idPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
export var TreePickerPropTypesNode = PropTypes.shape({
  id: idPropType.isRequired,
  label: PropTypes.string.isRequired,
  isExpandable: PropTypes.bool,
  path: PropTypes.arrayOf(PropTypes.shape({
    id: idPropType.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired),
  ancestors: PropTypes.arrayOf(PropTypes.shape({
    id: idPropType.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired),
  type: PropTypes.string.isRequired,
  value: PropTypes.number,
  accent: PropTypes.oneOf(['warning', 'success', 'info', 'error'])
});
export var TreePickerPropTypesBreadCrumbNode = PropTypes.shape({
  id: idPropType.isRequired,
  label: PropTypes.string.isRequired
});
export var TreePickerPropTypesRootType = PropTypes.shape({
  id: idPropType.isRequired,
  label: PropTypes.string.isRequired,
  emptySvgSymbol: PropTypes.node,
  svgSymbol: PropTypes.node,
  hidden: PropTypes.bool,
  isRequired: PropTypes.bool.isRequired
});