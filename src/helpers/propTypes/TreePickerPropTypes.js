import { PropTypes } from 'react';
import { SvgSymbol } from 'alexandria-adslot';

export default {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isExpandable: PropTypes.bool,
    label: PropTypes.string.isRequired,
    path: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }).isRequired
    ),
    type: PropTypes.string.isRequired,
    value: PropTypes.number,
  }),
  breadCrumbNode: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  rootType: PropTypes.shape({
    emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
    svgSymbol: PropTypes.shape(SvgSymbol.propTypes),
    hidden: PropTypes.bool,
    id: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
  }),
};
