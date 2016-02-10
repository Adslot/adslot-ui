import { PropTypes } from 'react';

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
    ).isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }),
};
