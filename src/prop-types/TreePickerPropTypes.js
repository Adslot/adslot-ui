import PropTypes from 'prop-types';

export const idPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

const baseNodeProps = {
  id: idPropType.isRequired,
  label: PropTypes.string.isRequired,
};

const mergeNodeProps = (addedProps) => Object.assign({}, baseNodeProps, addedProps);

export default {
  node: PropTypes.shape(
    mergeNodeProps({
      isExpandable: PropTypes.bool,
      path: PropTypes.arrayOf(PropTypes.shape(baseNodeProps).isRequired),
      ancestors: PropTypes.arrayOf(PropTypes.shape(baseNodeProps).isRequired),
      type: PropTypes.string.isRequired,
      value: PropTypes.number,
      accent: PropTypes.oneOf(['warning', 'success', 'info', 'error']),
    })
  ),
  breadCrumbNode: PropTypes.shape(baseNodeProps),
  rootType: PropTypes.shape(
    mergeNodeProps({
      emptySvgSymbol: PropTypes.node,
      svgSymbol: PropTypes.node,
      hidden: PropTypes.bool,
      isRequired: PropTypes.bool.isRequired,
    })
  ),
};
