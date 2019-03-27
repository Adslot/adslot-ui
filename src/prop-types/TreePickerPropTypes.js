import PropTypes from 'prop-types';
import SvgSymbol from 'components/SvgSymbol';
import idPropType from './idPropType';

const baseNodeProps = {
  id: idPropType.isRequired,
  label: PropTypes.string.isRequired,
};

const mergeNodeProps = addedProps => Object.assign({}, baseNodeProps, addedProps);

export default {
  node: PropTypes.shape(
    mergeNodeProps({
      isExpandable: PropTypes.bool,
      path: PropTypes.arrayOf(PropTypes.shape(baseNodeProps).isRequired),
      ancestors: PropTypes.arrayOf(PropTypes.shape(baseNodeProps).isRequired),
      type: PropTypes.string.isRequired,
      value: PropTypes.number,
    })
  ),
  breadCrumbNode: PropTypes.shape(baseNodeProps),
  rootType: PropTypes.shape(
    mergeNodeProps({
      emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
      svgSymbol: PropTypes.shape(SvgSymbol.propTypes),
      hidden: PropTypes.bool,
      isRequired: PropTypes.bool.isRequired,
    })
  ),
};
