import PropTypes from 'prop-types';

export const idPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export const TreePickerPropTypesNode = PropTypes.shape({
  id: idPropType.isRequired,
  label: PropTypes.string.isRequired,
  isExpandable: PropTypes.bool,
  unExpandableMessage: PropTypes.string,
  path: PropTypes.arrayOf(
    PropTypes.shape({ id: idPropType.isRequired, label: PropTypes.string.isRequired }).isRequired
  ),
  ancestors: PropTypes.arrayOf(
    PropTypes.shape({ id: idPropType.isRequired, label: PropTypes.string.isRequired }).isRequired
  ),
  type: PropTypes.string.isRequired,
  value: PropTypes.number,
  accent: PropTypes.oneOf(['warning', 'success', 'info', 'error']),
});

export const TreePickerPropTypesBreadCrumbNode = PropTypes.shape({
  id: idPropType.isRequired,
  label: PropTypes.string.isRequired,
});

export const TreePickerPropTypesRootType = PropTypes.shape({
  id: idPropType.isRequired,
  label: PropTypes.string.isRequired,
  emptySvgSymbol: PropTypes.node,
  svgSymbol: PropTypes.node,
  hidden: PropTypes.bool,
  isRequired: PropTypes.bool.isRequired,
});
