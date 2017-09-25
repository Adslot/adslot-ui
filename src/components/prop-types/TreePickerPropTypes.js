import PropTypes from 'prop-types';
import SvgSymbol from 'alexandria/SvgSymbol';
import idPropType from './idPropType';

export default {
  node: PropTypes.shape({
    id: idPropType.isRequired,
    isExpandable: PropTypes.bool,
    label: PropTypes.string.isRequired,
    path: PropTypes.arrayOf(
      PropTypes.shape({
        id: idPropType.isRequired,
        label: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.number,
  }),
  breadCrumbNode: PropTypes.shape({
    id: idPropType.isRequired,
    label: PropTypes.string.isRequired,
  }),
  rootType: PropTypes.shape({
    emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
    svgSymbol: PropTypes.shape(SvgSymbol.propTypes),
    hidden: PropTypes.bool,
    id: idPropType.isRequired,
    isRequired: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
  }),
};
